<template>
  <form @submit.prevent="submit"
        class="vl-parent"
        ref="formContainer">
    <!-- your form inputs goes here-->
    <label><input type="checkbox" v-model="fullPage">Full page?</label>
    <button type="submit">Login</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      fullPage: true,
      loader: undefined
    }
  },
  methods: {
    submit() {
      this.loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });
    },
    onCancel() {
      console.log('User cancelled the loader.')
    },
  },
  mounted() {

    // simulate AJAX
    setTimeout(() => {
      this.loader.hide()
    }, 5000)
  }
}
</script>