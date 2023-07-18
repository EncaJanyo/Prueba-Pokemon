<template>
    <div class="row mt-5">
        <div class="col-md-4 offset-md-4">
            <div class="card border border-success">
                <div class="card-header bg-success border border-success text-white">LOGIN</div>
                <div class="card-body">
                    <form @submit.prevent="confirm">
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-at"></i>
                            </span>
                            <input autofocus type="email" v-model="model.email" placeholder="Email" class="form-control">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">
                                <i class="fa-solid fa-key"></i>
                            </span>
                            <input autofocus type="password" v-model="model.password" placeholder="Password" class="form-control">
                        </div>
                        <div class="d-grid col-10 mx-auto">
                            <button class="btn btn-dark">Login</button>
                        </div>
                        <router-link :to="{ path: 'register'}">Register</router-link>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from "vue-router";
import { useAuthStore } from '../../store/auth/auth';
const { isAuthenticated } = storeToRefs(useAuthStore());
const { Action_Register, Action_Login, Action_User } = useAuthStore();

const props = defineProps({
    title: String,
    action: String,
    message: String,
    option: String,
    redirect: String,
});

const router = useRouter();

const model = reactive({
    email: '',
    password: '',
});

onBeforeMount(() => {
    console.log(isAuthenticated.value);
    if(isAuthenticated.value === true){
       console.log("Authentication");
    }
});


function redirect(ruta) {
    router.push(ruta);
}

async function confirm() {
    if (model.email !== null && model.email !== '' && model.password !== null && model.password !== '') {
        await Action_Login(model);
        model.email = '';
        model.password = '';
    } else {
        alert('Ingrese datos validos')
    }
}
</script>
