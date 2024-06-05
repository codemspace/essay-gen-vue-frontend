<template>
  <Header :menuItems="menuItems" />
  <main class="h-[calc(100vh-48px)] flex">
    <div class="bg-slate-50 flex-1">
      <router-view />
      <Footer :menuItems="menuItems" />
    </div>
  </main>
<!--  <ChatGPT />-->
</template>

<script setup>
import Header from "./Header.vue"
import Footer from "./Footer.vue"
import { ref } from "vue"
import ChatGPT from "@/components/ChatGPT.vue";

const menuItems = ref([
  // { label: "Generate", link: "/generate" },
  { label: "Pricing", link: "/" },
  { label: "Examples", link: "/examples" },
  { label: "Generate", link: "/generate" },
])
</script>

