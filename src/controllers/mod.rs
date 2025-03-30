// export common controllers' utils
mod utils;
pub use utils::*;

pub mod auth;
pub mod customers;
pub mod suppliers;

pub mod products;
pub mod orders;
pub mod employees;
pub mod shippers;