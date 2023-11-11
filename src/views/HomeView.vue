<script setup lang="ts">
import {useRoute} from "vue-router";

const route = useRoute();
</script>

<template>
  <nav id="navbar" class="d-flex justify-content-center align-items-center p-3 gap-5">
    <button class="btn btn-success">
      <router-link
          to="/home/store"
          class="text-reset"
          :class="{'text-decoration-none': route.name !== 'home.store'}"
      >Store data
      </router-link>
    </button>
    <button class="btn btn-success">
      <router-link
          to="/home/retrieve"
          class="text-reset"
          :class="{'text-decoration-none': route.name !== 'home.retrieve'}">
        Retrieve data
      </router-link>
    </button>
  </nav>
  <router-view/>
</template>

<style scoped lang="scss">
#navbar {
  height: 75px;
}
</style>