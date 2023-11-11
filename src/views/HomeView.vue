<script setup lang="ts">
import {useRoute} from "vue-router";

const route = useRoute();
</script>

<template>
  <nav id="navbar" class="d-flex justify-content-center align-items-center p-3 gap-5">
    <router-link
        to="/home/store"
        class="text-reset"
    >
      <button class="btn btn-success" :class="{'text-decoration-underline': route.name === 'home.store'}">
        Store data
      </button>
    </router-link>
    <router-link
        to="/home/retrieve"
        class="text-reset">
      <button class="btn btn-success" :class="{'text-decoration-underline': route.name === 'home.retrieve'}">
        Retrieve data
      </button>
    </router-link>
  </nav>
  <router-view/>
</template>

<style scoped lang="scss">
#navbar {
  height: 75px;
}
</style>