<template>
    <button type="button" @click="googleAuth"
        class="flex items-center w-full justify-center rounded-3xl bg-white border border-grey px-3 py-2 text-sm font-semibold leading-6 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        <IconGoogle class="w-5 h-5 mr-3" /> {{ isLogin ? 'Sign in' : 'Sign up' }} with Google
    </button>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import IconGoogle from "./icons/IconGoogle.vue";
import { googleTokenLogin } from "vue3-google-login";
import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();
const store = useStore();
const props = defineProps({
    isLogin: Boolean
});

const googleAuth = async () => {
    try {
        const res = await googleTokenLogin();
        const token = res.access_token;
        const response = await store.dispatch('auth/googleAuth', { access_token: token });
        if (response) {
            router.push('/generate');  // Redirect the user on successful login
        }
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Unable to reach the server. Please check your internet connection or try again later.");
        }
    }

}
</script>

