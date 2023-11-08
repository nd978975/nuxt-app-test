<script setup>
defineProps({
  item: Object,
  userID: Number,
  isAdmin: Boolean
});

const emit = defineEmits(["public-item"]);
</script>

<template>
  <NuxtLink
    v-if="item.status === 0 && item.deleted_at === null"
    class="btn btn-sm btn-info mr-2"
    :class="{ disabled: item.deleted_at !== null || (item.user_id !== userID && item.user_role_edit_id !== userID && !isAdmin)}"
    @click.prevent="emit('public-item', item.id)"
    title="Đăng công khai bài viết"
    data-toggle="tooltip"
    data-placement="top"
  >
  <i class="text-white bi bi-cloud-arrow-up"></i>
  </NuxtLink>
</template>
