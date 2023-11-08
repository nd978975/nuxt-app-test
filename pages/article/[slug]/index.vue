<script setup>
import { storeToRefs } from 'pinia';

const { $articleDetail } = useNuxtApp()
const route = useRoute()
onMounted(async () => {
  await $articleDetail.getArticle({ "slug" : route.params.slug})
  const { id, name, slug, content } = storeToRefs($articleDetail)
  idItem.value = id.value
  nameItem.value = name.value
  slugItem.value = slug.value
  contentItem.value = content.value
})

let idItem = ref()
let nameItem = ref("")
let slugItem = ref("")
let contentItem = ref("")
</script>

<template>
  <h1 v-if="nameItem">{{ nameItem }}</h1>
  <span v-if="slugItem">{{ slugItem }}</span>
  <div v-if="contentItem" v-html="contentItem"></div>
</template>