<script setup lang="ts">
const emit = defineEmits<{
  pressed: []
}>();

interface Props {
  title: string
  buttonText: string
}

const props = defineProps<Props>();
</script>

<template>
    <form id="form" class="px-3 rounded-3 d-flex flex-column align-items-center" @submit.prevent="emit('pressed')">
      <div id="titleContainer" class="d-flex align-items-center">
        <h2 id="title">{{props.title}}</h2>
      </div>

      <div id="content" class="w-100 d-flex flex-column justify-content-center align-items-center">
        <slot name="content"></slot>
      </div>

      <div id="buttonContainer" class="w-100 d-flex align-items-center justify-content-center">
        <button id="button" type="submit" class="btn btn-success">{{props.buttonText}}</button>
      </div>
      <div id="footerContainer" class="w-100 d-flex justify-content-center align-items-center">
        <slot name="footer"></slot>
      </div>
    </form>
</template>

<style scoped lang="scss">
#form {
  width: 400px;
  height: 500px;

  box-sizing: border-box;

  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);

  #titleContainer {
    height: 100px;
  }

  #content {
    height: calc(500px - 100px - 100px);
    width: 100%;
  }

  #buttonContainer {
    height: 50px;

    #button {
      width: 200px;
    }
  }

  #footerContainer {
    height: 50px;
  }
}
</style>