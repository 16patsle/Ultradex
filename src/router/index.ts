import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: {
        sidebar: () => import("../views/SidebarMenu.vue"),
        main: HomeView,
      },
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        sidebar: () => import("../views/SidebarMenu.vue"),
        main: () => import("../views/AboutView.vue"),
      },
    },
    {
      path: "/pokemon",
      name: "pokemon",
      components: {
        sidebar: () => import("../views/PokemonList.vue"),
        main: HomeView,
      },
    },
    {
      path: "/pokemon/:id",
      name: "pokemon-view",
      components: {
        sidebar: () => import("../views/PokemonList.vue"),
        main: () => import("../views/PokemonView.vue"),
      },
    },
  ],
});
