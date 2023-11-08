<script setup>
defineProps({
  item: Object,
  useMoveToTrash: Function,
  userID: Number,
  isAdmin: Boolean
});

const emit = defineEmits(["move-to-trash"]);
</script>

<template>
  <NuxtLink
    v-if="item.deleted_at === null"
    class="btn btn-sm btn-danger mr-2"
    :class="{ disabled: item.deleted_at !== null || (item.user_id !== userID && item.user_role_edit_id !== userID && !isAdmin)}"
    @click.prevent="emit('move-to-trash', item.id)"
    title="Chuyển vào thùng rác"
    data-toggle="tooltip"
    data-placement="top"
  >
    <i class="text-white bi bi-trash2"></i>
  </NuxtLink>
</template>
