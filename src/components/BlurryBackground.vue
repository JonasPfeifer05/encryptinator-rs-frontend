<script setup lang="ts">
const emit = defineEmits<{
  (e: "pressed"): void
}>();
</script>

<template>
  <div id="blur" class="vw-100 vh-100 position-absolute top-0 start-0" @click="emit('pressed')"/>
</template>

<style scoped lang="scss">
  #blur {
    backdrop-filter: blur(3px);
  }
</style>