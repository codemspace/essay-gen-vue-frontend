<template>
  <div class="relative inline-flex">
    <button
        ref="trigger"
        class="inline-flex justify-center items-center group"
        aria-haspopup="true"
        @click.prevent="dropdownOpen = !dropdownOpen"
        :aria-expanded="dropdownOpen"
    >
      <img class="w-8 h-8 rounded-full" :src="user.avatar ? user.avatar : UserAvatar" width="32" height="32" alt="User" />
    </button>
    <transition
        enter-active-class="transition ease-out duration-200 transform"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-out duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
      <div v-show="dropdownOpen" class="origin-top-right z-10 absolute top-full min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-3 right-0">
        <div class="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200 ">
          <div class="font-medium text-slate-800" v-text="`${user.firstname} ${user.lastname}`"></div>
<!--          <div class="text-xs text-slate-500 italic">Administrator</div>-->
        </div>
        <ul
            ref="dropdown"
            @focusin="dropdownOpen = true"
            @focusout="dropdownOpen = false"
        >
<!--          <li>-->
<!--            <button class="font-medium text-sm text-indigo-500 flex items-center py-1 px-3">My Documents</button>-->
<!--          </li>-->
          <li>
            <button class="font-medium text-sm text-indigo-500 flex items-center py-1 px-3" @click.stop="openBillingModal">Billing</button>
          </li>
          <li>
            <button class="font-medium text-sm text-indigo-500 flex items-center py-1 px-3" @click="logout">Sign Out</button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import UserAvatar from '/imgs/blank.png'

export default {
  name: 'DropdownProfile',
  props: ['user', 'billingModalOpen'],
  data() {
    return {
      UserAvatar: UserAvatar,
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push('/');
        window.location.reload();
      })
    },
    openBillingModal() {
      this.$emit('openBillingModal')
    }
  },
  computed: {
  },
  setup() {

    const dropdownOpen = ref(false)
    const trigger = ref(null)
    const dropdown = ref(null)

    // close on click outside
    const clickHandler = ({ target }) => {
      if (!dropdownOpen.value || dropdown.value.contains(target) || trigger.value.contains(target)) return
      dropdownOpen.value = false
    }

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen.value || keyCode !== 27) return
      dropdownOpen.value = false
    }

    onMounted(() => {
      document.addEventListener('click', clickHandler)
      document.addEventListener('keydown', keyHandler)
    })

    onUnmounted(() => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', keyHandler)
    })

    return {
      dropdownOpen,
      trigger,
      dropdown,
    }
  }
}
</script>