<script setup lang="ts">
import ThemeForm from "../components/ThemeForm.vue";
import {useUser} from "../stores/userStore.ts";
import {useModal} from "../stores/modalStore.ts";
import {computed, ref, Ref} from "vue";
import {Store} from "tauri-plugin-store-api";
import {EntryData} from "../util/entryData.ts";
import {invoke} from "@tauri-apps/api";

const userStore = useUser();
const modalStore = useModal();

const storeOption: Ref<"online" | "local"> = ref("local");
const selectedName = ref("");
const newName = ref("");
const actionOption: Ref<"change" | "delete"> = ref("change")
const nameVariant: Ref<"text" | "file"> = ref("text");
const newText = ref("");
const newFile: Ref<File | null> = ref(null);

async function updateType() {
  const store = new Store(".local.dat");
  const data: EntryData = (await store.get(selectedName.value))!;

  nameVariant.value = data.metaData.isFile ? "file" : "text";
}

const displaySelectedNameValid = computed(() => {
  return selectedName.value.length !== 0;
})

const names = ref([] as string[]);

async function loadNames() {
  const store = new Store(".local.dat");
  names.value = await store.keys();
  names.value.sort();
}

loadNames();

async function save() {
  console.log("a")
  const store = new Store(".local.dat");
  if (actionOption.value === "delete") {
    await store.delete(selectedName.value);
    modalStore.configureNotification("Data was deleted");
    modalStore.showNotification();
    resetValues();
  } else {
    if (newName.value.length !== 0 && await store.has(newName.value)) {
      modalStore.configureNotification("Name is already in use!");
      modalStore.showNotification();
      return;
    }
    await store.set(newName.value, await store.get(selectedName.value))

    if (newFile.value || newText.value.length > 0) {
      modalStore.configurePrompt("Enter a password to encrypt", true, submitData => {
        modalStore.hidePrompt();
        updateValues(submitData);
      });
      modalStore.showPrompt();
    } else {
      await store.delete(selectedName.value);
      modalStore.configureNotification("Data was changed");
      modalStore.showNotification();
      resetValues();
    }
  }
}

async function updateValues(password: string) {
  const store = new Store(".local.dat");
  const oldData = await store.get(selectedName.value) as EntryData;

  if (oldData.metaData.isFile && newFile.value !== null) {
    oldData.value = await invoke("encrypt", {
      data: await newFile.value!.text(),
      password,
    })
  } else if (!oldData.metaData.isFile && newText.value.length !== 0) {
    oldData.value = await invoke("encrypt", {
      data: newText.value,
      password,
    })
  }

  await store.set(newName.value, oldData)
  await store.delete(selectedName.value);

  modalStore.configureNotification("Data was changed");
  modalStore.showNotification();

  resetValues();
}

function resetValues() {
  newName.value = "";
  selectedName.value = "";
  loadNames();
}

function setFile(event: Event) {
  newFile.value = (event.target as HTMLInputElement).files!.item(0);
}

function loadPreviousText() {
  modalStore.configurePrompt("Enter a password to encrypt", true, submitData => {
    modalStore.hidePrompt();
    setPreviousData(submitData);
  });
  modalStore.showPrompt();
}

async function setPreviousData(password: string) {
  const store = new Store(".local.dat");
  const encryptedData = await store.get(selectedName.value) as EntryData;
  newText.value = await invoke("decrypt", {
    password,
    data: encryptedData.value
  });
}
</script>

<template>
  <ThemeForm class="rounded-bottom-3" button-text="Save" :footer="false" width="100%" :header="false" height="100%"
             @pressed="save">
    <template #content>
      <div class="w-100 h-100 d-flex flex-column align-items-center">
        <div id="optionContainer" class="w-100 d-flex flex-column justify-content-center">
          <label for="optionInput" class="form-label">Select where to store</label>
          <select id="optionInput" class="form-select" v-model="storeOption">
            <option value="local" selected>Locally</option>
            <option value="online" :disabled="!userStore.isLoggedIn">Online</option>
          </select>
        </div>
        <div id="selectedNameContainer" class="w-100 d-flex flex-column justify-content-center">
          <label for="nameInput" class="form-label">Select what to load</label>
          <select id="nameInput" class="form-select" v-model="selectedName"
                  :class="{'is-valid': displaySelectedNameValid, 'is-invalid': !displaySelectedNameValid}"
                  @change="updateType">
            <option :value="name" v-for="name of names" :key="name">{{ name }}</option>
          </select>
          <div v-if="!displaySelectedNameValid" class="invalid-feedback">
            No name provided!
          </div>
          <div class="valid-feedback">Looks good!</div>
        </div>
        <div id="actionContainer" class="w-100 d-flex flex-column justify-content-center">
          <label for="optionInput" class="form-label">What do you want to do?</label>
          <select id="optionInput" class="form-select" v-model="actionOption">
            <option value="change" selected>Change</option>
            <option value="delete">Delete</option>
          </select>
        </div>
        <div id="newNameContainer" class="w-100 d-flex align-items-center">
          <div class="w-100">
            <label for="nameInput" class="form-label">New name (optional)</label>
            <input v-model="newName"
                   autocomplete="off"
                   id="nameInput"
                   type="text"
                   class="form-control"
                   :disabled="!displaySelectedNameValid || actionOption !== 'change'"
                   placeholder="Enter a new name for the data (optional):">
          </div>
        </div>
        <div id="dataContainer" class="w-100 d-flex flex-column justify-content-center">
          <template v-if="nameVariant==='text'">
            <label for="textInput" class="form-label">New text (optional)</label>
            <textarea v-model="newText" class="form-control"
                      id="textInput"
                      :disabled="!displaySelectedNameValid || actionOption !== 'change'"
                      placeholder="Enter a new text to store (optional):" rows="2"/>
            <button type="button" class="btn btn-success mt-3" @click="loadPreviousText">Load previous</button>
          </template>
          <template v-else>
            <label for="fileInput" class="form-label">New file (optional)</label>
            <input v-on:change="setFile"
                   type="file"
                   id="fileInput"
                   :disabled="!displaySelectedNameValid || actionOption !== 'change'"
                   class="form-control">
          </template>
        </div>
      </div>
    </template>
  </ThemeForm>
</template>

<style scoped lang="scss">
#optionContainer {
  height: 100px;
}

#selectedNameContainer {
  height: 100px;
}

#actionContainer {
  height: 100px;
}

#newNameContainer {
  height: 100px;
}

#dataContainer {
  height: 200px;
}
</style>