<template>
  <div class="text-center p-10">
    <h2 class="text-3xl font-bold text-green-500">Success!</h2>
    <p class="text-lg text-gray-700 mt-4">Your membership has been successfully activated. Thank you for subscribing!</p>
    <p class="text-md text-gray-600 mt-2 break-words">Session ID: {{ sessionId }}</p>
    <div class="mt-6 max-sm:flex max-sm:flex-col max-sm:justify-between max-sm:items-center">
      <button class="bg-green-500 text-white font-bold py-2 px-4 rounded" @click="accessDashboard">Access Dashboard</button>
      <button class="bg-blue-500 text-white font-bold py-2 px-4 max-sm:mt-3 ml-3 max-sm:ml-0 rounded" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import {apis} from "@/apis";

export default {
  name: 'CheckoutSuccess',
  data() {
    const route = useRoute()
    return {
      sessionId: route.query.session_id  // This should be dynamically assigned based on user's subscription details
    }
  },
  methods: {
    accessDashboard() {
      this.$router.push('/');  // Navigate to the Dashboard (ensure this route is defined in your router)
    },
    logout() {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push('/');
      })
    }
  },
  mounted() {
    apis.checkoutSuccess({sessionId: this.sessionId})
  }
}
</script>
