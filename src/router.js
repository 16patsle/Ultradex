import Vue from "vue";
import Router from "vue-router";
import HomeView from "./views/HomeView.vue";
import AboutView from "./views/AboutView.vue";
import SidebarMenu from "./views/SidebarMenu.vue";
import PokemonList from "./views/PokemonList.vue";
import PokemonView from "./views/PokemonView.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        sidebar: SidebarMenu,
        main: HomeView,
      },
    },
    {
      path: "/about",
      name: "about",
      components: {
        sidebar: SidebarMenu,
        main: AboutView,
      },
    },
    {
      path: "/pokemon",
      name: "pokemon",
      components: {
        sidebar: PokemonList,
        main: HomeView,
      },
    },
    {
      path: "/pokemon/:id",
      name: "pokemon-view",
      components: {
        sidebar: PokemonList,
        main: PokemonView,
      },
    },
  ],
});
