<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useStore } from "./stores/store";
import PokemonList from "./components/PokemonList.vue";
import PokemonSearch from "./components/PokemonSearch.vue";
import PokemonDetail from "./components/PokemonDetail.vue";

export default defineComponent({
  components: { PokemonList, PokemonDetail, PokemonSearch },
  setup() {
    const pokeStore = useStore();
    const showDetail = ref(false);
    const selectPokemon = ref("");
    return { pokeStore, showDetail, selectPokemon };
  },
  methods: {
    selectedPokemon(url) {
      this.selectPokemon = url;
      this.showDetail = true;
    },
    close(close) {
      this.showDetail = !close;
    },
    setPokemonUrl(name) {
      if (this.selectPokemon !== "") this.showDetail = true;
      return (this.selectPokemon = this.pokeStore.apiUrl + name);
    },
  },
  mounted() {
    this.pokeStore.fetchData();
  },
});
</script>

<template>
  <div class="container">
    <h1>Pokemon's</h1>
    <PokemonSearch :apiUrl="pokeStore.apiUrl" @setPokemonUrl="setPokemonUrl" />
    <PokemonList
      v-if="pokeStore.pokemons.length !== 0"
      :imgUrl="pokeStore.imgUrl"
      :apiUrl="pokeStore.apiUrl"
      :pokemons="pokeStore.pokemons"
      :nextUrl="pokeStore.nextUrl"
      @selectedPokemon="selectedPokemon"
    />
    <PokemonDetail
      v-if="showDetail"
      :imgUrl="pokeStore.imgUrl"
      :selectPokemon="selectPokemon"
      @close="close"
    />
  </div>
</template>
