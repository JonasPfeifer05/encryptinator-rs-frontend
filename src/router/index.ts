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
            name: "start",
            children: [
                {
                    path: "login",
                    name: "start.login",
                    component: LoginView,
                },
                {
                    path: "register",
                    name: "start.register",
                    component: RegisterView,
                }
            ]
        },
        {
            path: "/home",
            component: HomeView,
            name: "home",
            children: [
                {
                    path: "retrieve",
                    name: "home.retrieve",
                    component: RetrieveView,
                },
                {
                    path: "store",
                    name: "home.store",
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