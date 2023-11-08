<script setup>
const { $userStore } = useNuxtApp()
const router = useRouter()

function logout () {
  $userStore.logout()
  router.push("/")
}
</script>

<template>
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar">
    <!-- Sidebar - Brand -->
    <NuxtLink
      class="sidebar-brand d-flex align-items-center justify-content-center"
      to="/">
      <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-laugh-wink"></i>
      </div>
      <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
    </NuxtLink>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
      <NuxtLink class="nav-link" to="/admin">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span></NuxtLink
      >
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">Interface</div>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseTwo"
        aria-expanded="true"
        aria-controls="collapseTwo">
        <i class="fas fa-fw fa-cog"></i>
        <span>Quản lý bài viết</span>
      </a>
      <div
        id="collapseTwo"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Article Components:</h6>
          <NuxtLink class="collapse-item" to="/admin/article"
            >Danh sách</NuxtLink
          >
          <NuxtLink class="collapse-item" to="/admin/article/create"
            >Thêm</NuxtLink
          >
        </div>
      </div>
    </li>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseCategory"
        aria-expanded="true"
        aria-controls="collapseCategory">
        <i class="fas fa-fw fa-cog"></i>
        <span>Quản lý danh mục</span>
      </a>
      <div
        id="collapseCategory"
        class="collapse"
        aria-labelledby="headingCategory"
        data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Category Components:</h6>
          <NuxtLink class="collapse-item" to="/admin/category"
            >Danh sách</NuxtLink
          >
          <NuxtLink class="collapse-item" to="/admin/category/create"
            >Thêm</NuxtLink
          >
        </div>
      </div>
    </li>

    <!-- Nav Item - Utilities Collapse Menu -->
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseUtilities"
        aria-expanded="true"
        aria-controls="collapseUtilities">
        <i class="fas fa-fw fa-wrench"></i>
        <span>User</span>
      </a>
      <div
        id="collapseUtilities"
        class="collapse"
        aria-labelledby="headingUtilities"
        data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">User Components:</h6>
          <NuxtLink class="collapse-item" href="/admin/user/profile">Thông tin</NuxtLink>
          <NuxtLink class="collapse-item" href="/admin/user">Danh sách</NuxtLink>
        </div>
      </div>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">Addons</div>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapsePages"
        aria-expanded="true"
        aria-controls="collapsePages">
        <i class="fas fa-fw fa-folder"></i>
        <span>Pages</span>
      </a>
      <div
        id="collapsePages"
        class="collapse"
        aria-labelledby="headingPages"
        data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Login Screens:</h6>
          <NuxtLink class="collapse-item" to="/login">Login</NuxtLink>
          <NuxtLink class="collapse-item" to="/sigup">Register</NuxtLink>
          <a class="collapse-item" href="forgot-password.html"
            >Forgot Password</a
          >
          <div class="collapse-divider"></div>
          <h6 class="collapse-header">Other Pages:</h6>
          <a class="collapse-item" href="404.html">404 Page</a>
          <a class="collapse-item" href="blank.html">Blank Page</a>
        </div>
      </div>
    </li>

    <!-- Nav Item - Charts -->
    <li class="nav-item">
      <a class="nav-link" href="charts.html">
        <i class="fas fa-fw fa-chart-area"></i>
        <span>Charts</span></a
      >
    </li>

    <!-- Nav Item - Tables -->
    <li class="nav-item">
      <a 
        class="nav-link" href=""
        @click.prevent="logout"
      >
        <i class="fas fa-fw fa-table"></i>
        <span>Logout</span></a
      >
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block" />

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
      <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>

    <!-- Sidebar Message -->
    <div class="sidebar-card d-none d-lg-flex">
      <img
        class="sidebar-card-illustration mb-2"
        src="/img/undraw_rocket.svg"
        alt="..." />
      <p class="text-center mb-2">
        <strong>SB Admin Pro</strong> is packed with premium features,
        components, and more!
      </p>
      <a
        class="btn btn-success btn-sm"
        href="https://startbootstrap.com/theme/sb-admin-pro"
        >Upgrade to Pro!</a
      >
    </div>
  </ul>
</template>