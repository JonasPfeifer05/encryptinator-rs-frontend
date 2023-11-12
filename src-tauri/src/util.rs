use std::fs;

#[tauri::command]
pub fn write_to_file(path: String, data: String) {
    fs::write(path, data).unwrap();
}