<script setup>
const { $userStore } = useNuxtApp();

let roles = ref([]);
let arrayRole = ["is_admin", "is_content", "is_mod"];


onMounted(async () => {
  await $userStore.getUser();
  roles.value = $userStore.user.role.split(",");
});

async function changeRole(id) {
  let roleUser = ""
  if((roles.value).toString() === '') {
    roleUser = 'is_content'
  }else {
    roleUser = (roles.value).toString()
  }
  await $userStore.changeRole({
      role: roleUser,
      id: id
    });
}

definePageMeta({
  layout: "backend",
  middleware: ["auth"],
});
</script>

<template>
  <h5>User Name: {{ $userStore.user ? $userStore.user.name : "Null" }}</h5>
  <h5>User Email: {{ $userStore.user ? $userStore.user.email : "Null" }}</h5>
  <h5>User Role:</h5>
  <div>
    <div class="form-check" v-for="(role, index) in arrayRole" :key="index">
      <input
        class="form-check-input"
        type="checkbox"
        :value="role"
        :id="role"
        :checked="roles.includes(role)"
        @change="changeRole($userStore.user.id)"
        v-model="roles"
      />
      <label class="form-check-label" :for="role">
        {{
          role.split("_")[1].charAt(0).toUpperCase() +
          role.split("_")[1].slice(1)
        }}
      </label>
    </div>
  </div>
</template>