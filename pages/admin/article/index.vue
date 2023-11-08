<script setup>
definePageMeta({
  layout: "backend",
  middleware: ["auth"],
});

const { $articleStore } = useNuxtApp();
const { $useMoveToTrash } = useNuxtApp();
const { $usePublicItem } = useNuxtApp();
const { $useMoveToDraft } = useNuxtApp();
const { $useChangeAuthor } = useNuxtApp();
const { $userStore } = useNuxtApp();
const { $toast } = useNuxtApp();
const routePath = useRoute().path;

const title = ref("Danh sách bài viết");
const buttonName = ref("Thêm bài viết");
const buttonClass = ref("btn-success");
const url = ref("/admin/article/create");
const userID = $userStore.user.id;
const isAdmin = $userStore.user.role.split(",").includes("is_admin");
const moduleName = "article";
const showCatList = true;
const enableCheckbox = false;

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
  await $userStore.getListUser();
  list.value = $articleStore.list;
  listFilterSearch.value = list.value;
  listUser.value = useGetListUserRole($userStore.listUser)
  countList.value = useCountAllItem(list)
  countPublic.value = useCountPublicItem(list)
  countDraft.value = useCountDraftItem(list)
  countMyItem.value = useCountMyItem(list, $userStore)
  countTrash.value = useCountTrashItem(list)
});

let count = ref({
  countList: countList,
  countPublic: countPublic,
  countDraft: countDraft,
  countMyItem: countMyItem,
  countTrash: countTrash,
});

const usePublicItem = async (id) => {
  await $usePublicItem(id, $articleStore, $toast);
  await $articleStore.getList();
  list.value = $articleStore.list;
  listFilterSearch.value = list.value;
  countPublic.value = useCountPublicItem(list)
  countDraft.value = useCountDraftItem(list)
};

const useMoveToDraft = async (id) => {
  await $useMoveToDraft(id, $articleStore, $toast);
  await $articleStore.getList();
  list.value = $articleStore.list;
  listFilterSearch.value = list.value;
  countPublic.value = useCountPublicItem(list)
  countDraft.value = useCountDraftItem(list)
};

const useMoveToTrash = async (id) => {
  await $useMoveToTrash(id, $articleStore, $toast);
  await $articleStore.getList();
  list.value = $articleStore.list;
  listFilterSearch.value = list.value;
  countTrash.value = useCountTrashItem(list)
  countPublic.value = useCountPublicItem(list)
  countDraft.value = useCountDraftItem(list)
  countMyItem.value = useCountMyItem(list, $userStore)
};

const useChangeAuthor = async (event, articleID, isDelete) => {
  if (isDelete !== null) {
    $toast.warning("Không thể chỉ định quyền cho bài viết trong thùng rác!");
    return;
  }
  $useChangeAuthor(event, articleID, $articleStore, $toast);
};

const useGetSearchValue = (event) => {
  if (event.target.value === "") {
    listFilterSearch.value = list.value;
  }
  listFilterSearch.value = list.value.filter((item) => {
    return item.name.toUpperCase().includes(event.target.value.toUpperCase());
  });
};

const useFilterPostByCategory = (data) => {
  if (data === "default") {
    listFilterSearch.value = list.value;
  } else {
    listFilterSearch.value = list.value.filter(
      (item) => item.category_id === data
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
    :moduleName="moduleName"
    :list="listFilterSearch"
    :listUser="listUser"
    :count="count"
    :userID="userID"
    :routePath="routePath"
    :isAdmin="isAdmin"
    :showCatList="showCatList"
    :enableCheckbox="enableCheckbox"
    :useChangeAuthor="useChangeAuthor"
    :useGetSearchValue="useGetSearchValue"
    @move-to-draft="useMoveToDraft"
    @move-to-trash="useMoveToTrash"
    @public-item="usePublicItem"
    @filter-post-by-category="useFilterPostByCategory"
  />
</template>
