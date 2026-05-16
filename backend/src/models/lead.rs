use serde::{Serialize, Deserialize};
use sqlx::FromRow;
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Lead {
    pub id: Option<i64>,
    pub name: String,
    pub company: String,
    pub pain_point: String,
    pub created_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Deserialize)]
pub struct CreateLead {
    pub name: String,
    pub company: String,
    pub pain_point: String,
}
