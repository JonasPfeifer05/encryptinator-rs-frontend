import {defineStore} from "pinia";

interface State {
    didLogin: boolean,
    userID?: string

}

export const useCustomers = defineStore('customers', {
    state: (): State => ({
        didLogin: false,
        userID: undefined,
    }),
    actions: {},
    getters: {
        isLoggedIn(state) {
            return state.didLogin;
        },
        getUserID(state) {
            return state.userID;
        },
    },
    persist: {
        storage: sessionStorage
    },
});