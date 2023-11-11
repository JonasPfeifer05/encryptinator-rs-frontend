import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"
import "./assets/main.scss"
import "bootstrap"
import {createPinia} from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'


library.add(faRightFromBracket);

let app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedState)

app.use(pinia)
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount("#app");
