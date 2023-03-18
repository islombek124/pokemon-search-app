<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "../stores/store";

export default defineComponent({
  props: {
    imgUrl: {
      required: true,
      type: String,
    },
    apiUrl: {
      required: true,
      type: String,
    },
    pokemons: {
      required: true,
      type: Array,
    },
    nextUrl: {
      type: String,
    },
    nxt: {
      type: Function,
    },
  },
  setup() {
    const pokeStore = useStore();
    return { pokeStore };
  },
  methods: {
    scrollTrigger() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0 && this.nextUrl) {
            this.pokeStore.next();
          }
        });
      });

      observer.observe(this.$refs.infiniteScrollTrigger);
    },
  },

  mounted() {
    this.scrollTrigger();
  },
});
</script>

<template>
  <div class="pokemon-list">
    <article
      v-for="(pokemon, id) in pokemons"
      :key="id"
      @click="$emit('selectedPokemon', pokemon.url)"
    >
      <img
        :src="imgUrl + (id + 1) + '.png'"
        width="96"
        height="96"
        alt="Loading..."
      />
      <h3>{{ pokemon.name }}</h3>
    </article>
    <div id="scroll-trigger" ref="infiniteScrollTrigger">Loading...</div>
  </div>
</template>
