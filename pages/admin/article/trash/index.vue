<script setup>
definePageMeta({
  layout: "backend",
  middleware: ["auth"],
});

const { $articleStore } = useNuxtApp();
const { $useRestoreItem } = useNuxtApp();
const { $useDeleteItem } = useNuxtApp();
const { $useChangeAuthor } = useNuxtApp();
const { $userStore } = useNuxtApp();
const { $toast } = useNuxtApp();
const routePath = useRoute().path;

const title = ref("Danh sách thùng rác");
const buttonName = ref("Tất cả bài viết");
const buttonClass = ref("btn-success");
const url = ref("/admin/article");
const userID = $userStore.user.id;
const isAdmin = $userStore.user.role.split(",").includes("is_admin");
const moduleName = "article";
const showCatList = true;
const enableCheckbox = true

let list = ref([]);
let listFilterSearch = ref([]);
let listUser = ref([]);
let countList = ref(0);
let countPublic = ref(0);
let countDraft = ref(0);
let countMyItem = ref(0);
let countTrash = ref(0);

onMounted(async () => {
  await $articleStore.getList();
  await $articleStore.getListTrash();
  list.value = $articleStore.list;
  listFilterSearch.value = $articleStore.listTrash;
  listUser.value = useGetListUserRole($userStore.listUser)
  countList.value = useCountAllItem(list)
  countTrash.value = useCountTrashItem(list)
  countPublic.value = useCountPublicItem(list)
  countDraft.value = useCountDraftItem(list)
  countMyItem.value = useCountMyItem(list, $userStore)
});

let count = ref({
  countList: countList,
  countPublic: countPublic,
  countDraft: countDraft,
  countMyItem: countMyItem,
  countTrash: countTrash,
});

const useRestoreItem = async (id) => {
  await $useRestoreItem(id, $articleStore, $toast);
  await $articleStore.getListTrash();
  await $articleStore.getList();
  listFilterSearch.value = $articleStore.listTrash;
  list.value = $articleStore.list;
  countTrash.value = useCountTrashItem(list)
  countPublic.value = useCountPublicItem(list)
  countDraft.value = useCountDraftItem(list)
  countMyItem.value = useCountMyItem(list, $userStore)
};

const useDeleteItem = async (id) => {
  await $useDeleteItem(id, $articleStore, $toast);
  await $articleStore.getListTrash();
  await $articleStore.getList();
  listFilterSearch.value = $articleStore.listTrash;
  list.value = $articleStore.list;
  countTrash.value = JSON.parse(JSON.stringify(listTrash.value)).length;
  countList.value = JSON.parse(JSON.stringify(list.value)).length;
};

const useChangeAuthor = async (event, articleID, isDelete) => {
  if (isDelete !== null) {
    $toast.warning("Không thể chỉ định quyền cho bài viết trong thùng rác!");
    event.target.value = 0
    return;
  }
  $useChangeAuthor(event, articleID, $articleStore);
};

const useFilterPostByCategory = (data) => {
  if (data === "default") {
    listFilterSearch.value = $articleStore.listTrash;
  } else {
    listFilterSearch.value = $articleStore.listTrash.filter(
      (item) =>
        item.category_id === data
    );
  }
};

</script> 

<template>
  <PageContent
    :title="title"
    :buttonName="buttonName"
    :buttonClass="buttonClass"
    :url="url"
    :list="listFilterSearch"
    :listUser="listUser"
    :count="count"
    :useChangeAuthor="useChangeAuthor"
    :userID="userID"
    :routePath="routePath"
    :isAdmin="isAdmin"
    :showCatList="showCatList"
    :enableCheckbox="enableCheckbox"
    :moduleName="moduleName"
    @restore-item="useRestoreItem"
    @delete-item="useDeleteItem"
    @filter-post-by-category="useFilterPostByCategory"
  />
</template>