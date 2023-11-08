<script setup>
import Editor from "@tinymce/tinymce-vue";

definePageMeta({
  layout: "backend",
  middleware: ["auth"],
});

const name = ref("");
const slug = computed(() => useCreateSlug(name.value));
const des = ref("");
const content = ref("");
const category_id = ref(0);
const category_name = ref("");

const { $articleStore } = useNuxtApp();
const { $categoryStore } = useNuxtApp();
const { $userStore } = useNuxtApp();

onMounted(async () => {
  await $userStore.getUser();
  await $categoryStore.getList()
});

const router = useRouter();

const selectBoxValueAndName = (event) => {
  const id = event.target.value;
  const name = event.target.options[event.target.options.selectedIndex].text;
  category_id.value = id
  category_name.value = name
};

async function createArticle(status) {
  await $articleStore.createArticle({
    name: name.value,
    slug: slug.value,
    content: content.value,
    des: des.value,
    user_id: $userStore.user.id,
    user_name: $userStore.user.name,
    status: status,
    category_id: category_id.value,
    category_name: category_name.value
  });
  router.push("/admin/article");
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
          <div class="form-group">
            <select
              class="form-control"
              @change="selectBoxValueAndName($event)"
            >
              <option value="0">Chọn danh mục</option>
              <option v-for="item in $categoryStore.list" :key="item.id" :value="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <textarea
              cols="30"
              rows="5"
              class="form-control"
              v-model="des"
            ></textarea>
          </div>
          <editor v-model="content" :init="useInitEditorTinyMCE()" />
          <button
            @click.prevent="createArticle(0)"
            class="btn btn-primary mt-2 mr-2"
            type="submit"
          >
            Lưu nháp
          </button>
          <button
            @click.prevent="createArticle(1)"
            class="btn btn-success mt-2 mr-2"
            type="submit"
          >
            Đăng ngay
          </button>
          <NuxtLink to="/admin/article" class="btn btn-danger mt-2 mr-2">
            Quay lại
          </NuxtLink>
        </form>
      </div>
    </div>
  </ClientOnly>
</template>
