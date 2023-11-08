export default defineNuxtRouteMiddleware((to, from) => {
  const { $userStore } = useNuxtApp()
  if (!$userStore.isLogin) {
    if(to.fullPath !== "/login" && to.fullPath !== "/sigup") {
      return navigateTo("/login")
    }
  }else if ($userStore.isLogin) {
    if (to.path == "/login" || to.path == "/sigup") {
      // return abortNavigation()
      return navigateTo("/admin")
    }
  }
})
