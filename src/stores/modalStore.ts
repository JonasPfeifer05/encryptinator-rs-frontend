import {defineStore} from "pinia";

interface State {
    prompt: {
        show: boolean,
        title: string,
        hideInput: boolean,
        onSubmit: (submitData: string) => void,
    },
    notification: {
        show: boolean,
        text: string,
        body?: any,
        bodyProps?: any,
    }
}

export const useModal = defineStore('modal', {
    state: (): State => ({
        prompt: {
            show: false,
            hideInput: false,
            title: "",
            onSubmit: () => {
            },
        },
        notification: {
            show: false,
            text: "",
        }
    }),
    actions: {
        configurePrompt(title: string, hideInput: boolean, onSubmit: (submitData: string) => void) {
            this.prompt.title = title;
            this.prompt.hideInput = hideInput;
            this.prompt.onSubmit = onSubmit;
        },
        showPrompt() {
            this.prompt.show = true;
        },
        hidePrompt() {
            this.prompt.show = false;
        },

        configureNotification(text: string, body?: any, bodyProps?: any) {
            this.notification.text = text;
            this.notification.body = body;
            this.notification.bodyProps = bodyProps;
        },
        showNotification() {
            this.notification.show = true;
        },
        hideNotification() {
            this.notification.show = false;
        },
    },
})