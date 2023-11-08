<script setup>
defineProps({
  item: Object,
  useRestoreItem: Function,
  userID: Number,
  isAdmin: Boolean
});

const emit = defineEmits(["restore-item"]);
</script>

<template>
  <NuxtLink
    v-if="item.deleted_at !== null"
    class="btn btn-primary btn-sm mr-2"
    :class="{ disabled: item.user_id !== userID && item.user_role_edit_id !== userID && !isAdmin }"
    @click.prevent="emit('restore-item', item.id)"
    title="Khôi phục bài viết"
    data-toggle="tooltip"
    data-placement="top"
  >
    <i class="text-white bi bi-arrow-counterclockwise"></i>
  </NuxtLink>
</template>
