import {createRouter, createWebHistory} from "vue-router";
import StartView from "../views/StartView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import HomeView from "../views/HomeView.vue";
import RetrieveView from "../views/RetrieveView.vue";
import StoreView from "../views/StoreView.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/start",
            component: StartView,
            children: [
                {
                    path: "login",
                    component: LoginView,
                },
                {
                    path: "register",
                    component: RegisterView,
                }
            ]
        },
        {
            path: "/home",
            component: HomeView,
            children: [
                {
                    path: "retrieve",
                    component: RetrieveView,
                },
                {
                    path: "store",
                    component: StoreView,
                }
            ]
        },
        {
            path: "/",
            redirect: "/start/login",
        }
    ]
})