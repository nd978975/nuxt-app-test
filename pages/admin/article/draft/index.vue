<script setup>
definePageMeta({
  layout: "backend",
  middleware: ["auth"],
});

const { $articleStore } = useNuxtApp();
const { $useMoveToTrash } = useNuxtApp();
const { $usePublicItem } = useNuxtApp();
const { $useChangeAuthor } = useNuxtApp();
const { $userStore } = useNuxtApp();
const { $toast } = useNuxtApp();
const routePath = useRoute().path;

const title = ref("Danh sách bài viết nháp");
const buttonName = ref("Tất cả bài viết");
const buttonClass = ref("btn-success");
const url = ref("/admin/article");
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
  list.value = $articleStore.list;
  listFilterSearch.value = list.value.filter(
    (item) => item.status === 0 && item.deleted_at === null
  );
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

const usePublicItem = async (id) => {
  await $usePublicItem(id, $articleStore, $toast);
  await $articleStore.getList();
  list.value = $articleStore.list;
  listFilterSearch.value = list.value.filter(
    (item) => item.status === 0 && item.deleted_at === null
  );
  countPublic.value = useCountPublicItem(list)
  countDraft.value = useCountDraftItem(list)
};

const useMoveToTrash = async (id) => {
  await $useMoveToTrash(id, $articleStore, $toast);
  await $articleStore.getList();
  list.value = $articleStore.list;
  listFilterSearch.value = list.value.filter(
    (item) => item.status === 0 && item.deleted_at === null
  );
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
  $useChangeAuthor(event, articleID, $articleStore);
};

const useFilterPostByCategory = (data) => {
  if (data === "default") {
    listFilterSearch.value = list.value.filter(
      (item) => item.status === 0 && item.deleted_at === null
    );
  } else {
    listFilterSearch.value = list.value.filter(
      (item) =>
        item.status === 0 &&
        item.deleted_at === null &&
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
    :moduleName="moduleName"
    :enableCheckbox="enableCheckbox"
    @move-to-trash="useMoveToTrash"
    @public-item="usePublicItem"
    @filter-post-by-category="useFilterPostByCategory"
  />
</template>