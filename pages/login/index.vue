<script setup>
definePageMeta({
  middleware: ['auth']
})
const router = useRouter()
const { $userStore } = useNuxtApp() 
const { $articleStore } = useNuxtApp() 
let email = ref(null)
let password = ref(null)

const login = async () => {
  try {
    await $userStore.getToken()
    await $userStore.login(email.value, password.value)
    await $userStore.getUser()
    router.push('/')
  } catch(error) {
    console.log(error);
  }
}

</script>

<template>
  <div class="container mt-3">
    <NuxtLink to="/">Home</NuxtLink>
    <div class="card mt-3">
      <div class="card-body">
        <form @submit.prevent="login">
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
            <label for="password" class="form-label">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Password..." />
          </div>
          <button type="submit" class="btn btn-success">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>
