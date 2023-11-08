<template>
  <ClientOnly>
    <div id="ckeditor">
      <ckeditor
        :editor="editor"
        v-model="editorData"
        :config="editorConfig"
      ></ckeditor>
    </div>
  </ClientOnly>
</template>

<script setup>
import { createApp } from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue";
createApp().use(CKEditor).mount("#ckeditor");
</script>