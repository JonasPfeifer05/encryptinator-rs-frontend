<script setup lang="ts">
import {computed, Ref, ref} from "vue";

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

import ThemeForm from "../components/ThemeForm.vue";
</script>

<template>
  <ThemeForm title="Store data"
             button-text="Store"
             :width="800"
             :height="600"
             :footer="false"
             class="position-absolute top-50 start-50 translate-middle">
    <template #content>
      <div class="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
        <div id="nameContainer" class="w-100 d-flex align-items-center">
          <div class="w-100">
            <label for="nameInput" class="form-label">Name:</label>
            <input v-model="name"
                   id="nameInput"
                   type="text"
                   class="form-control"
                   :class="{'is-valid': displayNameValid, 'is-invalid': !displayNameValid}"
                   placeholder="Enter a name for the data to store:">
            <div v-if="nameError==='noName'" class="invalid-feedback">No name provided!</div>
            <div class="valid-feedback">Looks good!</div>
            <small class="form-text">This is the name you have to select later to retrieve the data!</small>
          </div>
        </div>
        <div id="variantContainer" class="w-100 d-flex justify-content-around align-items-center">
          <div class="form-check">
            <input class="form-check-input" type="radio" value="text" id="storeTextInput" name="storeVariant"
                   v-model="storeVariant">
            <label class="form-check-label" for="storeTextInput" type="button" @click="storeVariant='text'">
              Store a text
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" value="file" id="storeFileInput" name="storeVariant"
                   v-model="storeVariant">
            <label class="form-check-label" for="storeFileInput" type="button" @click="storeVariant='file'">
              Store a file
            </label>
          </div>
        </div>
        <div id="uploadContainer" class="w-100 d-flex flex-column justify-content-center">
          <template v-if="storeVariant==='text'">
            <label for="textInput" class="form-label">Text</label>
            <textarea v-model="text" class="form-control"
                      :class="{'is-valid': displayTextValid, 'is-invalid': !displayTextValid}" id="textInput"
                      placeholder="Enter the text to store:" rows="4"/>
            <div v-if="textError==='noText'" class="invalid-feedback">No text provided!</div>
            <div class="valid-feedback">Looks good!</div>
          </template>
          <template v-else>
            <label for="fileInput" class="form-label">File</label>
            <input v-on:change="setFile"
                   type="file"
                   id="fileInput"
                   class="form-control"
                   :class="{'is-valid': displayFileValid, 'is-invalid': !displayFileValid}" >
            <div v-if="fileError==='noFile'" class="invalid-feedback">No file provided!</div>
            <div class="valid-feedback">Looks good!</div>
          </template>
        </div>
        <div id="optionContainer" class="w-100 d-flex justify-content-around align-items-center">
          <div class="form-check">
            <input class="form-check-input" type="radio" value="local" id="storeTextInput" name="uploadOption" checked
                   v-model="storeOption">
            <label class="form-check-label" for="storeTextInput" type="button" @click="storeOption='local'">
              Store it locally
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" value="online" id="storeFileInput" name="uploadOption"
                   v-model="storeOption">
            <label class="form-check-label" for="storeFileInput" type="button" @click="storeOption='online'">
              Store it online
            </label>
          </div>
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
  height: 150px;
}

#variantContainer {
  height: 50px;
}

#uploadContainer {
  height: 175px;
}

#optionContainer {
  height: 50px;
}
</style>