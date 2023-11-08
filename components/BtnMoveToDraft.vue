<script setup>
defineProps({
  item: Object,
  useMoveToDraft: Function,
  useMoveToTrash: Function,
  userID: Number,
  isAdmin: Boolean
});

const emit = defineEmits(["move-to-draft"]);
</script>

<template>
  <NuxtLink
    v-if="item.status === 1 && item.deleted_at === null"
    class="btn btn-sm btn-warning mr-2"
    :class="{ disabled: item.deleted_at !== null || (item.user_id !== userID && item.user_role_edit_id !== userID && !isAdmin)}"
    @click.prevent="emit('move-to-draft', item.id)"
    title="Chuyển thành lưu nháp"
    data-toggle="tooltip"
    data-placement="top"
  >
    <i class="text-white bi bi-folder-x"></i>
  </NuxtLink>
</template>
