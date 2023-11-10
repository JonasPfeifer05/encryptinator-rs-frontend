import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"
import "./assets/main.scss"
import "bootstrap"
import {createPinia} from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

let app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedState)

app.use(pinia)
app.use(router);
app.mount("#app");
