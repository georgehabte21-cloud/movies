<script setup>
const props = defineProps({
  movie: Array,
  showmodal: Boolean,
  currentindex: Number,
});
const emits = defineEmits(["close", "updateindex"]);
function nextposter() {
  let next;
  if (props.currentindex < props.movie.length - 1) {
    next = props.currentindex + 1;
  } else {
    next = 0;
  }
  emits("updateindex", next);
}
function prevposter() {
  let prev;
  if (props.currentindex > 0) {
    prev = props.currentindex - 1;
  } else {
    prev = props.movie.length - 1;
  }
  emits("updateindex", prev);
}
</script>
<template>
  <div
    v-if="props.showmodal"
    class="fixed bg-black/80 inset-0 flex justify-center items-center"
  >
    <button class="absolute top-5 right-5 text-2xl" @click="emits('close')">
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
    <button class="absolute left-5 text-2xl" @click="prevposter">⬅</button>
    <button class="absolute right-5 text-2xl" @click="nextposter">➡</button>
  </div>
</template>
