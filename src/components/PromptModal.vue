<script setup lang="ts">
import BlurryBackground from "../components/BlurryBackground.vue";
import {computed, onMounted, ref} from "vue";

interface Props {
  title: string,
  hideInput: boolean,
}

const props = defineProps<Props>();

const data = ref("");

const emit = defineEmits<{
  (e: "submit", data: string): void,
  (e: "cancel"): void
}>();

const displayValidInput = computed(() => {
  return data.value.length !== 0;
})

onMounted(() => {
  data.value = "";
  (document.getElementById("input") as HTMLInputElement).select();
})

function submit() {
  if (data.value.length === 0) return;
  emit('submit', data.value)
}

function cancel() {
  emit("cancel");
}
</script>

<template>
  <blurry-background @pressed="cancel"/>
  <form id="modal"
        class="w-50 position-absolute top-50 start-50 translate-middle border border-2 p-3 light-dark-bg light-dark-border rounded-3"
        @submit.prevent="submit">
    <div id="title" class="d-flex align-items-center h3">{{ props.title }}</div>
    <div id="body"
         class="border-bottom border-top border-2 light-dark-border d-flex flex-column justify-content-center">
      <input id="input"
             autocomplete="off"
             :type="hideInput ? 'password' : 'text'"
             class="form-control"
             v-model="data"
             :class="{'is-valid': displayValidInput, 'is-invalid': !displayValidInput}">
      <div v-if="data.length === 0" class="invalid-feedback">Please enter something!</div>
      <div class="valid-feedback">Looks good!</div>
    </div>
    <div id="footer" class="d-flex justify-content-end align-items-center">
      <div class="d-flex gap-3">
        <button type="button" id="test" class="action btn btn-danger" @click="cancel">Cancel</button>
        <button type="submit" class="action btn btn-success">Submit</button>
      </div>
    </div>

  </form>
</template>

<style scoped lang="scss">
.action {
  width: 100px;
}

#modal {
  box-sizing: content-box !important;
  height: 350px;
}

#title {
  height: 75px;
}

#body {
  height: 200px;
}

#footer {
  height: 75px;
}
</style>