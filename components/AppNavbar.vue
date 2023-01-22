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
          <NuxtLink to="/">Home</NuxtLink>
        </div>
        <hr class="navbar-divider" />
        <div class="navbar-item">
          <NuxtLink to="/about">About</NuxtLink>
        </div>
        <hr class="navbar-divider" />
        <div class="navbar-item">
          <NuxtLink to="/pokemon">Pokemon</NuxtLink>
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

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
