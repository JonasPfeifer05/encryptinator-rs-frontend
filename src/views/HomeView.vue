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
    <div id="header" class="d-flex light-dark-bg border border-2 border-bottom-0 light-dark-border rounded-top-3">
      <router-link to="/home/store" class="flex-grow-1 d-flex justify-content-center align-items-center text-reset"
                   :class="{'grayed': route.name !== 'home.store'}">
        <div class="text-decoration-none h2">
          Store
        </div>
      </router-link>
      <router-link to="/home/retrieve" class="flex-grow-1 border-start d-flex justify-content-center align-items-center text-reset"
                   :class="{'grayed': route.name !== 'home.retrieve'}">
        <div class="text-decoration-none h2">
          Load
        </div>
      </router-link>
      <router-link to="/home/manage" class="flex-grow-1 border-start d-flex justify-content-center align-items-center text-reset"
                   :class="{'grayed': route.name !== 'home.manage'}">
        <div class="text-decoration-none h2">
          Manage
        </div>
      </router-link>
    </div>
    <div id="body">
      <router-view/>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";

#content {
  top: 100px;
  width: 80%;
  max-height: 50vh;
}

#body {
  max-height: calc(100vh - 100px - 75px - 100px);
  overflow-y: auto;
}

#header {
  height: 75px;
  border-collapse: collapse;
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