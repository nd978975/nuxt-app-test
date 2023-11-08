<script setup>
defineProps({
  item: Object,
  moduleName: String,
});
</script>

<template>
  <NuxtLink
    v-if="item.deleted_at === null"
    :to="`/${moduleName}/${item.slug}`"
    class="btn btn-sm btn-secondary mr-2"
    :class="{ disabled: item.deleted_at !== null }"
    title="Xem trước bài đăng"
    data-toggle="tooltip"
    data-placement="top"
    target="_blank"
  >
    <i class="text-white bi bi bi-eye"></i>
  </NuxtLink>
</template>
