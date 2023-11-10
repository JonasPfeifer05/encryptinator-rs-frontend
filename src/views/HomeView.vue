<script setup lang="ts">

</script>

<template>
  <nav id="navbar" class="d-flex justify-content-between align-items-center p-3">
    <h2>Welcome back</h2>
    <button class="btn btn-success">
      <router-link to="/home" class="text-reset text-decoration-none">Continue as guest</router-link>
    </button>
  </nav>
  <h1>home</h1>
  <router-view/>
</template>

<style scoped lang="scss">
#navbar {
  height: 75px;
}
</style>