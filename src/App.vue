<script setup lang="ts">
import {useModal} from "./stores/modalStore.ts";
import PromptModal from "./components/PromptModal.vue";
import NotificationModal from "./components/NotificationModal.vue";

const modalStore = useModal();
</script>

<template>
  <RouterView/>
  <PromptModal v-if="modalStore.prompt.show" :title="modalStore.prompt.title" @cancel="modalStore.hidePrompt"
               @submit="modalStore.prompt.onSubmit"/>
  <NotificationModal v-if="modalStore.notification.show" :text="modalStore.notification.text" @ok="modalStore.hideNotification" >
    <component :is="modalStore.notification.body" v-bind="modalStore.notification.bodyProps" />
  </NotificationModal>
</template>

<style scoped>

</style>
