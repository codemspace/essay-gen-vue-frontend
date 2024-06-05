<template>
    <div class="flex justify-center gap-10 mt-4 font-bold flex-wrap">
        <div class="border border-solid bg-white rounded-2xl py-8 px-6 border-black">
            <h2 class="text-3xl font-bold text-center">Free</h2>
            <h2 class="text-center my-5"><span class="text-5xl font-bold">$0</span> /month</h2>
            <h4 class="mb-5">Limited to 200 words/day</h4>
            <div class="flex flex-col gap-2">
              <div class="flex">
                <IconMinusCircle class="w-5 mr-2 text-black" />
                <h4>Content generation and editing</h4>
              </div>
              <div class="flex">
                <IconMinusCircle class="w-5 mr-2 text-black" />
                <h4>Bypass All AI Detectors</h4>
              </div>
              <div class="flex">
                <IconMinusCircle class="w-5 mr-2 text-black" />
                <h4>In-text Citations</h4>
              </div>
              <div class="flex">
                <IconMinusCircle class="w-5 mr-2 text-black" />
                <h4>Authentic Sources</h4>
              </div>
              <div class="flex">
                <IconMinusCircle class="w-5 mr-2 text-black" />
                <h4>Plagiarism checker</h4>
              </div>
              <div class="flex">
                <IconMinusCircle class="w-5 mr-2 text-slate-400" />
                <h4 class="text-slate-400">Upload PDF sources</h4>
              </div>
              <div class="flex">
                <IconMinusCircle class="w-5 mr-2 text-slate-400" />
                <h4 class="text-slate-400">Priority support</h4>
              </div>
            </div>

            <button class="text-white bg-bright-red border-bright-red px-5 py-2 rounded-2xl w-full mt-6">Start
                writing</button>
        </div>
      <div class="border border-solid bg-white rounded-2xl py-8 px-6 border-black">
            <h2 class="text-3xl font-bold text-center">Unlimited</h2>
            <h2 class="text-center my-4"><span class="text-5xl font-bold">$20</span> /month</h2>
            <h4 class="mb-4">Unlimited access to all features</h4>
            <div class="flex flex-col gap-2">
              <div class="flex">
                  <IconMinusCircle class="w-5 mr-2 text-black" />
                  <h4>Content generation and editing</h4>
              </div>
              <div class="flex">
                  <IconMinusCircle class="w-5 mr-2 text-black" />
                  <h4>Bypass All AI Detectors</h4>
              </div>
              <div class="flex">
                  <IconMinusCircle class="w-5 mr-2 text-black" />
                  <h4>In-text Citations</h4>
              </div>
              <div class="flex">
                  <IconMinusCircle class="w-5 mr-2 text-black" />
                  <h4>Authentic Sources</h4>
              </div>
              <div class="flex">
                  <IconMinusCircle class="w-5 mr-2 text-black" />
                  <h4>Plagiarism checker</h4>
              </div>
              <div class="flex">
                  <IconMinusCircle class="w-5 mr-2 text-black" />
                  <h4 class="text-black">Upload PDF sources</h4>
              </div>
              <div class="flex">
                  <IconMinusCircle class="w-5 mr-2 text-black" />
                  <h4 class="text-black">Priority support</h4>
              </div>

              <button class="text-white bg-bright-red border-bright-red px-5 py-2 rounded-2xl w-full mt-6">Start
                writing</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Pricing",
}
</script>
<script setup>
import IconMinusCircle from "@/components/icons/IconMinusCircle.vue";
</script>