<script setup>
const route = useRoute()
const { $categoryStore } = useNuxtApp()

let categories = ref(null)

onMounted(async () => {
  await $categoryStore.getList()
  categories.value = $categoryStore.list
})

// const {
//   data: categories,
//   pending,
//   error
// } = await useAsyncData('categories', async () => {
//   const result = await $fetch(
//     `http://localhost:8000/danh-muc/list`,
//     {
//       method: "GET",
//     }
//   );
//   const item = await result.categories
//   return item;
// });
</script>

<template>
  <h1>Danh sach Category</h1>
  <ul v-if="categories">
    <li v-for="(item, index) in categories" v-bind:key="index">
      <NuxtLink :to="`/category/${item.slug}`">{{ item.name }}</NuxtLink>
    </li>
  </ul>
</template>