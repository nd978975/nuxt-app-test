<script setup>
import Editor from "@tinymce/tinymce-vue";
definePageMeta({
  layout: "backend",
  middleware: ["auth"],
});

const { $categoryStore } = useNuxtApp();
const { $userStore } = useNuxtApp();
const router = useRouter()

const name = ref("");
const slug = computed(() => useCreateSlug(name.value));
const description = ref("");

onMounted(async () => {
  await $userStore.getUser();
});

async function createCategory(status) {
  await $categoryStore.createCategory({
    name: name.value,
    slug: slug.value,
    description: description.value,
    user_id: $userStore.user.id,
    user_name: $userStore.user.name,
    status: status,
    title_seo: name.value,
    description_seo: description.value
  });
  router.push("/admin/category")
}
</script>

<template>
  <ClientOnly>
    <div class="card shadow">
      <div class="card-body">
        <form>
          <div class="form-group">
            <input type="text" class="form-control" v-model="name" />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon3"
              >https://myblog.com/post/</span
            >
            <input
              type="text"
              class="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
              v-model="slug"
            />
          </div>
          <editor v-model="description" :init="useInitEditorTinyMCE(300)" />
          <button @click.prevent="createCategory(0)" class="btn btn-primary mt-2 mr-2" type="submit">Lưu nháp</button>
          <button @click.prevent="createCategory(1)" class="btn btn-success mt-2 mr-2" type="submit">Đăng ngay</button>
          <NuxtLink to="/admin/category" class="btn btn-danger mt-2 mr-2">
            Quay lại
          </NuxtLink>
        </form>
      </div>
    </div>
  </ClientOnly>
</template>
