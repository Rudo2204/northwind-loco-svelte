use async_trait::async_trait;
use axum::Router as AxumRouter;
use axum_tracing_opentelemetry::middleware::{OtelAxumLayer, OtelInResponseLayer};
use loco_rs::{
    Result,
    app::{AppContext, Initializer},
};
use std::env;
use std::sync::OnceLock;

use opentelemetry::global;
use opentelemetry_otlp::{MetricExporter, SpanExporter};
use opentelemetry_sdk::Resource;
use opentelemetry_sdk::metrics::SdkMeterProvider;
use opentelemetry_sdk::trace::SdkTracerProvider;

pub struct OpenTelemetryInitializer;

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

fn init_traces() -> SdkTracerProvider {
    let exporter = SpanExporter::builder()
        .with_tonic()
        .build()
        .expect("Failed to create span exporter");
    SdkTracerProvider::builder()
        .with_resource(get_resource())
        .with_batch_exporter(exporter)
        .build()
}

fn init_metrics() -> SdkMeterProvider {
    let exporter = MetricExporter::builder()
        .with_tonic()
        .build()
        .expect("Failed to create metric exporter");

    SdkMeterProvider::builder()
        .with_periodic_exporter(exporter)
        .with_resource(get_resource())
        .build()
}

#[async_trait]
impl Initializer for OpenTelemetryInitializer {
    fn name(&self) -> String {
        "opentelemetry".to_string()
    }

    async fn before_run(&self, _app_context: &AppContext) -> Result<()> {
        let tracer_provider = init_traces();
        global::set_tracer_provider(tracer_provider.clone());
        let meter_provider = init_metrics();
        global::set_meter_provider(meter_provider.clone());
        tracing::info!("Opentelemetry tracer & meter initialized");
        Ok(())
    }

    async fn after_routes(&self, router: AxumRouter, _ctx: &AppContext) -> Result<AxumRouter> {
        let router = router
            .layer(OtelInResponseLayer)
            .layer(OtelAxumLayer::default());
        Ok(router)
    }
}
