<script setup>
const { $userStore } = useNuxtApp();

</script>
<template>
  <NuxtLink to="/login">Login</NuxtLink><br />
  <NuxtLink to="/sigup">Sigup</NuxtLink><br />
  <NuxtLink to="/admin">Admin</NuxtLink><br />
  <NuxtLink to="/admin/article">Danh sach bai viet</NuxtLink><br />
  <NuxtLink to="/admin/category">Danh sach danh muc</NuxtLink><br />
  <NuxtLink to="/category">Category</NuxtLink><br />
  <div v-if="$userStore.user">
    <NuxtLink to="/admin/user/profile">{{ $userStore.user.name }}</NuxtLink
    ><br />
  </div>
  <div v-else><NuxtLink to="/admin/user/profile">Profile</NuxtLink><br /></div>
  <a href="" @click.prevent="$userStore.logout">Logout</a><br />
  <a href="" @click.prevent="$userStore.getToken()">getToken</a><br />
</template>
