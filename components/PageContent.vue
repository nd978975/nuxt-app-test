<script setup>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

const props = defineProps({
  moduleName: String,
  list: Array,
  listUser: Array,
  userID: Number,
  totalPage: Number,
  getListPagination: Function,
  updatePerPage: Function,
  routePath: String,
  isAdmin: Boolean,
  showCatList: Boolean,
  enableCheckbox: Boolean,
  useChangeAuthor: Function,
  useGetSearchValue: Function,
});

const selected = ref([]);
const select_all = ref(false);
const keyword = ref("");

let page = ref(1);
let perPageUpdate = ref(5);

const { $categoryStore } = useNuxtApp();
let listCat = ref([]);

const actionName = ref("default");
const catFilter = ref("default");

const emit = defineEmits([
  "move-to-draft",
  "move-to-trash",
  "public-item",
  "restore-item",
  "delete-item",
  "get-selected",
  "filter-post-by-category",
  "update-per-page",
  "get-search-value",
  "update-per-page",
]);

const select = () => {
  selected.value = [];
  if (!select_all.value) {
    for (let i in props.list) {
      selected.value.push(props.list[i].id);
    }
  }
};

watch(selected, () => {
  if (selected.value.length == props.list.length) {
    select_all.value = true;
  } else {
    select_all.value = false;
  }
});

const usePublicItem = (data) => {
  emit("public-item", data);
  page.value = 1;
  select_all.value = false;
  selected.value = [];
};

const useMoveToDraft = (data) => {
  emit("move-to-draft", data);
  page.value = 1;
  select_all.value = false;
  selected.value = [];
};

const useMoveToTrash = (data) => {
  emit("move-to-trash", data);
  page.value = 1;
  select_all.value = false;
  selected.value = [];
};

const useRestoreItem = (data) => {
  emit("restore-item", data);
  page.value = 1;
  select_all.value = false;
  selected.value = [];
};

const useDeleteItem = (data) => {
  emit("delete-item", data);
  select_all.value = false;
  selected.value = [];
  page.value = 1;
};

const getCatFilter = async () => {
  emit("filter-post-by-category", catFilter.value);
};

const useGetSearchValue = () => {
  emit("get-search-value", keyword.value);
  page.value = 1;
};

const actionList = [
  { name: "Chuyển item vào thư mục nháp", value: "move-to-draft" },
  { name: "Chuyển item vào thư mục thùng rác", value: "move-to-trash" },
  { name: "Chuyển item sang chế độ công khai", value: "public-item" },
  { name: "Khôi phục item", value: "restore-item" },
];

const getActionName = () => {
  switch (actionName.value) {
    case "move-to-draft":
      if (selected.value.length < 1) {
        alert("Vui lòng chọn item");
        actionName.value = "default";
        return;
      } else {
        emit("move-to-draft", selected.value);
        page.value = 1;
        selected.value = [];
        select_all.value = false;
        actionName.value = "default";
      }
      break;
    case "move-to-trash":
      if (selected.value.length < 1) {
        alert("Vui lòng chọn item");
        actionName.value = "default";
        return;
      } else {
        emit("move-to-trash", selected.value);
        page.value = 1;
        selected.value = [];
        select_all.value = false;
        actionName.value = "default";
      }
      break;
    case "public-item":
      if (selected.value.length < 1) {
        alert("Vui lòng chọn item");
        actionName.value = "default";
        return;
      } else {
        emit("public-item", selected.value);
        page.value = 1;
        selected.value = [];
        select_all.value = false;
        actionName.value = "default";
      }
      break;
    case "restore-item":
      if (selected.value.length < 1) {
        alert("Vui lòng chọn item");
        actionName.value = "default";
        return;
      } else {
        emit("restore-item", selected.value);
        page.value = 1;
        selected.value = [];
        select_all.value = false;
        actionName.value = "default";
      }
      break;
    default:
      alert("Vui lòng chọn hành động!");
  }
};

const updatePerPage = () => {
  emit("update-per-page", perPageUpdate.value);
  page.value = 1;
};
</script>

<template>
  <div class="page-filter mt-3">
    <select
      class="form-select width-20 mb-3 mr-2 inline-block"
      v-model="actionName"
      @change="getActionName"
    >
      <option value="default">Chọn hành động</option>
      <option
        v-for="(item, index) in actionList"
        :key="index"
        :value="item.value"
      >
        {{ item.name }}
      </option>
    </select>
    <select
      v-if="showCatList"
      class="form-select width-20 mb-3 mr-2 inline-block"
      v-model="catFilter"
      @change="getCatFilter"
    >
      <option value="default">Chọn danh mục</option>
      <option v-for="(item, index) in listCat" :key="index" :value="item.id">
        {{ item.name }}
      </option>
    </select>
    <form
      class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search"
    >
      <div class="input-group">
        <input
          v-model="keyword"
          type="text"
          class="form-control bg-light border-0 small"
          placeholder="Search for..."
          aria-label="Search"
          aria-describedby="basic-addon2"
          @input="useGetSearchValue"
        />
        <div class="input-group-append">
          <button class="btn btn-primary" type="button">
            <i class="fas fa-search fa-sm"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
  <div class="table-responsive">
    <table class="table table-bordered" width="100%" cellspacing="0">
      <thead>
        <tr>
          <th class="td-width-5">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="checlAll"
                v-model="select_all"
                @click="select"
              />
              <label class="form-check-label" for="checlAll"> All </label>
            </div>
          </th>
          <th class="text-center td-width-30">Title</th>
          <th class="text-center">Tạo bởi</th>
          <th class="text-center">Danh mục</th>
          <th class="text-center">Thời gian</th>
          <th v-if="isAdmin" class="text-center td-width-15">Chỉ định</th>
          <th class="text-center td-width-20">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td class="vertical-align-middle">
            <div class="form-check">
              <input
                class="form-check-input"
                :disabled="
                  (item.user_id !== userID &&
                    isAdmin === false &&
                    item.user_role_edit_id !== userID) ||
                  (item.deleted_at !== null && enableCheckbox === false)
                "
                type="checkbox"
                v-model="selected"
                :value="item.id"
                :id="item.id"
                @input="emit('get-selected', selected)"
              />
              <label class="form-check-label" :for="item.id">
                {{ item.id }}
              </label>
            </div>
          </td>
          <td class="vertical-align-middle">
            {{ item.name }}<br />
            <NuxtLink
              v-if="item.status === 1 && item.deleted_at === null"
              :to="`/admin/${moduleName}/public`"
              style="color: #009245; font-size: 14px"
              >Đã đăng</NuxtLink
            >
            <NuxtLink
              v-else-if="item.status === 0 && item.deleted_at === null"
              :to="`/admin/${moduleName}/draft`"
              style="color: #fbb03b; font-size: 14px"
              >Lưu nháp</NuxtLink
            >
            <NuxtLink
              v-else-if="item.deleted_at !== null"
              :to="`/admin/${moduleName}/trash`"
              style="color: red; font-size: 14px"
              >Thùng rác</NuxtLink
            >
          </td>
          <td class="text-center vertical-align-middle">
            <p>
              {{ item.user_name }}
            </p>
          </td>
          <td class="text-center vertical-align-middle">
            <p>
              {{ item.category_name }}
            </p>
          </td>
          <td class="text-center vertical-align-middle">
            Được cập nhật lúc
            {{ new Date(item.updated_at).toLocaleString() }}
          </td>
          <td v-if="isAdmin" class="vertical-align-middle">
            <select
              class="form-control"
              @change="useChangeAuthor($event, item.id, item.deleted_at)"
            >
              <option value="0">Chọn user</option>
              <option
                v-for="(user, index) in listUser"
                :key="index"
                :value="user.id"
                :selected="item.user_role_edit_id === user.id ? true : false"
              >
                {{ user.name }}
              </option>
            </select>
          </td>
          <td class="text-center vertical-align-middle">
            <BtnEdit
              :item="item"
              :userID="userID"
              :isAdmin="isAdmin"
              :moduleName="moduleName"
            />
            <BtnPublicItem
              :item="item"
              :userID="userID"
              :isAdmin="isAdmin"
              @public-item="usePublicItem"
            />
            <BtnMoveToDraft
              :item="item"
              :userID="userID"
              :isAdmin="isAdmin"
              @move-to-draft="useMoveToDraft"
            />
            <BtnMoveToTrash
              :item="item"
              :userID="userID"
              :isAdmin="isAdmin"
              @move-to-trash="useMoveToTrash"
            />
            <BtnRestore
              v-if="routePath === `/admin/${moduleName}/trash`"
              :item="item"
              :userID="userID"
              :isAdmin="isAdmin"
              @restore-item="useRestoreItem"
            />
            <BtnDelete
              v-if="routePath === `/admin/${moduleName}/trash`"
              :item="item"
              :userID="userID"
              :isAdmin="isAdmin"
              @delete-item="useDeleteItem"
            />
            <BtnPreview :item="item" :moduleName="moduleName" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="pagination mb-3">
    <div class="pagination-per-page">
      <span>View: </span>
      <select
        class="form-select form-select-sm width-20 ml-2 mr-2 inline-block"
        v-model="perPageUpdate"
        @change="updatePerPage"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <span>item per page</span>
    </div>
    <div class="pagination-navigation">
      <v-pagination
        v-model="page"
        :pages="totalPage"
        :range-size="1"
        active-color="#DCEDFF"
        @update:modelValue="getListPagination(page)"
      />
    </div>
  </div>
</template>
