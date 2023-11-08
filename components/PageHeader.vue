<script setup>
defineProps({
  title: String,
  buttonClass: String,
  url: String,
  buttonName: String,
});
</script>

<template>
  <div style="display: flex; justify-content: space-between">
    <h3 class="m-0 font-weight-bold text-primary">{{ title }}</h3>
    <NuxtLink class="btn btn-sm" :class="buttonClass" :to="url">
      {{ buttonName }}
    </NuxtLink>
  </div>
</template>