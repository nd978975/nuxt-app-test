<script setup>

definePageMeta({
    layout: "backend",
    middleware: ['auth']
})

const { $useMoveToTrash } = useNuxtApp();
const { $usePublicItem } = useNuxtApp();
const { $useMoveToDraft } = useNuxtApp();
const { $userStore } = useNuxtApp();
const { $toast } = useNuxtApp();

///page config
const title = "Trang quản lý users"
const buttonName = 'Thêm user'
const buttonClass = 'btn-success'
const url = 'user/create'
const moduleName = 'user'

let listFilterSearch = ref([])
let list = ref([])

let countList = ref(0);
let countPublic = ref(0);
let countDraft = ref(0);
let countMyItem = ref(0);
let countTrash = ref(0);

let count = ref({
  countList: countList,
  countPublic: countPublic,
  countDraft: countDraft,
  countMyItem: countMyItem,
  countTrash: countTrash,
});

onMounted(async () => {
  await $userStore.getListUser();
  list.value = $userStore.listUser;
  listFilterSearch.value = list.value;
  countList.value = JSON.parse(JSON.stringify(list.value)).length;
//   countPublic.value = JSON.parse(JSON.stringify(list.value)).filter(
//     (item) => item.status === 1 && item.deleted_at === null
//   ).length;
//   countDraft.value = JSON.parse(JSON.stringify(list.value)).filter(
//     (item) => item.status === 0 && item.deleted_at === null
//   ).length;
//   countMyItem.value = JSON.parse(JSON.stringify(list.value)).filter(
//     (item) => item.user_id === $userStore.user.id && item.deleted_at === null
//   ).length;
//   countTrash.value = JSON.parse(JSON.stringify(list.value)).filter(
//     (item) => item.deleted_at !== null
//   ).length;
});

const useGetSearchValue = (event) => {
  if (event.target.value === "") {
    listFilterSearch.value = list.value;
  }
  listFilterSearch.value = list.value.filter((item) => {
    return item.name.toUpperCase().includes(event.target.value.toUpperCase());
  });
};

const usePublicItem = async (id) => {
  await $usePublicItem(id, $articleStore, $toast);
  await $articleStore.getList();
  list.value = $articleStore.list;
  listFilterSearch.value = list.value;
  countPublic.value = JSON.parse(JSON.stringify(list.value)).filter(
    (item) => item.status === 1 && item.deleted_at === null
  ).length;
  countDraft.value = JSON.parse(JSON.stringify(list.value)).filter(
    (item) => item.status === 0 && item.deleted_at === null
  ).length;
};

const useMoveToDraft = async (id) => {
  await $useMoveToDraft(id, $articleStore, $toast);
  await $articleStore.getList();
  list.value = $articleStore.list;
  listFilterSearch.value = list.value;
  countPublic.value = JSON.parse(JSON.stringify(list.value)).filter(
    (item) => item.status === 1 && item.deleted_at === null
  ).length;
  countDraft.value = JSON.parse(JSON.stringify(list.value)).filter(
    (item) => item.status === 0 && item.deleted_at === null
  ).length;
};

const useMoveToTrash = async (id) => {
  await $useMoveToTrash(id, $articleStore, $toast);
  await $articleStore.getList();
  list.value = $articleStore.list;
  listFilterSearch.value = list.value;
  countTrash.value = JSON.parse(JSON.stringify(list.value)).filter(
    (item) => item.deleted_at !== null
  ).length;
  countPublic.value = JSON.parse(JSON.stringify(list.value)).filter(
    (item) => item.status === 1 && item.deleted_at === null
  ).length;
  countDraft.value = JSON.parse(JSON.stringify(list.value)).filter(
    (item) => item.status === 0 && item.deleted_at === null
  ).length;
  countMyItem.value = JSON.parse(JSON.stringify(list.value)).filter(
    (item) => item.user_id === $userStore.user.id && item.deleted_at === null
  ).length;
};
</script>

<template>
    <TableComp
    :title="title"
    :buttonName="buttonName"
    :buttonClass="buttonClass"
    :url="url"
    :moduleName="moduleName"
    :list="listFilterSearch"
    :count="count"
    :useGetSearchValue="useGetSearchValue"
    @move-to-draft="useMoveToDraft"
    @move-to-trash="useMoveToTrash"
    @public-item="usePublicItem"
  />
</template>
