import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth/auth';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            name: 'home',
            meta: { title: 'Home' },
            redirect: 'pokemons',
            component: async () => await import('../pages/Index.vue'),
            children: [
                {
                    path: '/login',
                    name: 'login',
                    meta: { title: 'Iniciar sesion', requiresAuth: false },
                    component: async () => await import('../pages/auth/Login.vue')
                },
                {
                    path: '/pokemons',
                    name: 'pokemons',
                    meta: { title: 'Listar pokemons', requiresAuth: true },
                    component: async () => await import('../pages/user/Index.vue')
                },
                {
                    path: '/pokemon/:id',
                    name: 'pokemon',
                    meta: { title: 'Ver pokemon', requiresAuth: true },
                    component: async () => await import('../pages/user/Show.vue')
                },
                {
                    path: '/register',
                    name: 'register',
                    meta: { title: 'Registrarse' },
                    component: async () => await import('../pages/auth/Register.vue')
                }
            ],
        }
    ]
})


router.beforeEach(async (to, from, next) => {
    document.title = `WebApp - ${to.meta.title}`; const auth = useAuthStore()
    if (to.meta.requiresAuth && !auth.getIsAuthenticated) {
        //next('/login');
        window.location.href = '/login';
    } else if (!to.meta.requiresAuth && auth.getIsAuthenticated) {
        window.location.href = '/pokemons';
    } else {
        next();
    }
})
export default router