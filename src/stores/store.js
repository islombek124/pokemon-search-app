import { defineStore } from "pinia";

export const useStore = defineStore("pokeStore", {
  state: () => ({
    apiUrl: "https://pokeapi.co/api/v2/pokemon/",
    imgUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
    nextUrl: "",
    pokemons: [],
  }),
  actions: {
    fetchData() {
      let req = new Request(this.apiUrl);
      fetch(req)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          data.results.forEach((pokemon) => {
            this.pokemons.push(pokemon);
          });
          this.nextUrl = data.next;
        })
        .catch((err) => console.log(err));
    },
    next() {
      this.apiUrl = this.nextUrl;
      this.fetchData();
    },
  },
});
