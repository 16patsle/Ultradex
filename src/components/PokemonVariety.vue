<template>
  <div class="variety-wrapper">
    <o-loading :full-page="false" :active="loading"></o-loading>
    <o-notification v-if="error" variant="danger">
      <h2 class="subtitle">ERROR!</h2>
      <p>{{ error }}</p>
    </o-notification>
    <div v-if="pokemonVariety.pokemonData" class="columns">
      <div class="column">
        <div>
          <h3 class="variety-name">
            Variety: {{ $titlecase(pokemonNameLocalized) }}
          </h3>
        </div>
      </div>
    </div>
    <div v-if="pokemonVariety.pokemonData" class="columns">
      <div class="column">
        <div class="has-text-centered">
          <PokemonType
            v-for="type in pokemonTypes"
            :key="type"
            :type="type"
            class="has-text-centered"
          />
        </div>
        <div class="has-text-centered">
          <PokemonSprite
            v-if="pokemon.sprites.front_default"
            :sprite="pokemon.sprites.front_default"
            :pokemonName="$titlecase(pokemonNameLocalized)"
            spriteName="front"
          />
          <PokemonSprite
            v-else
            :sprite="pokemon.sprites.front_default"
            :pokemonName="$titlecase(pokemonNameLocalized)"
            spriteName="missing"
          />
          <PokemonSprite
            v-if="pokemon.sprites.back_default"
            :sprite="pokemon.sprites.back_default"
            :pokemonName="$titlecase(pokemonNameLocalized)"
            spriteName="back"
          />
        </div>
      </div>
      <PokemonStats
        :height="pokemon.height"
        :weight="pokemon.weight"
        :stats="pokemon.stats"
        class="pokemon-stats column is-half is-one-third-desktop is-one-fourth-widescreen"
      />
    </div>
  </div>
</template>

<script>
import PokemonSprite from "@/components/PokemonSprite.vue";
import PokemonType from "@/components/PokemonType.vue";
import PokemonStats from "@/components/PokemonStats.vue";
import { usePokemonStore } from "../stores/pokemonStore";

export default {
  name: "PokemonVariety",
  components: {
    PokemonSprite,
    PokemonType,
    PokemonStats,
  },
  props: {
    pokemonVariety: {
      type: Object,
      default() {
        return {};
      },
    },
    pokemonSpecies: {
      type: Object,
      default() {
        return {};
      },
    },
    pokemonDefaultVariety: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      loading: false,
      error: null,
    };
  },
  computed: {
    pokemon() {
      return this.pokemonVariety.pokemonData;
    },
    pokemonDefault() {
      return this.pokemonDefaultVariety.pokemonData;
    },
    pokemonNameLocalized() {
      let localizedName;
      for (let name of this.pokemonSpecies.names) {
        if (name.language.name === "en") {
          localizedName = name.name;
          break;
        }
      }
      if (this.pokemon.name === this.pokemonSpecies.name) {
        return localizedName;
      } else if (this.pokemon.name.includes(this.pokemonSpecies.name)) {
        return (
          this.pokemon.name
            .toLowerCase()
            .replace(this.pokemonSpecies.name, "")
            .replace("-", " ")
            .replace("-", " ") +
          " " +
          localizedName
        );
      } else {
        localizedName = this.pokemon.name;
        return localizedName.charAt(0).toUpperCase() + localizedName.slice(1);
      }
    },
    pokemonTypes() {
      let typesArray = [];
      for (let type of this.pokemon.types) {
        typesArray[type.slot - 1] =
          type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);
      }
      return typesArray;
    },
  },
  watch: {
    // fetch data again if the route changes
    pokemonVariety: "fetchPokemonVariety",
  },
  created() {
    // fetch the pokemon data when the view is created
    this.fetchPokemonVariety();
  },
  methods: {
    fetchPokemonVariety() {
      if (!this.pokemonVariety.pokemonData) {
        this.loading = true;
        this.error = null;

        const store = usePokemonStore();
        return store
          .fetchPokemonVariety({
            speciesId: this.$route.params.id,
            varietyId: /\S+\/([0-9]+)\//.exec(
              this.pokemonVariety.pokemon.url
            )[1],
          })
          .then(() => {
            this.loading = false;
          })
          .catch((err) => {
            this.loading = false;
            this.error = err;
          });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.variety-wrapper {
  position: relative;
  min-height: 250px;
  margin-bottom: 1rem;
}
.pokemon-stats {
  margin: 0.5rem;
}
.variety-name {
  padding-left: 31px;
}
</style>
