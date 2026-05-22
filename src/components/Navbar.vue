<script setup></script>
<template>
  <div
    class="h-20 bg-black/60 text-white flex justify-between p-4 rounded-lg fixed left-0 top-0 w-full"
  >
    <div>
      <p class="text-red-700 text-4xl font-bold ml-3 pl-3 animate-pulse">
        NETFLIX
      </p>
    </div>

    <div class="flex gap-6">
      <router-link
        to="/"
        class="py-2 px-2 font-semibold hover:text-gray-200 transition duration-300"
        >Movies</router-link
      >
      <router-link
        to="/watch"
        class="py-2 px-2 font-semibold hover:text-gray-200 transition duration-300"
        >Watchlist</router-link
      >
      <a
        class="mx-4 bg-red-600 px-4 py-2 rounded-lg hover:-translate-x-2 transition duration-300 cursor-pointer"
        >Sign In</a
      >
    </div>
  </div>
</template>
