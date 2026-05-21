<script setup>
const props = defineProps({
  movie: Array,
  showmodal: Boolean,
  currentindex: Number,
});
const emit = defineEmits(["close", "next", "prev"]);
</script>
<template>
  <div
    v-if="props.showmodal"
    class="fixed bg-black/80 inset-0 flex justify-center items-center"
  >
    <button class="absolute top-5 right-5 text-2xl" @click="emit('close')">
      ✖
    </button>
    <div class="text-center">
      <img
        :src="props.movie[props.currentindex]?.poster"
        @error="(e) => (e.target.src = 'https://via.placeholder.com/300')"
        class="w-80 rounded-lg hover:scale-105 transition duration-300"
      />

      <p class="text-white text-xl mt-3">
        {{ props.movie[props.currentindex]?.title }}
      </p>

      <p class="text-gray-300">
        {{ props.movie[props.currentindex]?.year }}
      </p>
    </div>
    <button class="absolute left-5 text-2xl" @click="emit('prev')">⬅</button>
    <button class="absolute right-5 text-2xl" @click="emit('next')">➡</button>
  </div>
</template>
