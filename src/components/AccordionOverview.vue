<template>
  <div class="w-full text-sm border border-slate-300 rounded-xl mb-2 hover:cursor-pointer" @click.prevent="tryThis">
    <div class="flex justify-between items-center">
      <div class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div class="text-left text-lg">{{truncateText(item.section_title)}}</div>
      </div>
      <div class="flex items-center">
        <button class="text-slate-400 transform" :class="{ 'rotate-180': selectedId === id }" :aria-expanded="selectedId === id" :aria-controls="`description-${id}`">
          <span class="sr-only">Menu</span>
          <svg class="w-12 h-12 fill-current" viewBox="0 0 32 32">
            <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
          </svg>
        </button>
      </div>
    </div>
    <transition
        name="slide"
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @leave="leave">
      <div v-show="selectedId === id" :id="`description-${id}`" role="region">
        <div class="first:pl-5 last:pr-5 py-3">
            <div class="mb-3 -mt-3 p-3">
              <div class="font-medium text-slate-800 mb-2">Key Insights</div>
              <template v-for="content in item.summarize_content.trim().split('.')">
                <p v-if="content.trim().length > 0" class="pl-3 pb-1">- {{content}}</p>
              </template>
            </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AccordionOverview',
  props: ['item', 'id', 'selectedId'],
  setup() {
    function beforeEnter(el) {
      el.style.height = '0';
      el.style.overflow = 'hidden';
    }

    function enter(el, done) {
      el.style.transition = 'height 0.3s ease';
      el.style.height = `${el.scrollHeight}px`;
      el.addEventListener('transitionend', done);
    }

    function beforeLeave(el) {
      el.style.height = `${el.scrollHeight}px`;
    }

    function leave(el, done) {
      el.style.transition = 'height 0.3s ease';
      el.style.height = '0';
      el.addEventListener('transitionend', done);
    }

    return {
      beforeEnter,
      enter,
      beforeLeave,
      leave
    };
  },
  methods: {
    truncateText(text) {
      if (text.length > 40) {
        return text.substring(0, 40) + '...';
      }
      return text;
    },
    tryThis() {
      this.$emit('selectOne', this.id)
      window.location.hash = ("#section" + this.id)
    }
  }
}
</script>