<template>
  <div class="fixed right-0 bottom-40 w-80 h-2/3 flex flex-col justify-end items-end">
    <div v-if="showFlag" class="flex-1 pt-5 w-full rounded-2xl shadow-lg bg-gradient-to-b from-primary-500 via-primary-300 to-white flex flex-col">
      <div class="flex items-center justify-start px-6 -space-x-2">
        <img src="/imgs/testimonials/sheryl-berge.webp" alt="Sheryl Berge" class="w-10 aspect-square rounded-full" />
        <img src="/imgs/testimonials/leland-kiehn.webp" alt="Leland Kiehn" class="w-10 aspect-square rounded-full" />
      </div>
      <div class="flex-1 px-3 py-14">
        <div v-if="tabIndex === 1" class="tab-section">
          <h2 class="text-white text-xl font-bold pl-5 my-3">
            Hi Denzel <br>
            How can we help?
          </h2>
          <div class="w-full min-h-16 rounded-xl flex justify-between items-center py-3 px-3 bg-white">
            <p class="text-sm">Contact support <br>
              We typically reply within an hour</p>
            <button class="w-10 h-10 flex items-center justify-center text-primary-500"><IconSend /></button>
          </div>
        </div>
        <div v-else class="tab-section h-full">
          <div class="no-message h-full text-center flex flex-col justify-center items-center">
            <IconChatAlt class="w-10 h-10" />
            <h2 class="text-xl font-bold py-3">No message</h2>
            <p>Messages from the team will be shown here</p>
          </div>
        </div>
      </div>
      <div class="border-t-2 border-slate-600 flex justify-around items-center p-3">
        <button :class="`flex flex-col items-center text-sm ${tabIndex === 1 ? 'text-primary-800' : 'text-black'} `" @click="setTabIndex(1)"><IconHome class="h-5 w-5" /><p>Home</p></button>
        <button :class="`flex flex-col items-center text-sm ${tabIndex === 2 ? 'text-primary-800' : 'text-black'} `" @click="setTabIndex(2)"><IconChatAlt class="h-6 w-6" /><p>Message</p></button>
      </div>
    </div>
    <button @click="toggleShow" class="w-12 h-12 flex items-center justify-center rounded-full bg-primary-600 text-white mt-2">
      <IconChatAlt2 class="w-8 h-8" v-if="!showFlag" />
      <IconChevronDown class="w-8 h-8" v-else />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import IconChatAlt2 from "@/components/icons/IconChatAlt2.vue";
import Button from "@/components/Button.vue";
import IconChevronDown from "@/components/icons/IconChevronDown.vue";
import IconChatAlt from "@/components/icons/IconChatAlt.vue";
import IconHome from "@/components/icons/IconHome.vue";
import IconSend from "@/components/icons/IconSend.vue";

const showFlag = ref(false);
const tabIndex = ref(1);

function toggleShow() {
  showFlag.value = !showFlag.value;
}

function setTabIndex(i) {
  tabIndex.value = i;
}
</script>
