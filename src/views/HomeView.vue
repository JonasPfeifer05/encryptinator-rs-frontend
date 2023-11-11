<script setup lang="ts">
import {useRoute} from "vue-router";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useUser} from "../stores/userStore.ts";

const route = useRoute();
const userStore = useUser();

function logout() {
  userStore.logout()
}
</script>

<template>
  <nav id="navbar" class="d-flex justify-content-end align-items-center p-3 gap-5">
    <router-link to="/start/login" @click="logout" class="text-reset text-decoration-none h4">
      Logout
      <font-awesome-icon icon="fa-solid fa-right-from-bracket"></font-awesome-icon>
    </router-link>
  </nav>

  <div id="content" class="position-absolute start-50 translate-middle-x">
    <div id="header" class="d-flex blurred-bg rounded-top-3">
      <div class="flex-grow-1 d-flex justify-content-center align-items-center">
        <router-link to="/home/store" class="text-reset text-decoration-none h2"
                     :class="{'grayed': route.name !== 'home.store'}">Store
        </router-link>
      </div>
      <div class="flex-grow-1 d-flex justify-content-center align-items-center border-start">
        <router-link to="/home/retrieve" class="text-reset text-decoration-none h2"
                     :class="{'grayed': route.name !== 'home.retrieve'}">Load
        </router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style scoped lang="scss">
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";

#content {
  top: 100px;
  width: 80%;
  height: 550px;
}

#header {
  height: 75px;
}

#navbar {
  height: 75px;
}

.grayed {
  color: $gray-700 !important;
}

#icon {
  height: 25px;
}


</style>