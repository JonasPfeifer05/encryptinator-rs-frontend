// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod cryptography;
mod util;

use cryptography::encrypt;
use cryptography::decrypt;
use util::write_to_file;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            encrypt,
            decrypt,
            write_to_file,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
