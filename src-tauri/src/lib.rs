#[tauri::command]
fn is_admin() -> bool {
    match std::env::var("FLASHREPO_ADMIN") {
        Ok(v) => match v.to_lowercase().as_str() {
            "true" | "1" | "yes" => true,
            _ => false,
        },
        Err(_) => false,
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![is_admin])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
