import { defineStore } from "pinia";
import { computed, ref, onMounted, onUnmounted } from "vue";
export const useMovieStore = defineStore("movie", () => {
  const movies = ref([]);
  const showmodal = ref(false);
  const search = ref("");
  const loading = ref(false);
  const error = ref("");
  const currentindex = ref(0);
  const watchlist = ref([]);
  const activefilter = ref("all");
  const perpage = 6;
  const currentpage = ref(1);

  async function fetchMovies(search) {
    try {
      loading.value = true;
      error.value = "";
      const res = await fetch(
        `https://www.omdbapi.com/?s=${search}&apikey=cab378b0`,
      );
      const data = await res.json();
      if (data.Response === "False") {
        movies.value = [];
        error.value = data.Error;
        return;
      }
      movies.value = (data.Search || []).map((m) => ({
        title: m.Title,
        year: m.Year,
        poster: m.Poster,
        id: m.imdbID,
        type: m.Type,
      }));
      savemovies();
      console.log("work Successfully", data);
    } catch (err) {
      error.value = "Network Error";
      console.log(err);
    } finally {
      loading.value = false;
    }
  }
  function savemovies() {
    localStorage.setItem("movies", JSON.stringify(movies.value));
  }
  function loadmovies() {
    const save = localStorage.getItem("movies");
    if (save) {
      movies.value = JSON.parse(save);
    }
  }
  function savewatchlist() {
    localStorage.setItem("watch", JSON.stringify(watchlist.value));
  }
  function loadwatchlist() {
    const save = localStorage.getItem("watch");
    if (save) {
      watchlist.value = JSON.parse(save);
    }
  }
  function addtowatch(m) {
    const exist = watchlist.value.find((w) => w.id === m.id);
    if (exist) {
      return;
    }
    watchlist.value.push(m);
    savewatchlist();
  }
  function removewatchlist(id) {
    watchlist.value = watchlist.value.filter((w) => w.id !== id);
    savewatchlist();
  }
  function upholdkey(event) {
    if (!showmodal.value) return;
    if (event.key === "Escape") {
      showmodal.value = false;
    }
    if (event.key === "ArrowRight") {
      currentindex.value++;
    }
    if (event.key === "ArrowLeft") {
      currentindex.value--;
    }
  }
  onMounted(() => {
    window.addEventListener("keydown", upholdkey);
  });
  onUnmounted(() => {
    window.removeEventListener("keydown", upholdkey);
  });
  const totalpage = computed(() => {
    return Math.ceil(movies.value.length / perpage);
  });
  const pagination = computed(() => {
    const start = (currentpage.value - 1) * perpage;
    const end = currentpage.value * perpage;
    return filterMovies.value.slice(start, end);
  });
  function opeanmodal(id) {
    const index = movies.value.findIndex((m) => m.id === id);
    currentindex.value = index;
    showmodal.value = true;
  }
  function opeanmodalwa(id) {
    const index = watchlist.value.findIndex((m) => m.id === id);
    currentindex.value = index;
    showmodal.value = true;
  }

  const filterMovies = computed(() => {
    if (activefilter.value === "all") {
      return movies.value;
    }
    return movies.value.filter((m) => m.type === activefilter.value);
  });
  function nextpage() {
    if (currentpage.value < totalpage.value) {
      currentpage.value++;
    } else {
      currentpage.value = 1;
    }
  }
  function previouspage() {
    if (currentpage.value > 0) {
      currentpage.value--;
    } else {
      currentpage.value = totalpage.value;
    }
  }
  return {
    totalpage,
    movies,
    loading,
    error,
    watchlist,
    fetchMovies,
    loadmovies,
    search,
    addtowatch,
    loadwatchlist,
    removewatchlist,
    showmodal,
    // nextposter,
    // prevposter,
    opeanmodal,
    currentindex,
    activefilter,
    filterMovies,
    pagination,
    currentpage,
    nextpage,
    previouspage,
    opeanmodalwa,
    upholdkey,
  };
});
