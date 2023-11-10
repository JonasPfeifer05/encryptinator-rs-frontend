<script setup lang="ts">

function continueAsGuest() {

}
</script>

<template>
  <nav id="navbar" class="d-flex bg-dark justify-content-between align-items-center p-3">
    <h2 class="text-white">Welcome back</h2>
    <button class="btn btn-success  text-white">Continue as guest</button>
  </nav>
  <RouterView/>
</template>

<style scoped lang="scss">
#navbar {
  height: 75px;
}
</style>