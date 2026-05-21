<script setup>
import Modal from "../components/Modal.vue";
import { ref, onMounted } from "vue";
import { useMovieStore } from "../stores/movies";
const store = useMovieStore();
onMounted(() => {
  store.loadmovies();
});
</script>
<template>
  <div class="min-h-screen bg-gray-200">
    <div class="text-center py-7">
      <h1 class="text-5xl font-bold my-2 py-1 text-blue-500">Movies _Page</h1>
      <p class="my-1 py-1 text-2xl font-semibold text-green-500">
        Wellocome !!! Which Movies You Want ?
      </p>
    </div>
    <div class="flex gap-6 justify-center">
      <input
        class="py-1 px-2 rounded-lg bg-black/90 text-white"
        type="search"
        placeholder="Search..."
        v-model="store.search"
        @keyup.enter="store.fetchMovies(store.search)"
      />
      <button
        class="bg-violet-400 p-1 rounded-lg hover:scale-105 hover:-translate-x-2 transition duration-300"
        @click="store.fetchMovies(store.search)"
      >
        Search
      </button>
    </div>
    <div class="flex justify-end gap-3 mr-4 pr-4 my-2 py-1 animate-pulse">
      <button
        @click="store.activefilter = 'all'"
        class="bg-lime-400 px-2 py-1 rounded hover:bg-lime-600 transition duration-300"
      >
        All
      </button>
      <button
        @click="store.activefilter = 'movie'"
        class="bg-lime-400 px-2 py-1 rounded hover:bg-lime-600 transition duration-300"
      >
        Movies
      </button>
      <button
        @click="store.activefilter = 'game'"
        class="bg-lime-400 px-2 py-1 rounded hover:bg-lime-600 transition duration-300"
      >
        Games
      </button>
      <button
        @click="store.activefilter = 'series'"
        class="bg-lime-400 px-2 py-1 rounded hover:bg-lime-600 transition duration-300"
      >
        Series
      </button>
    </div>
    <div class="text-center my-2 mb-3">
      <p v-if="store.loading" class="mt-1 font-semibold">Loading...</p>
      <p v-if="store.error" class="text-red-600 p-1">{{ store.error }}</p>
    </div>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 m-2 p-1"
    >
      <div v-for="movie in store.filterMovies" :key="movie.id">
        <img
          :src="movie.poster"
          class="w-full h-64 object-cover"
          @error="(e) => (e.target.src = 'https://via.placeholder.com/300')"
          @click="store.opeanmodal(movie.id)"
        />
        <p class="my-1 text-blue-700">{{ movie.title }}</p>
        <p class="my-1 font-semibold">{{ movie.year }}</p>
        <button
          class="bg-green-600 p-1 rounded-full hover:bg-green-700 transition duration-500"
          @click="store.addtowatch(movie)"
        >
          ADD
        </button>
      </div>
    </div>
    <Modal
      :showmodal="store.showmodal"
      :movie="store.movies"
      :currentindex="store.currentindex"
      @close="store.showmodal = false"
      @next="store.nextposter"
      @prev="store.prevposter"
    />
  </div>
</template>
