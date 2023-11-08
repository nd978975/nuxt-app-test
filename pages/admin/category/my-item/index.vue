<script setup>
definePageMeta({
  layout: "backend",
  middleware: ["auth"],
});

const { $categoryStore } = useNuxtApp();
const { $useMoveToTrash } = useNuxtApp();
const { $usePublicItem } = useNuxtApp();
const { $useMoveToDraft } = useNuxtApp();
const { $useChangeAuthor } = useNuxtApp();
const { $userStore } = useNuxtApp();
const { $toast } = useNuxtApp();

const routePath = useRoute().path;

const title = "Danh sách nháp";
const buttonName = "Danh sách danh mục";
const buttonClass = "btn-success";
const url = "/admin/category";

const userID = $userStore.user.id;
const isAdmin = $userStore.user.role.split(",").includes("is_admin");
const moduleName = "category";
const enableCheckbox = false;

// varibale pagination
let currentPage = ref(1);
let itemPerPage = ref(10);
let totalPage = ref(null);

let listAll = ref([]);
let listPublicItem = ref([]);
let listDraft = ref([]);
let listTrash = ref([]);
let listMyItem = ref([]);
let listPagination = ref([]);
let listTemp = ref([]);
let listSearch = ref([]);
let listItem = ref([]);
let listUser = ref([]);

let countList = ref(0);
let countPublic = ref(0);
let countDraft = ref(0);
let countTrash = ref(0);
let countMyItem = ref(0);

onMounted(async () => {
  await $categoryStore.getList();
  await $userStore.getListUser();

  listAll.value = $categoryStore.list;
  listMyItem.value = listAll.value.filter((item) => item.user_id == userID);
  listUser.value = useGetListUserRole($userStore.listUser);

  listPagination.value = listMyItem.value.slice(
    (currentPage.value - 1) * itemPerPage.value,
    (currentPage.value - 1) * itemPerPage.value + itemPerPage.value
  );
  totalPage.value = Math.ceil(useCountAllItem(listMyItem) / itemPerPage.value);
  listItem.value = listPagination.value;

  countList.value = useCountAllItem(listAll);
  countPublic.value = useCountPublicItem(listAll);
  countDraft.value = useCountDraftItem(listAll);
  countMyItem.value = useCountMyItem(listAll, $userStore);
  countTrash.value = useCountTrashItem(listAll);
});

let count = ref({
  countList: countList,
  countPublic: countPublic,
  countDraft: countDraft,
  countMyItem: countMyItem,
  countTrash: countTrash,
});

const getListPagination = (page) => {
  currentPage.value = page;
  if (useCountAllItem(listSearch) > 0) {
    listPagination.value = listSearch.value.slice(
      (currentPage.value - 1) * itemPerPage.value,
      (currentPage.value - 1) * itemPerPage.value + itemPerPage.value
    );
    totalPage.value = Math.ceil(
      useCountAllItem(listSearch) / itemPerPage.value
    );
  } else {
    if (useCountAllItem(listPublicItem) > 0) {
      listTemp.value = listPublicItem.value;
    } else if (useCountAllItem(listDraft) > 0) {
      listTemp.value = listDraft.value;
    } else if (useCountAllItem(listTrash) > 0) {
      listTemp.value = listTrash.value;
    } else if (useCountAllItem(listMyItem) > 0) {
      listTemp.value = listMyItem.value;
    } else {
      listTemp.value = listAll.value;
    }

    listPagination.value = listTemp.value.slice(
      (currentPage.value - 1) * itemPerPage.value,
      (currentPage.value - 1) * itemPerPage.value + itemPerPage.value
    );
    totalPage.value = Math.ceil(useCountAllItem(listTemp) / itemPerPage.value);
  }
  listItem.value = listPagination.value;
};

const updatePerPage = (perPageUpdate) => {
  currentPage.value = 1;
  itemPerPage.value = Number(perPageUpdate);
  if (useCountAllItem(listSearch) > 0) {
    listPagination.value = listSearch.value.slice(
      (currentPage.value - 1) * itemPerPage.value,
      (currentPage.value - 1) * itemPerPage.value + itemPerPage.value
    );
    totalPage.value = Math.ceil(
      useCountAllItem(listSearch) / itemPerPage.value
    );
  } else {
    if (useCountAllItem(listPublicItem) > 0) {
      listTemp.value = listPublicItem.value;
    } else if (useCountAllItem(listDraft) > 0) {
      listTemp.value = listDraft.value;
    } else if (useCountAllItem(listTrash) > 0) {
      listTemp.value = listTrash.value;
    } else if (useCountAllItem(listMyItem) > 0) {
      listTemp.value = listMyItem.value;
    } else {
      listTemp.value = listAll.value;
    }

    listPagination.value = listTemp.value.slice(
      (currentPage.value - 1) * itemPerPage.value,
      (currentPage.value - 1) * itemPerPage.value + itemPerPage.value
    );
    totalPage.value = Math.ceil(useCountAllItem(listTemp) / itemPerPage.value);
  }
  listItem.value = listPagination.value;
};

const useGetSearchValue = (keyword) => {
  if (keyword == "") {
    currentPage.value = 1;
    listSearch.value = [];

    if (useCountAllItem(listPublicItem) > 0) {
      listTemp.value = listPublicItem.value;
    } else if (useCountAllItem(listDraft) > 0) {
      listTemp.value = listDraft.value;
    } else if (useCountAllItem(listTrash) > 0) {
      listTemp.value = listTrash.value;
    } else if (useCountAllItem(listMyItem) > 0) {
      listTemp.value = listMyItem.value;
    } else {
      listTemp.value = listAll.value;
    }

    listPagination.value = listTemp.value.slice(
      (currentPage.value - 1) * itemPerPage.value,
      (currentPage.value - 1) * itemPerPage.value + itemPerPage.value
    );
    totalPage.value = Math.ceil(useCountAllItem(listTemp) / itemPerPage.value);

    listItem.value = listPagination.value;
  } else {
    currentPage.value = 1;

    if (useCountAllItem(listPublicItem) > 0) {
      listTemp.value = listPublicItem.value;
    } else if (useCountAllItem(listDraft) > 0) {
      listTemp.value = listDraft.value;
    } else if (useCountAllItem(listTrash) > 0) {
      listTemp.value = listTrash.value;
    } else if (useCountAllItem(listMyItem) > 0) {
      listTemp.value = listMyItem.value;
    } else {
      listTemp.value = listAll.value;
    }

    listSearch.value = listTemp.value.filter((item) => {
      return item.name.toUpperCase().includes(keyword.toUpperCase());
    });
    listPagination.value = listSearch.value.slice(
      (currentPage.value - 1) * itemPerPage.value,
      (currentPage.value - 1) * itemPerPage.value + itemPerPage.value
    );
    totalPage.value = Math.ceil(
      useCountAllItem(listSearch) / itemPerPage.value
    );

    listItem.value = listPagination.value;
  }
};

const usePublicItem = async (id) => {
  $usePublicItem(id, $categoryStore, $toast);

  await $categoryStore.getList();
  listAll.value = $categoryStore.list;
  listMyItem.value = listAll.value.filter((item) => item.user_id == userID);

  currentPage.value = 1;

  listPagination.value = listMyItem.value.slice(
    (currentPage.value - 1) * itemPerPage.value,
    (currentPage.value - 1) * itemPerPage.value + itemPerPage.value
  );

  totalPage.value = Math.ceil(useCountAllItem(listMyItem) / itemPerPage.value);

  listItem.value = listPagination.value;

  countPublic.value = useCountPublicItem(listAll);
  countDraft.value = useCountDraftItem(listAll);
};

const useMoveToDraft = async (id) => {
  await $useMoveToDraft(id, $categoryStore, $toast);

  await $categoryStore.getList();
  listAll.value = $categoryStore.list;
  listMyItem.value = listAll.value.filter((item) => item.user_id == userID);

  currentPage.value = 1;

  listPagination.value = listMyItem.value.slice(
    (currentPage.value - 1) * itemPerPage.value,
    (currentPage.value - 1) * itemPerPage.value + itemPerPage.value
  );

  totalPage.value = Math.ceil(useCountAllItem(listMyItem) / itemPerPage.value);

  listItem.value = listPagination.value;

  countPublic.value = useCountPublicItem(listAll);
  countDraft.value = useCountDraftItem(listAll);
};

const useMoveToTrash = async (id) => {
  await $useMoveToTrash(id, $categoryStore, $toast);

  await $categoryStore.getList();
  listAll.value = $categoryStore.list;
  listMyItem.value = listAll.value.filter((item) => item.user_id == userID);

  currentPage.value = 1;

  listPagination.value = listMyItem.value.slice(
    (currentPage.value - 1) * itemPerPage.value,
    (currentPage.value - 1) * itemPerPage.value + itemPerPage.value
  );

  totalPage.value = Math.ceil(useCountAllItem(listMyItem) / itemPerPage.value);

  listItem.value = listPagination.value;

  countTrash.value = useCountTrashItem(listAll);
  countPublic.value = useCountPublicItem(listAll);
  countDraft.value = useCountDraftItem(listAll);
};

const useChangeAuthor = async (event, categoryID, isDelete) => {
  $useChangeAuthor(event, categoryID, isDelete, $categoryStore, $toast);
};
</script>

<template>
  <div class="card shadow mb-4">
    <div class="card-header py-3" style="background-color: white">
      <PageHeader
        :title="title"
        :url="url"
        :buttonClass="buttonClass"
        :buttonName="buttonName"
      />
    </div>
    <div class="card-body">
      <NavigationAdminTable :count="count" :moduleName="moduleName" />
      <PageContent
        :moduleName="moduleName"
        :list="listItem"
        :listUser="listUser"
        :userID="userID"
        :totalPage="totalPage"
        :routePath="routePath"
        :isAdmin="isAdmin"
        :useChangeAuthor="useChangeAuthor"
        :enableCheckbox="enableCheckbox"
        :getListPagination="getListPagination"
        @move-to-draft="useMoveToDraft"
        @move-to-trash="useMoveToTrash"
        @public-item="usePublicItem"
        @get-search-value="useGetSearchValue"
        @update-per-page="updatePerPage"
      />
    </div>
  </div>
</template>
