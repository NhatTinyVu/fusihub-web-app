mod error;

pub use self::error::{Error, Result};

#[derive(Clone)]
pub struct ModelManager {}

impl ModelManager {
    pub async fn new() -> Result<Self> {
        Ok(ModelManager {})
    }
}
