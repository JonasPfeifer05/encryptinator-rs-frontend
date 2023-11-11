<script setup lang="ts">
const emit = defineEmits<{
  pressed: []
}>();

interface Props {
  title?: string
  buttonText: string
  width: string,
  height: string,
  header: boolean,
  footer: boolean,
}

const props = defineProps<Props>();
</script>

<template>
  <form id="form" :style="{width: props.width,height: props.height}"
        class="px-3 d-flex flex-column align-items-center blurred-bg" @submit.prevent="emit('pressed')">
    <div v-if="props.header" id="titleContainer" class="d-flex align-items-center">
      <h2 id="title">{{ props.title }}</h2>
    </div>

    <div id="content" :style="{height: 'calc('+props.height+' - ' + ((props.header ? 75 : 0 - 60) - (props.footer ? 50 : 0)) + 'px'}" class="w-100">
      <slot name="content"></slot>
    </div>

    <div id="buttonContainer" class="w-100 d-flex align-items-center justify-content-center">
      <button id="button" type="submit" class="btn btn-success">{{ props.buttonText }}</button>
    </div>
    <div v-if="props.footer" id="footerContainer" class="w-100 d-flex justify-content-center align-items-center">
      <slot name="footer"></slot>
    </div>
  </form>
</template>

<style scoped lang="scss">
#form {
  box-sizing: border-box;

  #titleContainer {
    height: 75px;
  }

  #content {
    width: 100%;
  }

  #buttonContainer {
    height: 60px;

    #button {
      width: 200px;
    }
  }

  #footerContainer {
    height: 50px;
  }
}
</style>