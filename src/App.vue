<template>
  <div id="app">
    <div class="columns">
      <aside class="sidebar-view column is-one-third is-narrow-tablet is-one-quarter-widescreen">
        <router-view name="sidebar"></router-view>
      </aside>
      <div class="column main-container">
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

<style>
body {
  width: 100vw;
  height: 100vh;
}

#app {
  height: 100%;
  width: 100%;
  overflow-y: hidden;
}

#app .columns {
  height: 100%;
  width: 100%;
}

aside.sidebar-view {
  height: 100vh;
  overflow-y: scroll;
  margin-left: 0.75rem;
  margin-right: 0.75rem;
  margin-top: 0.75rem;
  text-align: center;
}

main.main-view {
  height: 100%;
  overflow-y: scroll;
}

#nav {
  padding: 30px;
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

#app main.main-view h3,
#app main.main-view h4,
#app main.main-view h5,
#app main.main-view h6 {
  color: #4a4a4a;
  font-weight: 400;
  line-height: 1.125;
}
</style>
