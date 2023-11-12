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
  <blurry-background @pressed="emit('ok')"/>
  <form id="modal"
        class="w-75 position-absolute top-50 start-50 translate-middle border border-2 p-3 light-dark-bg light-dark-border rounded-3"
        @submit.prevent="emit('ok')">
    <div id="title" class="d-flex align-items-center h3 border-bottom border-1">{{ props.text }}</div>
    <div id="footer" class="d-flex justify-content-end align-items-center">
        <button id="submit" type="submit" class="action btn btn-success">Ok</button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.action {
  width: 100px;
}

#modal {
  box-sizing: content-box !important;
  height: 150px;
}

#title {
  height: 75px;
}

#footer {
  height: 75px;
}
</style>