<script setup>
defineProps({
  item: Object,
  userID: Number,
  isAdmin: Boolean,
  moduleName: String
});
</script>

<template>
  <NuxtLink
    v-if="item.deleted_at === null"
    :to="`/admin/${moduleName}/edit/${item.id}`"
    :class="{ disabled: item.deleted_at !== null || (item.user_id !== userID && item.user_role_edit_id !== userID && !isAdmin)}"
    title="Chỉnh sửa"
    class="btn btn-sm btn-success mr-2"
    data-toggle="tooltip"
    data-placement="top"
  >
    <i class="text-white bi bi-pencil-square"></i>
  </NuxtLink>
</template>
