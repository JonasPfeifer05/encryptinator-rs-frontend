<script setup lang="ts">
import ThemeForm from "../components/ThemeForm.vue";
import {ref, Ref} from "vue";
import {useUser} from "../stores/userStore.ts";

const userStore = useUser();

const storeOption: Ref<"online" | "local"> = ref("local");
const name = ref("")
</script>

<template>
  <theme-form button-text="Load" :footer="false" :header="false" width="100%" height="100%">
    <template #content>
      <div class="w-100 h-100 d-flex flex-column align-items-center">
        <div id="optionContainer" class="w-100 d-flex flex-column justify-content-center">
          <label for="optionInput" class="form-label">Select where to store</label>
          <select id="optionInput" class="form-select" v-model="storeOption">
            <option value="local" selected>Locally</option>
            <option value="online" :disabled="!userStore.isLoggedIn">Online</option>
          </select>
        </div>
      </div>
      <div id="nameContainer" class="w-100 d-flex flex-column justify-content-center">
        <label for="nameInput" class="form-label">Select what to load</label>
        <select id="nameInput" class="form-select" v-model="name">
          <option value="text">example1</option>
          <option value="file">example2</option>
        </select>
      </div>
    </template>
  </theme-form>
</template>

<style scoped>
#optionContainer {
  height: 100px;
}
#nameContainer {
  height: 100px;
}
</style>