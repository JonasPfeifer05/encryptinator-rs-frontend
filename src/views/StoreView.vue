<script setup lang="ts">
import ThemeForm from "../components/ThemeForm.vue";
import {useUser} from "../stores/userStore.ts";
import {invoke} from "@tauri-apps/api";
import {Store} from "tauri-plugin-store-api";
import {useModal} from "../stores/modalStore.ts";

import {computed, Ref, ref} from "vue";

const userStore = useUser();
const modalStore = useModal();

const name = ref("");
const nameError: Ref<"noError" | "noName"> = ref("noName");
const storeVariant: Ref<"text" | "file"> = ref("text");
const storeOption: Ref<"online" | "local"> = ref("local");
const text = ref("");
const textError: Ref<"noError" | "noText"> = ref("noText");
const file: Ref<File | null> = ref(null);
const fileError: Ref<"noError" | "noFile"> = ref("noFile");

const displayNameValid = computed(() => {
  updateNameError();
  return nameError.value === "noError";
})

function updateNameError() {
  if (name.value.length === 0) return nameError.value = "noName";
  nameError.value = "noError";
}

const displayTextValid = computed(() => {
  updateTextError()
  return textError.value === "noError";
})

const displayFileValid = computed(() => {
  updateFileError();
  return fileError.value === "noError";
})

function updateTextError() {
  if (text.value.length === 0) return textError.value = "noText";
  textError.value = "noError"
}

function updateFileError() {
  if (file.value === null) return fileError.value = "noFile";
  fileError.value = "noError";
}

function setFile(event: Event) {
  file.value = (event.target as HTMLInputElement).files!.item(0);
}

async function store() {
  if (nameError.value !== "noError") return;

  let data: string;
  if (storeVariant.value === "text") {
    if (textError.value !== "noError") return;
    data = text.value;
  } else {
    if (fileError.value !== "noError") return;

    data = await file.value!.text();
  }

  const store = new Store(".local.dat");
  if (await store.has(name.value)) {
    modalStore.configureNotification("Name is already in use!");
    modalStore.showNotification();
    return;
  }

  modalStore.configurePrompt("Enter a password to encrypt", true, submitData => {
    modalStore.hidePrompt();
    storeEncrypted(data, submitData, name.value);
  });
  modalStore.showPrompt();
}

async function storeEncrypted(data: string, password: string, name: string) {
  const encrypted = await invoke("encrypt", {
    data,
    password
  });

  const store = new Store(".local.dat");
  await store.set(name, {
    metaData: {
      isFile: storeVariant.value === "file",
      fileName: file.value ? file.value!.name : "",
    },
    value: encrypted
  });

  resetValues();
  modalStore.configureNotification("Data was stored");
  modalStore.showNotification();
}

function resetValues() {
  name.value = "";
  text.value = "";
  file.value = null;
}
</script>

<template>
  <ThemeForm button-text="Store"
             width="100%"
             height="100%"
             :footer="false"
             :header="false"
             class="rounded-bottom-3"
             @pressed="store">
    <template #content>
      <div class="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
        <div id="nameContainer" class="w-100 d-flex align-items-center">
          <div class="w-100">
            <label for="nameInput" class="form-label">Name</label>
            <input v-model="name"
                   id="nameInput"
                   type="text"
                   class="form-control"
                   :class="{'is-valid': displayNameValid, 'is-invalid': !displayNameValid}"
                   placeholder="Enter a name for the data to store:">
            <div v-if="nameError==='noName'" class="invalid-feedback">No name provided!</div>
            <div class="valid-feedback">Looks good!</div>
          </div>
        </div>
        <div id="variantContainer" class="w-100 d-flex flex-column justify-content-center">
          <label for="variantInput" class="form-label">Select what to store</label>
          <select id="variantInput" class="form-select" v-model="storeVariant">
            <option value="text" selected>Text</option>
            <option value="file">File</option>
          </select>
        </div>
        <div id="uploadContainer" class="w-100 d-flex flex-column justify-content-center">
          <template v-if="storeVariant==='text'">
            <label for="textInput" class="form-label">Text</label>
            <textarea v-model="text" class="form-control"
                      :class="{'is-valid': displayTextValid, 'is-invalid': !displayTextValid}" id="textInput"
                      placeholder="Enter the text to store:" rows="2"/>
            <div v-if="textError==='noText'" class="invalid-feedback">No text provided!</div>
            <div class="valid-feedback">Looks good!</div>
          </template>
          <template v-else>
            <label for="fileInput" class="form-label">File</label>
            <input v-on:change="setFile"
                   type="file"
                   id="fileInput"
                   class="form-control"
                   :class="{'is-valid': displayFileValid, 'is-invalid': !displayFileValid}">
            <div v-if="fileError==='noFile'" class="invalid-feedback">No file provided!</div>
            <div class="valid-feedback">Looks good!</div>
          </template>
        </div>
        <div id="optionContainer" class="w-100 d-flex flex-column justify-content-center">
          <label for="optionInput" class="form-label">Select where to store</label>
          <select id="optionInput" class="form-select" v-model="storeOption">
            <option value="local" selected>Locally</option>
            <option value="online" :disabled="!userStore.isLoggedIn">Online</option>
          </select>
        </div>
      </div>
    </template>
    <template #footer></template>
  </ThemeForm>
</template>

<style scoped lang="scss">
#textInput {
  resize: none;
}

#nameContainer {
  height: 100px;
}

#variantContainer {
  height: 100px;
}

#uploadContainer {
  height: 150px;
}

#optionContainer {
  height: 100px;
}
</style>