<template>
  <nav
    id="nav"
    :class="
      isTouchMode ? 'is-hidden-desktop touch-mode' : 'is-hidden-touch full-mode'
    "
    class="navbar"
    aria-label="main navigation"
  >
    <div :class="isTouchMode && 'is-active'" class="navbar-menu is-shadowless">
      <div class="navbar-start">
        <div class="navbar-item">
          <router-link to="/">Home</router-link>
        </div>
        <hr class="navbar-divider" />
        <div class="navbar-item">
          <router-link to="/about">About</router-link>
        </div>
        <hr class="navbar-divider" />
        <div class="navbar-item">
          <router-link to="/pokemon">Pokemon</router-link>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <LanguageSelector />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import LanguageSelector from "./LanguageSelector.vue";

withDefaults(
  defineProps<{
    isTouchMode?: boolean;
  }>(),
  {
    isTouchMode: false,
  }
);
</script>

<style scoped>
#nav.full-mode {
  display: inline-block;
  padding-left: 0.75em;
}
</style>
