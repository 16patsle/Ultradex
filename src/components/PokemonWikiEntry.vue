<template>
  <div class="wiki-wrapper">
    <b-loading :is-full-page="false" :active="loading"></b-loading>
    <b-notification v-if="error" type="is-danger">
      <h2 class="subtitle">ERROR!</h2>
      <p>{{ JSON.stringify(error) }}</p>
    </b-notification>
    <div v-if="$store.state.pokemonWikiEntries[pokemonId]" class="columns">
      <div class="column">
        <b-collapse class="wiki-collapse">
          <h2 slot="trigger" slot-scope="props" class="subtitle wiki-entry-header"><fa-icon :icon="props.open ? 'caret-down' : 'caret-right'" fixed-width title="Show/hide wiki entry"/>Wiki entry</h2>
          <div class="content" v-html="$store.state.pokemonWikiEntries[pokemonId].text.introduction.html"></div>
          <b-collapse v-for="section in makeSortedArray($store.state.pokemonWikiEntries[pokemonId].text)" :key="section.title" :open="false" class="wiki-collapse">
            <PokemonHeading slot="trigger" slot-scope="sectionProps" :level="3 + parseInt(section.depth)"><fa-icon :icon="sectionProps.open ? 'caret-down' : 'caret-right'" fixed-width title="Show/hide section"/>{{ section.title }}</PokemonHeading>
            <div class="content" v-html="section.html"></div>
            <b-collapse v-for="section2 in section.children" :key="section2.title" :open="false" class="wiki-collapse">
              <PokemonHeading slot="trigger" slot-scope="section2Props" :level="3 + parseInt(section2.depth)"><fa-icon :icon="section2Props.open ? 'caret-down' : 'caret-right'" fixed-width title="Show/hide section"/>{{ section2.title }}</PokemonHeading>
              <div class="content" v-html="section2.html"></div>
              <b-collapse v-for="section3 in section2.children" :key="section3.title" :open="false" class="wiki-collapse">
                <PokemonHeading slot="trigger" slot-scope="section3Props" :level="3 + parseInt(section3.depth)"><fa-icon :icon="section3Props.open ? 'caret-down' : 'caret-right'" fixed-width title="Show/hide section"/>{{ section3.title }}</PokemonHeading>
                <div class="content" v-html="section3.html"></div>
              </b-collapse>
            </b-collapse>
          </b-collapse>
          <p class="copyright">&copy; Bulbapedia contributors, licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/2.5/" target="_blank" rel="noopener">CC BY-NC-SA 2.5</a></p>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonHeading from "@/components/PokemonHeading.vue";

export default {
  name: "PokemonWikiEntry",
  components: {
    PokemonHeading
  },
  props: {
    pokemonId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      error: null
    };
  },
  computed: {},
  watch: {
    // fetch data again if the route changes
    pokemonId: "fetchPokemonWikiEntry"
  },
  created() {
    // fetch the pokemon data when the view is created
    this.fetchPokemonWikiEntry();
  },
  methods: {
    makeSortedArray(object) {
      const array = [];
      for (const section in object) {
        array[object[section].index] = object[section];
      }
      return array
        .slice(1)
        .filter(Object)
        .filter(section => {
          switch (section.title) {
            case "Game data":
            case "In other languages":
            case "Notes":
            case "Related articles":
            case "External links":
            case "References":
              return false;
            default:
              return true;
          }
        });
    },
    fetchPokemonWikiEntry() {
      if (!this.pokemonEntry) {
        this.loading = true;
        this.error = null;

        return this.$store
          .dispatch("getPokemonWikiEntry", {
            pokemonId: this.pokemonId
          })
          .then(() => {
            this.loading = false;
            this.$emit("loaded");
          })
          .catch(err => {
            this.loading = false;
            this.error = err;
          });
      } else {
        this.$emit("loaded");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.wiki-wrapper {
  position: relative;
  min-height: 250px;
}

.copyright {
  padding-top: 8px;
  padding-left: 10px;
  margin-bottom: 2rem;
  font-size: 0.8rem;
}

h2.wiki-entry-header {
  padding-bottom: 10px;
}

.wiki-collapse p,
.wiki-collapse .wiki-collapse {
  padding-left: 31px;
}

.wiki-wrapper h3,
.wiki-wrapper h4,
.wiki-wrapper h5,
.wiki-wrapper h6 {
  color: #4a4a4a;
  font-weight: 400;
  line-height: 1.125;
  margin-bottom: 0.6666em;
}

.wiki-wrapper .content {
  margin-bottom: 1.5rem;
}
</style>
<style>
.wiki-wrapper .content .main-article-link {
  padding-bottom: 10px;
}
</style>
