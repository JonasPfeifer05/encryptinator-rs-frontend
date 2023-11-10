import {defineStore} from "pinia";
import {hashWithAPISalt, tryLogin, tryRegister} from "../util/api.ts";
import {errResult, okResult, Result} from "../util/result.ts";
import {LoginError, RegisterError} from "../util/errors.ts";

interface State {
    token?: string

}

export const useUser = defineStore('customers', {
    state: (): State => ({
        token: undefined,
    }),
    actions: {
        async registerUser(email: string, password: string): Promise<Result<null, RegisterError>> {
            const hashedPassword = hashWithAPISalt(password);

            const tokenResult = await tryRegister(email, hashedPassword);
            if (tokenResult.isErr()) return errResult(tokenResult.getErr());

            this.token = tokenResult.getOK();
            return okResult(null);
        },

        async loginUser(email: string, password: string): Promise<Result<null, LoginError>> {
            const hashedPassword = hashWithAPISalt(password);

            const tokenResult = await tryLogin(email, hashedPassword);
            if (tokenResult.isErr()) return errResult(tokenResult.getErr());

            this.token = tokenResult.getOK();
            return okResult(null);
        }
    },
    getters: {
        isLoggedIn(state): boolean {
            return state.token !== null;
        },
        getToken(state): string|undefined {
            return state.token;
        },
    },
    persist: {
        storage: sessionStorage
    },
});