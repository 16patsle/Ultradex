<template>
  <div id="app">
    <div class="columns">
      <aside
        v-show="showSidebar"
        class="sidebar-view column is-one-third is-narrow-tablet is-one-quarter-widescreen"
      >
        <MenuToggleButton :open="showSidebar" @click="toggleSidebar"
          >Toggle Sidebar</MenuToggleButton
        >
        <AppNavbar isTouchMode />
        <router-view name="sidebar" class="sidebar-content"></router-view>
      </aside>
      <div v-show="showMain" class="column main-container">
        <MenuToggleButton
          v-show="!showSidebar"
          :open="showSidebar"
          @click="toggleSidebar"
          >Toggle Sidebar
        </MenuToggleButton>
        <AppNavbar />
        <main class="main-view">
          <router-view name="main"></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import MenuToggleButton from "./components/MenuToggleButton.vue";
import AppNavbar from "./components/AppNavbar.vue";

const showSidebar = ref(true);

const showMain = computed(() => {
  if (showSidebar.value && window.matchMedia("(max-width: 768px)").matches) {
    return false;
  } else {
    return true;
  }
});

const toggleSidebar = (onlyIfMobile) => {
  if (onlyIfMobile && window.matchMedia("(max-width: 768px)").matches) {
    showSidebar.value = !showSidebar.value;
  } else {
    showSidebar.value = !showSidebar.value;
  }
};

useRouter().beforeEach((to, from, next) => {
  console.log(to, from);
  if (showSidebar.value) {
    toggleSidebar(true);
  }
  next();
});
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
