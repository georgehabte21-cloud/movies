<script setup>
import { ref, onMounted } from "vue";
import { useMovieStore } from "../stores/movies";
const store = useMovieStore();
onMounted(() => {
  store.loadwatchlist();
});
</script>
<template>
  <div class="min-h-screen bg-gray-300/100">
    <div class="text-center py-7 shadow-sm">
      <h1 class="text-3xl text-blue-900 font-bold animate-bounce">
        Your Watch List
      </h1>
    </div>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3"
    >
      <div v-for="watch in store.watchlist" :key="watch.id" class="rounded">
        <img :src="watch.poster" class="w-full h-64 object-contain" />
        <p>{{ watch.tittle }}</p>
        <p>{{ watch.year }}</p>
        <button
          class="bg-red-300 p-1 rounded-lg"
          @click="store.removewatchlist(watch.id)"
        >
          remove
        </button>
      </div>
    </div>
  </div>
</template>
