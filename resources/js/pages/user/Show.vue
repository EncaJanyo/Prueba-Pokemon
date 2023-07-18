<template>
    <div class="d-grid col-3 mx-auto" style="margin-bottom: 20px">
        <router-link class="btn btn-dark" :to="{ path: '../pokemons' }">Todos los pokemones</router-link>
    </div>
    <div class="container d-grid col-3 mx-auto">
    <div class="row" style="text-align: center;">
      <div class="col-sm-0">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ pokemon.name }}</h5>
            <img :src="pokemon.image">
            <p style="font-weight: bold; font-style: oblique;">Habilidades</p>
            <div v-for="ability in pokemon.abilities">
                <div>• {{ ability.ability.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { usePokemonStore } from '../../store/pokemon';
const { pokemon } = storeToRefs(usePokemonStore());
const { Action_Pokemon } = usePokemonStore();
const route = useRoute();

onBeforeMount(async () => {
    await Action_Pokemon(route.params?.id ?? 1);
});

</script>

