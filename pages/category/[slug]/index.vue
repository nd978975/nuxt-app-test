<script setup>
const route = useRoute();
const {$categoryStore} = useNuxtApp()

import axios from "~/plugins/axios";
const $axios = axios().provide.axios;
  
const refreshData = async () => {
  await refresh()
}

const { data: categoryInfo, pending, error, refresh } = await useAsyncData("categoryInfo", 
async () => {
  return await $fetch(`https://api.dodungchobe.xyz/danh-muc/detail-by-slug/${route.params.slug}`)
},
{
  lazy: false,
  transform: (categoryInfo) => categoryInfo.data
}
)
</script>

<template>
  <h1 style="color: rgb(86, 238, 205)">Data to server:</h1>
  <div v-if="categoryInfo">
    <div v-if="categoryInfo.deleted_at == null">
      <h2 v-if="categoryInfo">{{ categoryInfo.name }}</h2> 
      <div v-html="categoryInfo.description"></div>
    </div>
    <div v-else>Danh mục không tồn tại</div>
  </div>

  <button @click="refreshData">Refresh</button>

  <NuxtLink to="/category">Back to all categories</NuxtLink>
</template>
