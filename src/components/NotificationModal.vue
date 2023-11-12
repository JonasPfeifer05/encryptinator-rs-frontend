<script setup lang="ts">
import BlurryBackground from "./BlurryBackground.vue";
import {onMounted} from "vue";

interface Props {
  text: string
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "ok"): void
}>();

onMounted(() => {
  (document.getElementById("submit") as HTMLButtonElement).focus();
})
</script>

<template>
  <div>
    <blurry-background @pressed="emit('ok')"/>
    <form id="modal"
          class="w-50 position-absolute top-50 start-50 translate-middle border border-2 p-3 light-dark-bg light-dark-border rounded-3"
          @submit.prevent="emit('ok')">
      <div id="title" class="d-flex align-items-center h3">{{ props.text }}</div>
      <div id="content" class="border-bottom border-top border-1">
        <slot/>
      </div>
      <div id="footer" class="d-flex justify-content-end align-items-center">
        <button id="submit" type="submit" class="action btn btn-success">Ok</button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.action {
  width: 100px;
}

#modal {
  height: fit-content;
  box-sizing: content-box !important;
}

#title {
  height: 75px;
}

#footer {
  height: 75px;
}
</style>