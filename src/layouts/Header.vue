<template>
  <header class="duration-300 py-2 sticky top-0 z-10 bg-main">
    <Container class="relative flex items-center justify-between gap-4 text-slate-600 text-sm">
      <div class="flex items-center gap-8">
        <a href="/" class="mr-10">
          <Logo class="h-10" />
        </a>
        <nav class="items-center gap-3 hidden md:flex">
          <a
              v-for="menu in menuItems"
              v-text="menu.label"
              :href="menu.link"
              class="rounded-lg py-1.5 px-3 transition-colors duration-300 text-slate-950"
          />
        </nav>
      </div>

      <div class="flex items-center gap-8">
        <div class="flex items-center">
          <img class="w-4 h-4 rounded-full" src="/imgs/icons/en.png"  alt="Lang"/>
          <select>
            <option>EN</option>
          </select>
        </div>

        <div v-if="!user" class="flex items-center gap-4">
          <Button
              href="/login"
              class="border-secondary-600"
          >
            Log in
          </Button>

          <Button
              href="/register"
              class="border-secondary-600"
          >
            Sign up <span v-text="'for free'" class="hidden lg:inline" />
          </Button>
        </div>

        <div v-else class="flex items-center">
          <DropdownProfile :user="user" @openBillingModal="openBillingModal" />
        </div>

      </div>
    </Container>
  </header>
</template>

<script>
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  computed: {
    user() {
      console.log('user: ', this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
  },
  methods: {
    openBillingModal() {
      this.openBillingModal = true
    },
  },
  mounted() {
    this.$store.dispatch('auth/getAuth').then(res => {
      console.log('User authenticated: ', res);
    }).catch(error => {
      console.log(error.message);
      toast.error(error.message);
    });
  }
}
</script>
<script setup>
import Container from "../components/Container.vue"
import Logo from "../components/icons/Logo.vue"
import Button from "../components/Button.vue"
import { ref } from "vue"
import DropdownProfile from "@/components/DropdownProfile.vue";

const props = defineProps({
  menuItems: Array,
})
</script>