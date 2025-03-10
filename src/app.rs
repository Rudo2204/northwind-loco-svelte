use async_trait::async_trait;
use loco_rs::{
    Result,
    app::{AppContext, Hooks, Initializer},
    bgworker::{BackgroundWorker, Queue},
    boot::{BootResult, StartMode, create_app},
    config::Config,
    controller::AppRoutes,
    controller::middleware::{self, MiddlewareLayer},
    db::{self, truncate_table},
    environment::Environment,
    task::Tasks,
};
use migration::Migrator;
use std::path::Path;
use std::sync::OnceLock;
use tracing_subscriber::{EnvFilter, Layer, layer::SubscriberExt, util::SubscriberInitExt};

use opentelemetry_appender_tracing::layer::OpenTelemetryTracingBridge;
use opentelemetry_otlp::LogExporter;
use opentelemetry_sdk::Resource;
use opentelemetry_sdk::logs::SdkLoggerProvider;

#[allow(unused_imports)]
use crate::{
    controllers, initializers, models::_entities::users, tasks, workers::downloader::DownloadWorker,
};

const MODULE_WHITELIST: &[&str] = &[
    env!("CARGO_CRATE_NAME"),
    "loco_rs",
    "sea_orm_migration",
    "tower_http",
    "sqlx::query",
    "sidekiq",
    "playground",
    "loco_gen",
    "foo",
];

fn get_resource() -> Resource {
    static RESOURCE: OnceLock<Resource> = OnceLock::new();
    RESOURCE
        .get_or_init(|| {
            Resource::builder()
                .with_service_name(env!("CARGO_CRATE_NAME"))
                .build()
        })
        .clone()
}

fn init_opentelemetry_logger() -> SdkLoggerProvider {
    let exporter = LogExporter::builder()
        .with_tonic()
        .build()
        .expect("Failed to create log exporter");

    SdkLoggerProvider::builder()
        .with_resource(get_resource())
        .with_batch_exporter(exporter)
        .build()
}

pub struct App;
#[async_trait]
impl Hooks for App {
    fn app_name() -> &'static str {
        env!("CARGO_CRATE_NAME")
    }

    fn app_version() -> String {
        format!(
            "{} ({})",
            env!("CARGO_PKG_VERSION"),
            option_env!("BUILD_SHA")
                .or(option_env!("GITHUB_SHA"))
                .unwrap_or("dev")
        )
    }

    async fn boot(
        mode: StartMode,
        environment: &Environment,
        config: Config,
    ) -> Result<BootResult> {
        create_app::<Self, Migrator>(mode, environment, config).await
    }

    async fn initializers(_ctx: &AppContext) -> Result<Vec<Box<dyn Initializer>>> {
        Ok(vec![
            Box::new(initializers::opentelemetry::OpenTelemetryInitializer),
            Box::new(initializers::view_engine::ViewEngineInitializer),
        ])
    }

    fn middlewares(ctx: &AppContext) -> Vec<Box<dyn MiddlewareLayer>> {
        middleware::default_middleware_stack(ctx)
    }

    fn init_logger(config: &Config, _env: &Environment) -> Result<bool> {
        let log_level = &config.logger.level;
        let logger_provider = init_opentelemetry_logger();

        let otel_layer = OpenTelemetryTracingBridge::new(&logger_provider);

        let filter_otel = EnvFilter::new(log_level.to_string())
            .add_directive("hyper=off".parse().unwrap())
            .add_directive("opentelemetry=off".parse().unwrap())
            .add_directive("tonic=off".parse().unwrap())
            .add_directive("h2=off".parse().unwrap())
            .add_directive("reqwest=off".parse().unwrap());
        let otel_layer = otel_layer.with_filter(filter_otel);

        let filter_fmt = EnvFilter::new(log_level.to_string())
            .add_directive("opentelemetry=debug".parse().unwrap());
        let fmt_layer = tracing_subscriber::fmt::layer()
            .with_thread_names(true)
            .with_filter(filter_fmt);

        let api_fmt = EnvFilter::new(
            MODULE_WHITELIST
                .iter()
                .map(|m| format!("{m}={log_level}"))
                .collect::<Vec<_>>()
                .join(","),
        );

        tracing_subscriber::registry()
            .with(api_fmt)
            .with(otel_layer)
            .with(fmt_layer)
            .init();

        tracing::info!("Opentelemetry logger initialized");
        Ok(true)
    }

    fn routes(_ctx: &AppContext) -> AppRoutes {
        AppRoutes::with_default_routes() // controller routes below
            .add_route(controllers::auth::routes())
    }
    async fn connect_workers(ctx: &AppContext, queue: &Queue) -> Result<()> {
        queue.register(DownloadWorker::build(ctx)).await?;
        Ok(())
    }

    #[allow(unused_variables)]
    fn register_tasks(tasks: &mut Tasks) {
        // tasks-inject (do not remove)
    }
    async fn truncate(ctx: &AppContext) -> Result<()> {
        truncate_table(&ctx.db, users::Entity).await?;
        Ok(())
    }
    async fn seed(ctx: &AppContext, base: &Path) -> Result<()> {
        db::seed::<users::ActiveModel>(&ctx.db, &base.join("users.yaml").display().to_string())
            .await?;
        Ok(())
    }
}
