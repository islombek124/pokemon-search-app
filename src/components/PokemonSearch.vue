<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: ["apiUrl"],
  setup() {
    const searchValue = ref("");

    return { searchValue };
  },

  methods: {
    setPokemonUrl() {
      if (this.searchValue !== "") {
        this.$emit("setPokemonUrl", this.searchValue);
      }
    },
  },
});
</script>

<template>
  <form
    @submit.prevent="setPokemonUrl"
    style="display: flex; align-items: center"
  >
    <input type="text" v-model="searchValue" />
    <button type="submit">Search</button>
  </form>
</template>
