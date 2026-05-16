mod models;

use axum::{
    routing::{get, post},
    extract::{State, Json},
    Router,
    http::StatusCode,
};
use std::net::SocketAddr;
use tower_http::cors::CorsLayer;
use sqlx::{sqlite::SqlitePool, Pool, Sqlite};
use models::lead::{Lead, CreateLead};
use chrono::Utc;

#[derive(Clone)]
struct AppState {
    db: Pool<Sqlite>,
}

#[tokio::main]
async fn main() {
    // 1. Inicializar Base de Datos (SQLite)
    let database_url = "sqlite:methodius.db";
    let pool = SqlitePool::connect_with(
        sqlx::sqlite::SqliteConnectOptions::new()
            .filename("methodius.db")
            .create_if_missing(true)
    ).await.expect("No se pudo conectar a SQLite");

    // Crear tabla si no existe
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            company TEXT NOT NULL,
            pain_point TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )"
    ).execute(&pool).await.expect("No se pudo crear la tabla de leads");

    let state = AppState { db: pool };

    // 2. Configurar Rutas
    let app = Router::new()
        .route("/", get(|| async { "Methodius API v1.0" }))
        .route("/api/leads", post(create_lead_handler))
        .layer(CorsLayer::permissive())
        .with_state(state);

    // 3. Iniciar Servidor
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("🚀 Backend de Methodius corriendo en http://{}", addr);
    
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

async fn create_lead_handler(
    State(state): State<AppState>,
    Json(payload): Json<CreateLead>,
) -> (StatusCode, Json<Lead>) {
    let now = Utc::now();
    
    let result = sqlx::query_as::<_, Lead>(
        "INSERT INTO leads (name, company, pain_point, created_at) 
         VALUES (?, ?, ?, ?) 
         RETURNING id, name, company, pain_point, created_at"
    )
    .bind(&payload.name)
    .bind(&payload.company)
    .bind(&payload.pain_point)
    .bind(now)
    .fetch_one(&state.db)
    .await;

    match result {
        Ok(lead) => (StatusCode::CREATED, Json(lead)),
        Err(e) => {
            eprintln!("Error al guardar lead: {}", e);
            (StatusCode::INTERNAL_SERVER_ERROR, Json(Lead {
                id: None,
                name: String::new(),
                company: String::new(),
                pain_point: String::new(),
                created_at: None,
            }))
        }
    }
}
