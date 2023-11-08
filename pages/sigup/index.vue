<script setup>
definePageMeta({
  middleware: ["auth"],
});

const { $userStore } = useNuxtApp();
const router = useRouter();

let name = ref("");
let email = ref("");
let role = ref([]);
let password = ref("");
let password_confirmation = ref("");

const sigup = async () => {
  try {
    await $userStore.getToken();
    await $userStore.sigup({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
      role: role.value.toString()
    });
    await $userStore.getUser();
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="container mt-3">
    <NuxtLink to="/">Home</NuxtLink>
    <div class="card mt-3">
      <div class="card-body">
        <form @submit.prevent="sigup">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              v-model="name"
              type="text"
              class="form-control"
              id="name"
              placeholder="name..." />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="email"
              placeholder="name@example.com..." />
          </div>
          <div class="mb-3">
            <div>Role: {{ role }}</div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value="is_admin"
                id="is_admin" 
                v-model="role"
              />
              <label class="form-check-label" for="is_admin"> Admin </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value="is_content"
                id="is_content" 
                v-model="role"
              />
              <label class="form-check-label" for="is_content"> Content </label>
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Password..." />
          </div>
          <div class="mb-3">
            <label for="password_confirmation" class="form-label"
              >Password Confirmation</label
            >
            <input
              v-model="password_confirmation"
              type="password"
              class="form-control"
              id="password_confirmation"
              placeholder="Password Confirmation..." />
          </div>
          <button type="submit" class="btn btn-success">Sigup</button>
        </form>
      </div>
    </div>
  </div>
</template>
