import {sha512} from "sha512-crypt-ts";
import {okResult, Result} from "./result.ts";
import {LoginError, RegisterError} from "./errors.ts";

const API_SALT = "API_SALT" // TODO

export function hashWithAPISalt(data: string): string {
    return sha512.crypt(data, API_SALT);
}

export async function tryRegister(_email: string, _passwordHash: string): Promise<Result<string, RegisterError>> {
    // TODO request from backend with axios
    return okResult("TOKEN");
}

export async function tryLogin(_email: string, _passwordHash: string): Promise<Result<string, LoginError>> {
    // TODO request from backend with axios
    return okResult("TOKEN");
}