<template xmlns="http://www.w3.org/1999/html">
  <div class="bg-main">
    <Section>
      <Container class="space-y-24 sm:space-y-16">
        <div class="w-full max-w-6xl mx-auto text-center space-y-4 sm:space-y-10">
          <div class="space-y-4 sm:space-y-4">
            <!--          <SubTitle class="text-slate-600 w-full max-w-2.5xl mx-auto font-bold">-->
            <!--            YOUR WRITING ASSISTANT FOR RESEARCH-->
            <!--          </SubTitle>-->
            <Title class="lg:text-7xl font-logo font-bold">
              Undetectable AI-powered <br>
              <span class="relative">
                <!--              <IconTextDecoration />-->
                <span v-text="'Paper Writer'" class="relative text-black" />
              </span>
            </Title>
              <SubTitle class="text-slate-600 w-full max-w-2.5xl mx-auto text-2xl">
                Thinking it could even make it happen.
              </SubTitle>
          </div>
        </div>
        <form class="max-w-[700px] m-auto">
          <textarea class="w-full border-2 border-bright-red rounded-3xl h-32 py-5 px-6 text-2xl text-bright-red"
            v-model="essayTitle" placeholder="Challenges of a Professional Relationship"></textarea>
          <div class="w-full flex flex-wrap justify-between items-center gap-3 my-4">
            <button type="button" class="p-2 flex-1 min-w-[120px] rounded-full border font-black"
              @click="citation = 'MLA'"
              :class="`${citation === 'MLA' ? 'bg-bright-red text-white border-bright-red' : 'text-black bg-transparent border-black'}`">MLA</button>
            <button type="button" class="p-2 flex-1 min-w-[120px] rounded-full border font-black"
              @click="citation = 'APA'"
              :class="`${citation === 'APA' ? 'bg-bright-red text-white border-bright-red' : 'text-black bg-transparent border-black'}`">APA</button>
            <button type="button" class="p-2 flex-1 min-w-[120px] rounded-full border font-black"
              @click="citation = 'Harvard'"
              :class="`${citation === 'Harvard' ? 'bg-bright-red text-white border-bright-red' : 'text-black bg-transparent border-black'}`">Harvard</button>
            <button type="button" class="p-2 flex-1 min-w-[120px] rounded-full border font-black"
              @click="citation = 'Oxford'"
              :class="`${citation === 'Oxford' ? 'bg-bright-red text-white border-bright-red' : 'text-black bg-transparent border-black'}`">Oxford</button>
            <button type="button" class="p-2 flex-1 min-w-[120px] rounded-full border font-black"
              @click="citation = 'No Citation'"
              :class="`${citation === 'No Citation' ? 'bg-bright-red text-white border-bright-red' : 'text-black bg-transparent border-black'}`">No
              Citation</button>
          </div>
          <div class="flex justify-center mt-10 gap-2">
            <select class="text-xl bg-transparent">
              <option>500</option>
              <option selected>1000</option>
              <option>1500</option>
              <option>2000</option>
              <option>3000</option>
              <option>5000</option>
            </select>
            <label class="text-xl">words</label>
          </div>
          <div class="flex justify-center mt-5 mb-5">
            <button class="text-black flex items-center gap-2">
              <IconChevronDown class="w-4 h-4" /> View More Options
            </button>
          </div>
          <div class="flex justify-center">
            <button class="py-4 px-12 text-2xl text-white bg-bright-red rounded-full">Write My Essay</button>
          </div>
        </form>
      </Container>
    </Section>

    <Section>
      <Container class="space-y-16">
        <h1 class="text-5xl text-black font-bold font-serif text-center">Examples</h1>
        <div class="flex flex-wrap justify-center gap-8">
          <div class="min-w-[350px] rounded-2xl border shadow bg-white py-6 px-8 w-1/4">
            <div class="flex gap-2 mb-6">
              <button class="py-1 px-3 bg-bright-red text-white rounded-lg">4000 words</button>
              <button class="py-1 px-3 bg-bright-red text-white rounded-lg">MLA Citation</button>
            </div>
            <div class="flex justify-between items-center gap-5 mb-8">
              <div class="w-[300px]"><img class="w-full h-full" src="/imgs/note.png" alt="Note"></div>
              <h3 class="text-xl">Analysis of Marketing Mix Strategies for Wal-Mart Company</h3>
            </div>
            <button
              class="w-full py-2 rounded-full text-xl border border-black text-black flex justify-center items-center">View
              essay
              <IconArrowRight class="w-8 h-8 ml-2" />
            </button>
          </div>
          <div class="min-w-[350px] rounded-2xl border shadow bg-white py-6 px-8 w-1/4">
            <div class="flex gap-2 mb-6">
              <button class="py-1 px-3 bg-bright-red text-white rounded-lg">4000 words</button>
              <button class="py-1 px-3 bg-bright-red text-white rounded-lg">MLA Citation</button>
            </div>
            <div class="flex justify-between items-center gap-5 mb-8">
              <div class="w-[300px]"><img class="w-full h-full" src="/imgs/note.png" alt="Note"></div>
              <h3 class="text-xl">Analysis of Marketing Mix Strategies for Wal-Mart Company</h3>
            </div>
            <button
              class="w-full py-2 rounded-full text-xl border border-black text-black flex justify-center items-center">View
              essay
              <IconArrowRight class="w-8 h-8 ml-2" />
            </button>
          </div>
          <div class="min-w-[350px] rounded-2xl border shadow bg-white py-6 px-8 w-1/4">
            <div class="flex gap-2 mb-6">
              <button class="py-1 px-3 bg-bright-red text-white rounded-lg">4000 words</button>
              <button class="py-1 px-3 bg-bright-red text-white rounded-lg">MLA Citation</button>
            </div>
            <div class="flex justify-between items-center gap-5 mb-8">
              <div class="w-[300px]"><img class="w-full h-full" src="/imgs/note.png" alt="Note"></div>
              <h3 class="text-xl">Analysis of Marketing Mix Strategies for Wal-Mart Company</h3>
            </div>
            <button
              class="w-full py-2 rounded-full text-xl border border-black text-black flex justify-center items-center">View
              essay
              <IconArrowRight class="w-8 h-8 ml-2" />
            </button>
          </div>
        </div>
      </Container>
    </Section>

    <Section>
      <Container class="space-y-16">
        <h1 class="text-5xl text-black font-bold font-serif text-center">Trusted by the best</h1>
        <BrandSlider />
      </Container>
    </Section>

    <Section>
      <Container class="space-y-16">
        <h1 class="text-5xl text-black font-bold font-serif text-center">Frequently asked questions</h1>
        <FAQ />
      </Container>
    </Section>

    <Section>
      <Container class="y-16">
        <h1 class="text-5xl text-black font-bold font-serif text-center">Good pricing</h1>
        <h3 class="text-xl text-center mt-4 text-grey" style="color: #ABABAB;">Cancel Anytime</h3>
        <Pricing />
        <h3 class="text-center text-lg font-bold mt-5">See pricing for Semesterly & Yearly</h3>
      </Container>
    </Section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      essayTitle: "The impact of tech on the environment",
      citation: 'MLA',
      option: 'ai_detector'
    }
  }
}
</script>
<script setup>
import BrandSlider from "../components/home/BrandSlider.vue"
import FAQ from "../components/home/FAQ.vue"
import Pricing from "../components/home/Pricing.vue";
import Container from "../components/Container.vue"
import Section from "../components/Section.vue"
import Button from "../components/Button.vue"
import PricingCards from "../components/PricingCards.vue"
import IconTextDecoration2 from "../components/icons/IconTextDecoration2.vue"
import Title from "../components/Title.vue"
import { ref } from "vue"
import SubTitle from "../components/SubTitle.vue"
import IconTextDecoration from "@/components/icons/IconTextDecoration.vue";
import IconCircleCheck from "@/components/icons/IconCircleCheck.vue";
import IconSquarePlus from "@/components/icons/IconSquarePlus.vue";
import IconChevronDown from "@/components/icons/IconChevronDown.vue";
import IconArrowRight from "@/components/icons/IconArrowRight.vue";

const universities = ref([
  { name: "New York University", src: "/imgs/icons/New%20York%20University.png", class: "h-10 sm:h-12" },
  { name: "United Nation", src: "/imgs/icons/United%20Nations%20T.png", class: "h-10 sm:h-12" },
  { name: "King's College London", src: "/imgs/icons/Kings%20College.png", class: "h-10 sm:h-12" },
  { name: "University Of Toronto", src: "/imgs/icons/Toronto%20University.png", class: "h-10 sm:h-12 mr-10" }
])

const questions = [
  "How does GoodPen.ai ensure plagiarism-free content?",
  "Can I provide specific instructions or sources for my essay?",
  "How does GoodPen.ai handle in-text citations?",
  "Do you offer any multimedia integrations, like video suggestions?",
  "Is my data and information safe with GoodPen.ai?",
  "Can I use GoodPen.ai for non-academic writing?",
  "Is there a cost associated with using GoodPen.ai",
  "How does the ‘Guided Essays’ feature work?"
]
</script>
