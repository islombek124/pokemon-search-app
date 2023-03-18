<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    imgUrl: {
      required: true,
      type: String,
    },
    selectPokemon: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      pokemon: {},
      showPokemon: false,
      error: false,
    };
  },
  methods: {
    fetchData() {
      fetch(this.selectPokemon)
        .then((res) => res.json())
        .then((data) => {
          this.pokemon = data;
          this.showPokemon = true;
        })
        .catch(() => {
          this.error = true;
          this.showPokemon = false;
        });
    },
  },
  created() {
    this.fetchData();
  },
});
</script>

<template>
  <div class="detail">
    <article v-if="showPokemon">
      <img :src="imgUrl + pokemon.id + '.png'" alt="Loading..." />
      <h3>{{ pokemon.name }}</h3>
      <div class="div-group">
        <div>
          Base Experience <span>{{ pokemon.base_experience }}XP</span>
        </div>
        <hr />
        <div>
          Height <span>{{ pokemon.height }}m</span>
        </div>
        <hr />
        <div>
          Weight <span>{{ pokemon.weight }}kg</span>
        </div>
      </div>
      <div class="dv">
        <span class="title">Pokemon Types</span>
        <hr />
        <div class="types">
          <span
            class="sp type"
            v-for="(type, index) in pokemon.types"
            :key="index"
          >
            {{ type.type.name }}
          </span>
        </div>
      </div>
      <div class="dv">
        <span class="title">Abilities</span>
        <hr />
        <div class="types">
          <span
            class="sp ability"
            v-for="(type, index) in pokemon.abilities"
            :key="index"
          >
            {{ type.ability.name }}
          </span>
        </div>
      </div>
      <button class="close" @click="$emit('close', true)">Close</button>
    </article>
    <h2 v-if="error" style="color: red; font-size: 2rem">
      Pokemon was not found!
    </h2>
  </div>
</template>

<style scoped>
.detail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 1rem;
}

.detail article {
  max-width: 510px;
  width: 100%;
  padding: 10px 20px;
  border-radius: 4px;
  background: rgba(250, 250, 250, 1);
  text-align: center;
}

.detail article img {
  border-radius: 50%;
  padding: 10px;
  background: #333;
  transform: translateY(-50%);
}

.detail article h3 {
  font-size: 2rem;
}

.detail article .div-group div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.detail article .types {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  width: 100%;
  max-width: 400px;
}

.detail article .dv .types .sp {
  margin: 0 10px 10px 0;
  padding: 5px 10px;
  border-radius: 20px;
  color: #fff;
  font-size: 1rem;
  letter-spacing: 2px;
  text-transform: capitalize;
  word-wrap: none;
  word-break: keep-all;
}

.type {
  background: #2980b9;
}

.ability {
  background: #c0392b;
}

.detail article button {
  font-size: 1.2rem;
  color: rgba(250, 250, 250, 0.9);
  border-radius: 4px;
  padding: 7px 15px;
  cursor: pointer;
}

.detail article button.close {
  background: rgb(151, 7, 7);
  float: right;
}

.detail article .dv {
  text-align: left;
  margin: 20px 0;
}
</style>
