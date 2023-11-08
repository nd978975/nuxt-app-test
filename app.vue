<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script setup>
import "bootstrap/dist/css/bootstrap.min.css";
</script>

<style>
textarea:focus, 
select:focus, 
select.form-control:focus, 
textarea.form-control:focus, 
input.form-control:focus, 
input[type=text]:focus, 
input[type=password]:focus, 
input[type=email]:focus, 
input[type=number]:focus, 
[type=text].form-control:focus, 
[type=password].form-control:focus, 
[type=email].form-control:focus, 
[type=tel].form-control:focus, 
[contenteditable].form-control:focus {
  box-shadow: inset 0 -1px 0 #ddd;
}
</style>