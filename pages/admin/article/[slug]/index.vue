<script setup>
const { articleStore } = useNuxtApp()
const route = useRoute()
await articleStore.getArticle({slug: route.params.slug})

definePageMeta({
    layout: "backend",
    middleware: ['auth']
})
</script>

<template>
    <h1>Trang chi tiet bai viet</h1>
    <ClientOnly>
        <h3 v-if="articleStore.article">{{ articleStore.article.title }}</h3>
    </ClientOnly>
</template>