<script setup>
const route = useRoute();
const {$categoryStore} = useNuxtApp()

import axios from "~/plugins/axios";
const $axios = axios().provide.axios;

// const cookieCat = useCookie("category")
// let itemCategory = ref(null)

// onMounted(async () => {
//   await $categoryStore.getItem({ slug: route.params.slug })
//   cookieCat.value = $categoryStore.item
//   console.log(cookieCat);
// })

// if(!cookie.value) {
//   cookie.value = null
// } else if (cookie.value) {
//   itemCategory.value = cookie.value
// }



// function genRandonString(length) {
//   var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
//   var charLength = chars.length;
//   var result = "";
//   for (var i = 0; i < length; i++) {
//     result += chars.charAt(Math.floor(Math.random() * charLength));
//   }
//   return result;
// } 

// const { data: itemCategory, error, refresh } = await useAsyncData('itemCategory', async () => {
//   const res = await $axios.get(`/danh-muc/detail-by-slug/${route.params.slug}`)
//   console.log("response: ", res.data.data);
//   return res.data.data
// })

const refreshData = async () => {
  await refresh()
}

// function genRandonString(length) {
//   var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
//   var charLength = chars.length;
//   var result = "";
//   for (var i = 0; i < length; i++) {
//     result += chars.charAt(Math.floor(Math.random() * charLength));
//   }
//   return result;
// }

// const { data: itemCategory, pending, error, refresh } =  await useFetch(`http://localhost:8000/danh-muc/detail-by-slug/${route.params.slug}`, {
//   method: "GET",
//   transform: (data) => data.data
// })

const { data: categoryInfo, pending, error, refresh } = await useAsyncData("categoryInfo", 
async () => {
  return await $fetch("https://api.chamsocmevabe.top/danh-muc/detail-by-slug/nam-khoa")
  // return await $fetch("https://dummyjson.com/products/1")
  // return await $fetch("https://fakestoreapi.com/products/1")
  // return await $fetch("https://dog.ceo/api/breeds/image/random")
  // return await $fetch("http://localhost:8000/api/danh-muc/detail-by-slug/benh-xuat-tinh-som")
},
{
  lazy: false,
  transform: (categoryInfo) => categoryInfo.data
}
)
</script>

<template>
  <h1 style="color: rgb(86, 238, 205)">Data to server:</h1>
  <h2 v-if="categoryInfo">{{ categoryInfo.name }}</h2>
  <h2 v-if="pending">{{ pending }}</h2>
  <h2 v-if="error">{{ error }}</h2>

  <button @click="refreshData">Refresh</button>

  <NuxtLink to="/category">Back to all categories</NuxtLink>
</template>