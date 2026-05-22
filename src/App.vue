<script setup>
import Navbar from "./components/Navbar.vue";
</script>
<template>
  <div>
    <Navbar />
  </div>
  <div class="pt-20">
    <router-view />
  </div>
</template>
