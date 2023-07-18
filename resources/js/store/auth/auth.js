import { defineStore } from 'pinia';
import {Register, User, Login, Logout} from '../../services/auth/auth'
import { Notify } from '../../services/notification';
import { useRouter } from "vue-router";
import router from '../../router';

export const useAuthStore = defineStore({
	id: 'auth',
	state: () => ({
		user: {
			email: '',
			name: '',
		},
        isAuthenticated: false,
		errors: [],
        router: useRouter(),
	}),
    getters:{
        getUser: (state) => state.user,
        getIsAuthenticated:(state) => state.isAuthenticated
    },
	actions: {
		async Action_Login(payload) {
			const data = await Login(payload);
			this.Action_User();
            if(data?.response?.status){
                this.router.push({ name: "login" });
				if(data?.response?.data?.message){
					Notify(data.response.status, 'Error', data.response.data.message.text);
				}
            }else {
                this.router.push({ name: "pokemons" });
            }
		},
        async Action_Register(payload) {
			const data = await Register(payload);
			if (data?.response?.data?.Error) {
				Notify(400, 'Error', data.response.data.Error);
			} else {
				Notify(data?.response?.status ?? 200, data?.response?.statusText ?? 'Exitoso', data?.message ?? 'Usuario creado correctamente');
				await this.router.push({ name: "login" });
			}
		},
        async Action_Logout() {
			const data = await Logout();
			this.Action_User();
			if (data?.data?.message) {
				Notify(data.status, data.statusText, data.data.message.text);
				this.router.push({ name: "login" });
			} else if (data?.data?.Error) {
				Notify(400, 'Error', data.data.Error);
			} else {
				Notify(data?.response?.status ?? 200, data?.response?.statusText ?? 'Error', data?.message ?? 'No se pudo cerrar sesion');
			}
		},
        async Action_User() {
			const data = await User();
            if(data?.response?.status === 401){
                this.user.email = '';
				this.user.name = '';
				this.user.isAuthenticated = false;
            }else if(data?.data?.user) {
                this.user.name = data.data.user.name;
                this.user.email = data.data.user.email;
                this.isAuthenticated = true;
            }
		}
	},
    persist:true

});
