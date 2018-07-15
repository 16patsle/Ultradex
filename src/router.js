import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
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
        main: Home
      }
    },
    {
      path: "/about",
      name: "about",
      components: {
        sidebar: SidebarMenu,
        main: About
      }
    },
    {
      path: "/pokemon/:id",
      name: "pokemon",
      components: {
        sidebar: PokemonList,
        main: PokemonView
      }
    }
  ]
});
