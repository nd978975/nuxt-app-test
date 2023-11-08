<script setup>
const { $articleDetail } = useNuxtApp()
onMounted(() => {
  $articleDetail.getArticle()
})
</script>


<template>
    <div v-if="$articleDetail.id">
      <h3>{{ $articleDetail.name }}</h3>
      <p>{{ $articleDetail.slug }}</p>
      <p>{{ $articleDetail.des }}</p>
      <p v-html="$articleDetail.content"></p>
    </div>
</template>