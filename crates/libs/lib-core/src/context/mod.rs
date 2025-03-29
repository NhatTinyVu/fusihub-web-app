mod error;

pub use self::error::{Error, Result};

#[derive(Clone, Debug)]
pub struct Context {}

impl Context {
    pub fn new() -> Result<Self> {
        Ok(Self {})
    }
}

impl Context {}
