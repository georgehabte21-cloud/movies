import { createRouter, createWebHistory } from "vue-router";
import Movies from "../views/Movies.vue";
import Watchlist from "../views/Watchlist.vue";

const routes = [
  {
    path: "/",
    component: Movies,
  },
  {
    path: "/watch",
    component: Watchlist,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
