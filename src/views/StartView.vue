<script setup lang="ts">
</script>

<template>
  <nav id="navbar" class="d-flex bg-dark justify-content-between align-items-center p-3">
    <h2 class="text-white">Welcome back</h2>
    <button class="btn btn-success  text-white">
      <router-link to="/home" class="text-reset text-decoration-none">Continue as guest</router-link>
    </button>
  </nav>
  <div id="content">
    <RouterView/>
  </div>
</template>

<style scoped lang="scss">
#navbar {
  height: 75px;
}
#content {
  width: 100vw;
  height: calc(100vh - 75px);
}
</style>