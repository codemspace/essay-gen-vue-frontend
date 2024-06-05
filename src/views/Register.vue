<template>
  <div class="flex min-h-screen">
    <!-- Left Part: Login Form -->
    <div class="w-1/2 max-sm:w-full flex flex-col justify-center lg:px-12 space-y-4 bg-main">
      <div class="w-full m-auto">
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
<!--            <a class="hover:cursor-pointer" href="/"><h1 class="text-center text-3xl font-bold leading-9 tracking-tight text-bright-red font-logo">goodpen</h1></a>-->
            <!--            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">-->
            <h2 class="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">Create your account!</h2>
          </div>
          <div class="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="submitForm" method="POST">
              <div>
                <label for="firstname" class="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                <div class="mt-2">
                  <input id="firstname" name="firstname" v-model="firstname" type="text" placeholder="John" required class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>

              <div>
                <label for="lastname" class="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                <div class="mt-2">
                  <input id="lastname" name="lastname" v-model="lastname" type="text" placeholder="Smith" required class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div class="mt-2">
                  <input id="email" name="email" type="email" v-model="email" placeholder="Example@email.com" autocomplete="email" required class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>

              <div>
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div class="mt-2">
                  <input id="password" name="password" v-model="password" type="password" placeholder="Password" autocomplete="current-password" required class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
              </div>

              <div>
                <div class="flex items-center mb-4">
                  <input id="agree-terms" v-model="agreeTerms" type="checkbox" class="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500">
                  <label for="agree-terms" class="ml-2 text-sm text-gray-900">I agree to the goodpen <a href="#" class="underline">terms</a> and <a href="#" class="underline">privacy policy</a></label>
                </div>
                <div class="flex items-center mb-4">
                  <input id="agree-news" v-model="agreeNews" type="checkbox" class="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500">
                  <label for="agree-news" class="ml-2 text-sm text-gray-900">Send me the occasional news & updates (optional)</label>
                </div>
              </div>

              <div>
                <button type="submit" class="hover:cursor-pointer flex w-full justify-center rounded-3xl bg-bright-red px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
              </div>
            </form>

            <div class="mt-4">
              <GoogleAuth />
            </div>
            
            <p class="mt-5 text-center text-sm text-gray-500">
              Already have an account?
              <a href="/login" class="font-semibold leading-6 text-grey">SignIn</a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 max-sm:hidden bg-cover bg-center relative bg-bright-red">
      <div class="absolute top-10 p-12 text-white w-full">
        <h1 class="abril-font text-7xl font-bold text-center text-pale-orange">goodpen</h1>
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

<script>
import { mapActions } from 'vuex';
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      agreeTerms: false,
      agreeNews: false
    };
  },
  methods: {
    ...mapActions('auth', ['signup']),  // Import the signup action

    async submitForm() {
      if (!this.agreeTerms) {
        toast.info("Please agree to the terms and conditions to proceed.");
        return;
      }


      if (!this.validatePassword(this.password))
        return;

      const userData = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password
      };

      try {
        const response = await this.signup(userData);  // Use Vuex action
        localStorage.setItem('token', response.token);
        this.$router.push('/');  // Redirect on successful signup
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
    },
    validatePassword(password) {
      const minLength = 8;
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (password.length < minLength) {
        toast.info(`Password must be at least ${minLength} characters long.`);
        return false;
      }
      if (!hasNumber) {
        toast.info('Password must contain at least one number.');
        return false;
      }
      if (!hasSpecialChar) {
        toast.info('Password must contain at least one special character.');
        return false;
      }
      return true;
    }
  }
}
</script>
<script setup>
import GoogleAuth from '../components/GoogleAuth.vue';
</script>
