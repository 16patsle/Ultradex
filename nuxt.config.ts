import { fileURLToPath, URL } from "url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    "@": fileURLToPath(new URL("./src", import.meta.url)),
  },
  image: {
    domains: ["raw.githubusercontent.com"],
  },
  modules: ["@pinia/nuxt", "@nuxt/image-edge"],
  typescript: { shim: false, strict: true },
  vite: {
    server: {
      fs: {
        allow: ["../pokeapi.js"],
      },
    },
  },
});
