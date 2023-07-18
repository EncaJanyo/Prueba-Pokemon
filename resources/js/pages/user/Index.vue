<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-2" v-for="pokemon in pokemons">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ pokemon.name }}</h5>
            <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon.id}.png`">
            <a href="#" @click="ViewPokemon(pokemon.id)" class="btn btn-primary">Ver pokemon</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { usePokemonStore } from '../../store/pokemon';
const { pokemons } = storeToRefs(usePokemonStore());
const { Action_Pokemons } = usePokemonStore();
const router = useRouter();

onBeforeMount(async () => {
  await Action_Pokemons();
});

function ViewPokemon(id) {
  if (!id) return;
  router.push({ name: 'pokemon', params: { id } });
}
</script>

