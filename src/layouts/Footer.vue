<template>
	<footer class="py-10 text-slate-500 bg-white">
		<div class="flex justify-center gap-10 flex-wrap">
			<div class="max-w-[200px] w-full">
				<h1 class="text-black text-3xl font-bold">goodpen</h1>
				<h2 class="text-black my-3">the pen is mightier than the sword</h2>
				<button class="bg-bright-red text-white rounded-full px-4 py-1">Start writing</button>
        <div class="flex items-center gap-2 my-3">
          <div class="w-8 h-8">
            <img class="w-full h-full" src="/imgs/footer/x.png" />
          </div>
          <div class="w-4 h-4">
            <img class="w-full h-full" src="/imgs/footer/tiktok.png" />
          </div>
        </div>
			</div>
			<div class="max-w-[200px] w-full">
				<h1 class="text-lg font-bold mb-2">User cases</h1>
				<ul>
					<li>Essay Writer</li>
					<li>Essay Outline Generator</li>
					<li>Plagiarism Free Essays</li>
					<li>College Essays</li>
					<li>AI Detector</li>
				</ul>
			</div>
			<div class="max-w-[150px] w-full">
				<h1 class="text-lg font-bold mb-2">Explore</h1>
				<ul>
					<li>FAQ</li>
					<li>Pricing</li>
					<li>Examples</li>
					<li>Blog</li>
					<li>Affiliate</li>
				</ul>
			</div>
			<div class="max-w-[150px] w-full">
				<h1 class="text-lg font-bold mb-2">Legal & Help</h1>
				<ul>
					<li>Terms of Service</li>
					<li>Privacy Policy </li>
					<li>Refund Policy</li>
					<li>Support</li>
				</ul>
			</div>
		</div>
	</footer>
</template>

<script setup>

const props = defineProps({
	menuItems: Array,
});
</script>
