<template>
  <div id="app">
    <div class="columns">
      <aside v-show="showSidebar" class="sidebar-view column is-one-third is-narrow-tablet is-one-quarter-widescreen">
        <MenuToggleButton :open="showSidebar" @click="toggleSidebar">Toggle Sidebar</MenuToggleButton>
        <router-view name="sidebar" class="sidebar-content"></router-view>
      </aside>
      <div v-show="showMain" class="column main-container">
        <MenuToggleButton v-show="!showSidebar" :open="showSidebar" @click="toggleSidebar">Toggle Sidebar</MenuToggleButton>
        <nav id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </nav>
        <main class="main-view">
          <router-view name="main"></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import MenuToggleButton from "./components/MenuToggleButton";

export default {
  components: {
    MenuToggleButton
  },
  data() {
    return {
      showSidebar: true
    };
  },
  computed: {
    showMain() {
      if (this.showSidebar && window.matchMedia("(max-width: 768px)").matches) {
        return false;
      } else {
        return true;
      }
    }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      console.log(to, from);
      if (this.showSidebar) {
        this.toggleSidebar(true);
      }
      next();
    });
  },
  methods: {
    toggleSidebar(onlyIfMobile) {
      if (onlyIfMobile && window.matchMedia("(max-width: 768px)").matches) {
        this.showSidebar = !this.showSidebar;
      } else {
        this.showSidebar = !this.showSidebar;
      }
    }
  }
};
</script>


<style>
body {
  width: 100vw;
  height: 100vh;
}

#app {
  height: 100%;
  width: 100%;
}

#app .columns {
  height: 100%;
  width: 100%;
}

aside.sidebar-view {
  height: 100vh;
  overflow-y: scroll;
  margin-left: 0.75rem;
  margin-top: 0.75rem;
}

aside.sidebar-view .sidebar-content {
  text-align: center;
}

div.main-container {
  margin-left: 0.75rem;
  margin-top: 0.75rem;
}

main.main-view {
  max-height: 100%;
}

#nav {
  display: inline-block;
  padding-bottom: calc(0.375em - 1px);
  padding-left: 0.75em;
  padding-right: 0.75em;
  padding-top: calc(0.375em - 1px);
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#app main.main-view h2 {
  font-size: 1.55rem;
}

#app main.main-view h3 {
  font-size: 1.35rem;
}

#app main.main-view h4 {
  font-size: 1.2rem;
}

#app main.main-view h5 {
  font-size: 1.05rem;
}

#app main.main-view h3,
#app main.main-view h4,
#app main.main-view h5,
#app main.main-view h6 {
  color: #4a4a4a;
  font-weight: 400;
  line-height: 1.125;
}
</style>
