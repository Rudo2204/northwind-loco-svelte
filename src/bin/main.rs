use loco_rs::cli;
use migration::Migrator;
use northwind_api::app::App;

#[tokio::main]
async fn main() -> loco_rs::Result<()> {
    let _guard = init_tracing_opentelemetry::tracing_subscriber_ext::init_subscribers().unwrap();
    cli::main::<App, Migrator>().await
}
