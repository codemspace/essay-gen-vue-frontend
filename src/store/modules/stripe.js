import { apis } from "@/apis";
import {loadStripe} from '@stripe/stripe-js';
import { useToast } from "vue-toastification";
const toast = useToast();

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const state = () => ({
    loading: false,
    status: false
});

const actions = {
    checkout: async ({ commit }, payload) => {
        commit('startLoading');
        try {
            console.log(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
            const stripe = await stripePromise;
            const priceTypes = {
                1: 'monthly',
                2: 'yearly',
            };
            const priceType = priceTypes[payload];

            if (!priceType) {
                toast.info("Please select a valid plan.");
                return;
            }

            const response = await apis.checkout({ priceType });

            const { data } = response;
            await stripe.redirectToCheckout({ sessionId: data.sessionId });
            commit('endLoading');
        } catch (err) {
            commit('endLoading');
            throw err;  // Rethrow to allow component-level handling
        }
    }
}

const mutations = {
    startLoading: (state) => {
        state.loading = true;
    },
    endLoading: (state) => {
        state.loading = false;
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
