use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct ChatState {
    pub state_id: u32,
    pub name: String,
    pub company: String,
    pub pain_point: String,
}

#[derive(Serialize, Deserialize)]
pub struct ChatOutput {
    pub response_text: String,
    pub new_state: ChatState,
    pub whatsapp_link: Option<String>,
}

#[wasm_bindgen]
pub fn process_conversation(current_state_json: &str, message: &str) -> String {
    let mut state: ChatState = serde_json::from_str(current_state_json).unwrap_or(ChatState {
        state_id: 0,
        name: String::new(),
        company: String::new(),
        pain_point: String::new(),
    });

    let response_text: String;
    let mut whatsapp_link = None;
    let whatsapp_number = "584121204430";

    match state.state_id {
        0 => { // GREETING
            state.state_id = 1;
            response_text = "¡Hola! Soy el asistente de Methodius Tech. 👋 ¿Qué desafío operativo te trae por aquí?".to_string();
        }
        1 => { // IDENTIFYING_PAIN
            state.pain_point = message.to_string();
            state.state_id = 2;
            response_text = format!("Entiendo, '{}' es un reto importante. Para ayudarte mejor, ¿cuál es tu nombre y el de tu empresa?", message);
        }
        2 => { // COLLECTING_INFO
            state.name = message.to_string();
            state.company = "Empresa".to_string(); 
            state.state_id = 3;
            response_text = "¡Mucho gusto! Tenemos disponibilidad para una asesoría técnica este martes a las 10:00 AM. ¿Te funciona?".to_string();
        }
        3 => { // CONFIRMING_APPOINTMENT
            let msg = message.to_lowercase();
            if msg.contains("si") || msg.contains("vale") || msg.contains("ok") || msg.contains("claro") {
                state.state_id = 4;
                response_text = "¡Excelente! He preparado un resumen para nuestro equipo. Haz clic en el botón de abajo para ir a WhatsApp y confirmar la cita. 🚀".to_string();
                
                let text = format!(
                    "Hola Methodius! Soy {}. Mi empresa es {}. Tengo interés en resolver: {}. Me gustaría agendar la cita para el martes.",
                    state.name, state.company, state.pain_point
                );
                whatsapp_link = Some(format!("https://wa.me/{}?text={}", whatsapp_number, urlencoding::encode(&text)));
            } else {
                response_text = "No hay problema. ¿Qué horario o día te vendría mejor?".to_string();
            }
        }
        _ => {
            response_text = "Ya estamos listos. Usa el botón de WhatsApp para contactarnos.".to_string();
        }
    }

    let output = ChatOutput {
        response_text,
        new_state: state,
        whatsapp_link,
    };

    serde_json::to_string(&output).unwrap_or_else(|_| "{}".to_string())
}
