use magic_crypt::{MagicCryptTrait, new_magic_crypt};

#[tauri::command]
pub fn encrypt(data: String, password: String) -> String {
    let key = new_magic_crypt!(password, 256);

    return key.encrypt_str_to_base64(data);
}

#[tauri::command]
pub fn decrypt(data: String, password: String) -> String {
    let key = new_magic_crypt!(password, 256);

    return key.decrypt_base64_to_string(data).unwrap();
}