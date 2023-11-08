<script setup>
import "bootstrap-icons/font/bootstrap-icons.min.css";

// import css and js
useHead({
  link: [
    {
      href: "/css/reset.css",
      rel: "stylesheet",
      type: "text/css",
    },
    {
      href: "/css/fontawesome-free/css/all.min.css",
      rel: "stylesheet",
      type: "text/css",
    },
    {
      href: "/css/sb-admin-2.min.css",
      rel: "stylesheet",
      type: "text/css",
    },
    {
      href: "/css/custom.css",
      rel: "stylesheet",
      type: "text/css",
    },
    {
      href: "/vendor/datatables/dataTables.bootstrap4.min.css",
      rel: "stylesheet",
      type: "text/css",
    },
    {
      href: "https://fonts.googleapis.com",
      rel: "preconnect",
      type: "text/css",
    },
    {
      href: "https://fonts.gstatic.com",
      rel: "preconnect",
      type: "text/css",
    },
    {
      href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap",
      rel: "stylesheet",
      type: "text/css",
    },
    {
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
      rel: "stylesheet",
      type: "text/css",
    },
  ],
  script: [
    {
      src: "/vendor/jquery/jquery.min.js",
    },
    {
      src: "/vendor/bootstrap/js/bootstrap.bundle.min.js",
    },
    {
      src: "/vendor/jquery-easing/jquery.easing.min.js",
    },
    {
      src: "/js/sb-admin-2.min.js",
    },
    {
      src: "/vendor/datatables/jquery.dataTables.min.js",
    },
  ],
});
</script>

<style lang="css">
.nav-item .nav-link {
  color: #fff !important;
}

.td-width-30 {
  width: 30%;
}

.td-width-20 {
  width: 20%;
}

.td-width-15 {
  width: 15%;
}

.td-width-10 {
  width: 10%;
}

.td-width-5 {
  width: 5%;
}

.width-30 {
  width: 30%;
}

.width-20 {
  width: 20%;
}

.width-15 {
  width: 15%;
}

.width-10 {
  width: 10%;
}

.width-5 {
  width: 5%;
}

.inline-block {
  display: inline-block;
}

.vertical-align-middle {
  vertical-align: middle !important;
}

.select-sm {
  height: 26px;
  font-size: 14px;
  padding: 2px;
}

.article-menu-link {
  color: black;
}

.article-menu-link span {
  background-color: #565151;
  color: white;
  display: inline-block;
  padding: 2px 6px;
  text-align: center;
  border-radius: 4px;
  align-items: center;
  font-size: 12px;
}

.router-link-exact-active {
  color: #4e73df;
}

.router-link-exact-active span {
  background-color: #0d6efd;
  color: white;
  display: inline-block;
  min-width: 20px;
  text-align: center;
  border-radius: 4px;
  align-items: center;
}

.text-white {
  color: white !important;
}

.tox-notifications-container {
  display: none !important;
}

.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n + 3),
.input-group:not(.has-validation)
  > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.pagination-per-page {
  width: 30%;
}

.Page {
  border: 1px solid #d3d3d3;
  padding: 14px;
}

/* .Page-active {
  border: 1px solid #0d6efd !important;
  padding: 14px;
  background-color: #0d6efd !important;
  color: white;
} */

.Page-active {
  border: 1px solid #0d6efd !important;
  padding: 14px;
  background-color: transparent !important;
  color: #0d6efd;
}

.PaginationControl {
  border: 1px solid #d3d3d3;
  padding: 5px 3px;
  border-radius: 3px;
  margin: 0 2px;
}

.pagination {
  display: flex;
  justify-content: space-between;
}

.inline-block {
  display: inline-block !important;
}
</style>

<template>
  <!-- <ClientOnly> -->
  <div id="page-top">
    <!-- Page Wrapper -->
    <div id="wrapper">
      <!-- Sidebar -->
      <SideBar />
      <!-- End of Sidebar -->

      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
        <div id="content">
          <!-- Topbar -->
          <nav
            class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <!-- Sidebar Toggle (Topbar) -->
            <button
              id="sidebarToggleTop"
              class="btn btn-link d-md-none rounded-circle mr-3">
              <i class="fa fa-bars"></i>
            </button>

            <!-- Topbar Search -->
            <SearchComp />

            <!-- Topbar Navbar -->
            <ul class="navbar-nav ml-auto">
              <!-- Nav Item - Search Dropdown (Visible Only XS) -->
              <SearchMobiComp />

              <!-- Nav Item - Alerts -->
              <AlertComp />

              <!-- Nav Item - Messages -->
              <MessageComp />

              <div class="topbar-divider d-none d-sm-block"></div>

              <!-- Nav Item - User Information -->
              <ProfileDropDown />
            </ul>
          </nav>
          <!-- End of Topbar -->

          <!-- Begin Page Content -->
          <div class="container-fluid">
            <div>
              <slot />
            </div>
          </div>
          <!-- /.container-fluid -->
        </div>
        <!-- End of Main Content -->

        <!-- Footer -->
        <footer class="sticky-footer bg-white">
          <div class="container my-auto">
            <div class="copyright text-center my-auto">
              <span>Copyright &copy; Your Website 2021</span>
            </div>
          </div>
        </footer>
        <!-- End of Footer -->
      </div>
      <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>
  </div>
  <!-- </ClientOnly> -->
</template>
