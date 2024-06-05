<template>
	<div class="flex flex-col justify-center items-center lg:items-stretch lg:flex-row gap-8">
		<div
			v-for="pricing in pricings"
			class="group w-full max-w-xl lg:max-w-sm p-6 sm:p-8 rounded-3xl flex flex-col gap-6 sm:gap-10 transition-all duration-300 border-2 border-slate-300 hover:border-slate-600 shadow-2xl hover:-translate-y-4"
			:class="{ 'bg-primary-700': pricing.recommended }"
		>
			<h3 v-text="pricing.price" class="font-display text-5xl" :class="{ 'text-white': pricing.recommended }" />
			<div class="space-y-2">
				<p v-text="pricing.title" class="text-lg font-display" :class="{ 'text-white': pricing.recommended }" />
				<p
					v-text="pricing.description"
					class="group-hover:text-slate-400 transition-colors duration-300"
					:class="{ 'text-slate-300': pricing.recommended }"
				/>
			</div>
			<Button
				v-text="'Get started'"
				class="text-sm w-full transition-colors bg-slate-200 hover:bg-white duration-300"
				:class="{ 'text-slate-900 bg-white group-hover:bg-slate-200': pricing.recommended }"
			/>
			<div class="flex flex-col gap-4 text-sm">
				<div
					v-for="feature in pricing.features"
					class="flex items-center gap-4 group-hover:text-slate-600 transition-colors duration-300"
					:class="{ 'text-slate-200 group-hover:text-slate-200': pricing.recommended }"
				>
					<IconCheck class="w-4" />
					<span v-text="feature" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import Button from "./Button.vue"
import IconCheck from "./icons/IconCheck.vue"
import { ref } from "vue"

const pricings = ref([
  {
    price: "$0",
    title: "Free Plan",
    description: "500 words",
    features: [
      "Up to 500 word essays",
      "Video Learning Materials",
      "In-text Citations",
      "Authentic Sources"
    ],
  },
	{
		price: "$19",
		title: "High School",
		description: "Unlimited words per month",
		features: [
			"Up to unlimited word essays",
			"Bypass All AI Detectors by\n" +
      "goodpen.ai",
			"In-text Citations",
			"Authentic Sources",
			"Citation Switcher",
			"Plagiarism checker",
			"Upload PDF sources"
		],
	},
	{
		price: "$136",
		title: "University",
		description: "Unlimited words per year",
		features: [
			"Up to unlimited word essays",
			"Bypass All AI Detectors by\n" +
      "goodpen.ai",
			"In-text Citations",
			"Authentic Sources",
			"Citation Switcher",
			"Plagiarism checker",
			"Upload PDF sources",
			"Priority support",
		],
		recommended: true,
	}
])
</script>
