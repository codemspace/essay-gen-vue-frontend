import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '../layouts/BaseLayout.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Generate from "@/views/Generate.vue"
import CheckoutLayout from "@/layouts/CheckoutLayout.vue";
import CheckoutSuccess from "@/views/CheckoutSuccess.vue";
import CheckoutCancel from "@/views/CheckoutCancel.vue";
import { jwtDecode } from "jwt-decode";

const routes = [
    {
        path: '/',
        component: BaseLayout,
        children: [
            // { path: '', redirect: '/generate' },
            { path: '', name: 'Home', component: Home },
            { path: 'pricing', name: 'Pricing', component: () => import('@/views/Pricing.vue') },
            { path: 'examples', name: 'Examples', component: () => import('@/views/Examples.vue'), meta: { requiresAuth: true } },
            { path: 'affiliate', name: 'Affiliate', component: () => import('@/views/Affiliate.vue') }
        ]
    },
    {
        path: '/checkout',
        component: CheckoutLayout,
        children: [
            { path: 'success', name: 'Checkout Success', component: () => CheckoutSuccess },
            { path: 'cancel', name: 'Checkout Cancel', component: () => CheckoutCancel },
        ]
    },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/generate', name: 'Generate', component: Generate, meta: { requiresAuth: true } },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

function isTokenValid(token) {
    try {
        if (!token) return false;
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 > Date.now();
    } catch (error) {
        return false;
    }
}

// Navigation Guard
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.meta.requiresAuth && !isTokenValid(token)) {
        next({ name: 'Login' });
    } else {
        next();
    }
});

export default router;