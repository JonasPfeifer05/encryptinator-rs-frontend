<script setup lang="ts">

import ThemeForm from "../components/ThemeForm.vue";
import {computed, type Ref, ref} from "vue";
import {isValidEmail} from "../util/validation.ts";
import {useUser} from "../stores/userStore.ts";
import {useRouter} from "vue-router";

const userStore = useUser();
const router = useRouter();

let emailError: Ref<"noError" | "noEmail" | "invalid" | "alreadyInUse"> = ref("noEmail");
let passwordError: Ref<"noError" | "noPassword"> = ref("noPassword");

const email = ref("");
const password = ref("");

async function register() {
  if (emailError.value !== "noError" || passwordError.value !== "noError") return;
  const result = await userStore.registerUser(email.value, password.value);
  if (result.isOk()) {
    console.log("Registered");
    await router.push("/home/dashboard")
  } else {
    console.log("ERROR: " + result.getErr());
  }
}

const displayValidEmail = computed(() => {
  updateEmailError();
  return emailError.value === "noError";
})
function updateEmailError() {
  if (email.value.length === 0) return emailError.value = "noEmail";
  if (!isValidEmail(email.value)) return emailError.value = "invalid";
  emailError.value = "noError";
}

const displayValidPassword = computed(() => {
  updatePasswordError();
  return passwordError.value === "noError";
})
function updatePasswordError() {
  if (password.value.length === 0) return passwordError.value = "noPassword";
  passwordError.value = "noError";
}

</script>

<template>
  <ThemeForm class="position-absolute top-50 start-50 translate-middle"
             title="Register"
             button-text="register"
             @pressed="register">
    <template #content>
      <div class="w-75 mb-3">
        <label for="emailInput" class="form-label">Email:</label><br>
        <input v-model="email"
               id="emailInput"
               type="text"
               class="form-control"
               :class="{'is-valid': displayValidEmail, 'is-invalid': !displayValidEmail}"
               placeholder="Enter email:">
        <div v-if="emailError==='noEmail'" class="invalid-feedback">No email provided!</div>
        <div v-if="emailError==='invalid'" class="invalid-feedback">Invalid formatted email!</div>
        <div v-if="emailError==='alreadyInUse'" class="invalid-feedback">Email is already in use!</div>
        <div class="valid-feedback">Looks good!</div>
        <small class="form-text">This email must be verify!</small>
      </div>

      <div class="w-75">
        <label for="passwordInput" class="form-label">Password:</label>
        <input v-model="password"
               id="passwordInput"
               type="password"
               class="form-control"
               :class="{'is-valid': displayValidPassword, 'is-invalid': !displayValidPassword}"
               placeholder="Enter password:">
        <div v-if="passwordError==='noPassword'" class="invalid-feedback">No password provided!</div>
        <div class="valid-feedback">Looks good!</div>
      </div>
    </template>
    <template #footer>
      <div class="w-100 d-flex justify-content-around">
        <router-link to="/start/login">Have an account?</router-link>
        <router-link to="/home/dashboard">Continue as guest</router-link>
      </div>
    </template>
  </ThemeForm>
</template>

<style scoped lang="scss">
#form {
  width: 400px;
  height: 500px;

  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>