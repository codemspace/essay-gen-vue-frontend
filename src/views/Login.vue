<template>
  <div class="flex min-h-screen">
    <!-- Left Part: Login Form -->
    <div class="w-1/2 max-sm:w-full flex flex-col justify-center lg:px-12 space-y-6 bg-main">
      <div class="w-full m-auto">
        <div class="flex min-h-full max-sm:w-full flex-col justify-center px-6 py-12 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
<!--            <a class="hover:cursor-pointer" href="/"><h1 class="text-center text-3xl font-bold leading-9 tracking-tight text-bright-red font-logo">goodpen</h1></a>-->
            <h2 class="mt-10 max-sm:mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">Welcome Back!</h2>
          </div>
          <div class="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="login">
              <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div class="mt-2">
                  <input id="email" v-model="email" type="email" placeholder="Example@email.com" autocomplete="email" required class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
<!--                  <div class="text-sm">-->
<!--                    <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>-->
<!--                  </div>-->
                </div>
                <div class="mt-2">
                  <input id="password" v-model="password" type="password" placeholder="Password" autocomplete="current-password" required class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>
              <div>
                <button type="submit" class="hover:cursor-pointer flex w-full justify-center rounded-3xl bg-bright-red px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
              </div>
            </form>

            <div class="mt-4">
              <GoogleAuth :is-login="true"/>
            </div>
            
            <p class="mt-5 text-center text-sm text-gray-500">
              Not a member?
              <a href="/register" class="font-semibold leading-6 text-grey">SignUp</a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 max-sm:hidden bg-cover bg-center relative bg-bright-red">
      <div class="absolute top-10 p-12 text-white w-full">
        <h1 class="abril-font text-7xl font-bold text-center text-pale-orange" style="font-family: ;">goodpen</h1>
      </div>
      <div class="h-full flex items-center relative overflow-hidden">
        <img src="/imgs/writing.png" class="absolute right-[-20%]" alt="Writing hand"/>
      </div>
      <div class="absolute bottom-10 p-12 text-white w-full">
        <h2 class="text-4xl text-center text-pale-orange">Save hours on your next</h2>
        <h2 class="text-4xl text-center text-pale-orange">paper.</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import GoogleAuth from '../components/GoogleAuth.vue';
import { useToast } from "vue-toastification";
const toast = useToast();

const email = ref('');
const password = ref('');
const router = useRouter();
const store = useStore();

const login = async () => {
  try {
    const response = await store.dispatch('auth/signin', { email: email.value, password: password.value });
    if (response) {
      router.push('/');  // Redirect the user on successful login
    }
    console.log('res: ', response)
  } catch (error) {
    console.log('error: ', error)
    if (error.response) {
      // When the server sends a response with a status code out of the range of 2xx
      toast.error(error.response.data.message);
    } else {
      // The request was made but no response was received, server might be down or no connection
      toast.error("Unable to reach the server. Please check your internet connection or try again later.");
    }
  }
};
</script>