<script setup lang="ts">
import ThemeForm from "../components/ThemeForm.vue";
import {computed, ref, Ref} from "vue";
import {useUser} from "../stores/userStore.ts";
import {Store} from "tauri-plugin-store-api";
import {invoke} from "@tauri-apps/api";
import {useModal} from "../stores/modalStore.ts";
import DecryptedText from "../components/DecryptedText.vue";
import {EntryData} from "../util/entryData.ts";
import {save} from "@tauri-apps/api/dialog";

const userStore = useUser();
const modalStore = useModal();

const storeOption: Ref<"online" | "local"> = ref("local");
const name = ref("");

const displayNameValid = computed(() => {
  return name.value.length !== 0;
})

const names = ref([] as string[]);

async function loadNames() {
  const store = new Store(".local.dat");
  names.value = await store.keys();
}

loadNames();

function load() {
  modalStore.configurePrompt("Enter master password to decrypt", true, submitData => {
    modalStore.hidePrompt();
    loadDecrypted(name.value, submitData)
  })
  modalStore.showPrompt();
}

async function loadDecrypted(name: string, password: string) {
  const store = new Store(".local.dat");
  const data: EntryData = (await store.get(name))!;

  const decryptedValue = await invoke("decrypt", {
    data: data.value,
    password
  });

  if (data.metaData.isFile) {
    modalStore.configureNotification("Data was decrypted");
    modalStore.showNotification();

    const path = await save({
      defaultPath: data.metaData.fileName
    });

    if (path) {
      await invoke("write_to_file", {
        path,
        data: decryptedValue
      })
    }
  } else {
    modalStore.configureNotification("Data was decrypted", DecryptedText, { value: decryptedValue });
    modalStore.showNotification();
  }
}

</script>

<template>
  <theme-form button-text="Load" class="rounded-bottom-3" :footer="false" :header="false" width="100%" height="100%"
              @pressed="load">
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
        <select id="nameInput" class="form-select" v-model="name"
                :class="{'is-valid': displayNameValid, 'is-invalid': !displayNameValid}">
          <option :value="name" v-for="name of names" :key="name">{{ name }}</option>
        </select>
        <div v-if="!displayNameValid" class="invalid-feedback">
          No name provided!
        </div>
        <div class="valid-feedback">Looks good!</div>
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
#decryptedText {
  resize: none;
}
</style>