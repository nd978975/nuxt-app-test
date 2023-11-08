<script setup>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

defineProps({
  totalPage: Number,
  getListPagination: Function,
  updatePerPage: Function,
})

let page = ref(1);
let perPageUpdate = ref(10);

const emit = defineEmits([
  "update-per-page",
]);

const updatePerPage = () => {
  page.value = 1;
  emit("update-per-page", perPageUpdate.value);
};

</script>
<template>
  <div class="pagination mb-3">
    <div class="pagination-per-page">
      <span>View: </span>
      <select
        class="form-select form-select-sm width-20 ml-2 mr-2 inline-block"
        v-model="perPageUpdate"
        @change="updatePerPage"
      >
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