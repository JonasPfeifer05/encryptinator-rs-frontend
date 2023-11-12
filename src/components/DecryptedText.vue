<script setup lang="ts">
interface Props {
  value: string
}

const props = defineProps<Props>();
</script>

<template>
<textarea :value="props.value" rows="4" class="w-100 form-control">

</textarea>
</template>

<style scoped lang="scss">
textarea {
  resize: none;
}
</style>