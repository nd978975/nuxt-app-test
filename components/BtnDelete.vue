<script setup>
defineProps({
  item: Object,
  useDeleteItem: Function,
  userID: Number,
  isAdmin: Boolean
});

const emit = defineEmits(["delete-item"]);
</script>

<template>
  <!-- <NuxtLink
    v-if="item.deleted_at !== null"
    class="btn btn-danger btn-sm mr-2"
    :class="{ disabled: item.user_id !== userID && item.user_role_edit_id !== userID && !isAdmin }"
    @click.prevent="useDeleteItem(item.id)"
    title="Xóa vĩnh viễn bài viết"
    data-toggle="tooltip"
    data-placement="top"
  >
    <i class="text-white bi bi-trash3"></i>
  </NuxtLink> -->
  <NuxtLink
    class="btn btn-danger btn-sm mr-2"
    :class="{ disabled: item.user_id !== userID && item.user_role_edit_id !== userID && !isAdmin }"
    @click.prevent="emit('delete-item', item.id)"
    title="Xóa vĩnh viễn bài viết"
    data-toggle="tooltip"
    data-placement="top"
  >
    <i class="text-white bi bi-trash3"></i>
  </NuxtLink>
</template>
