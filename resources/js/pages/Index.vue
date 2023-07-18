<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="/pokemons">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png" width="30" height="30">
                Pokemones
            </b-navbar-brand>

            <b-navbar-brand class="ml-auto">{{ user.name }} </b-navbar-brand>
                <b-navbar-nav class="ml-auto">

                    <b-nav-item-dropdown right>
                        <b-dropdown-item v-if="isAuthenticated" @click="logout" href="#">Cerrar sesion</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
        </b-navbar>
    </div>

    <main class="py-4">
        <router-view />
    </main>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from "vue-router";
import { useAuthStore } from '../store/auth/auth';
const { user, isAuthenticated } = storeToRefs(useAuthStore());
const { Action_Logout, Action_User } = useAuthStore();
const router = useRouter();
onBeforeMount(async () => {
  await Action_User();
});

const logout = () => {
    Action_Logout();
}


</script>
