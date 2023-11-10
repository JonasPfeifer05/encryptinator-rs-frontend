import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"
import "./assets/main.scss"
import "bootstrap"
import {createPinia} from "pinia";

let app = createApp(App);
const pinia = createPinia();

app.use(pinia)
app.use(router);
app.mount("#app");
