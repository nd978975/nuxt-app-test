<script setup>
defineProps({
  count: Object,
  moduleName: String,
});
</script>

<template>
  <NuxtLink
    :to="`/admin/${moduleName}`"
    class="article-menu-link inline-block"
    style="text-decoration: none"
  >
    Tất cả
    <span class="inline-block">{{ count.countList }}</span>
  </NuxtLink>
  <span class="mr-1 ml-1 inline-block">|</span>
  <NuxtLink
    :to="`/admin/${moduleName}/my-item`"
    class="article-menu-link inline-block"
    style="text-decoration: none"
  >
    Của tôi
    <span>{{ count.countMyItem }}</span>
  </NuxtLink>
  <span class="mr-1 ml-1">|</span>
  <NuxtLink
    :to="`/admin/${moduleName}/public`"
    class="article-menu-link"
    style="text-decoration: none"
  >
    Đã xuất bản
    <span>{{ count.countPublic }}</span>
  </NuxtLink>
  <span class="mr-1 ml-1">|</span>
  <NuxtLink
    :to="`/admin/${moduleName}/draft`"
    class="article-menu-link"
    style="text-decoration: none"
  >
    Nháp
    <span>{{ count.countDraft }}</span>
  </NuxtLink>
  <span class="mr-1 ml-1">|</span>
  <NuxtLink
    :to="`/admin/${moduleName}/trash`"
    class="article-menu-link"
    style="text-decoration: none"
  >
    Thùng rác
    <span>{{ count.countTrash }}</span>
  </NuxtLink>
</template>