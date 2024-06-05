<template>
  <div class="text-center p-10">
    <h2 class="text-3xl font-bold text-red-500">Checkout Canceled</h2>
    <p class="text-lg text-gray-700 mt-4">Your membership purchase has been canceled. If this was a mistake or if you need assistance, please reach out to our support team.</p>
    <div class="mt-6 max-sm:flex max-sm:flex-col max-sm:justify-between max-sm:items-center">
      <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded" @click="tryAgain">Try Again</button>
      <button class="bg-gray-500 text-white font-bold py-2 px-4 max-sm:mt-3 ml-3 max-sm:ml-0 rounded" @click="contactSupport">Contact Support</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutCancel',
  methods: {
    tryAgain() {
      this.$router.push({ name: 'Generate' });  // Assuming 'Generate' is the route where the user starts the membership purchase
    },
    contactSupport() {
      this.$router.push({ name: 'Support' });  // Navigate to the support or contact page
    }
  }
}
</script>
