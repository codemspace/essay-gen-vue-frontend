<template>
    <div class="flex flex-col items-center">
        <div @click="toggleAnswer(faq)" v-for="(faq, index) in faqs" :key="index"
            class="max-w-[1000px] w-full border-solid border bg-white rounded-2xl border-black my-2 py-5 px-8">
            <div class="flex justify-between items-center">
                <h3 class="font-bold text-2xl">{{ faq.question }}</h3>
                <button class="transform" :class="{ 'rotate-180': faq.showAnswer }" :aria-expanded="faq.showAnswer">
                    <svg class="w-12 h-12 fill-current" viewBox="0 0 32 32">
                        <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
                    </svg>
                </button>
            </div>
            <div v-if="faq.showAnswer" class="p-2 leading-normal">
                <p class="text-xl">{{ faq.answer }}</p>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "FAQ",
    data() {
        return {
            faqs: [
                { 
                    question: 'How does Goodpen guarantee plagiarism-free content?', 
                    answer: 'Our sophisticated plagiarism checker ensures your writing is original and free from unintentional plagiarism, making your writing process smoother and more efficient.', 
                    showAnswer: false 
                },
                { 
                    question: 'Does Goodpen use GPT-4?', 
                    answer: 'Yes, we utilize the latest AI models, with some features leveraging the advanced capabilities of GPT-4.', 
                    showAnswer: false 
                },
                { 
                    question: 'Is goodpen multilingual?', 
                    answer: 'Yes, you can generate text in your preferred language and use our translation feature to switch between languages.', 
                    showAnswer: false 
                },
                { 
                    question: 'What are citations?', 
                    answer: 'Citations indicate the source of a specific piece of text. In a research paper or essay, they show readers where a statement originates. Goodpen automatically generates citations for you as you write.', 
                    showAnswer: false 
                },
                { 
                    question: 'Is my privacy and data secure on Goodpen?', 
                    answer: 'Yes, indeed! We prioritize user privacy and implement stringent data protection measures. With state-of-the-art encryption and compliance with international data protection standards, your essays and information are secure with us.', 
                    showAnswer: false 
                },
            ]
        };
    },
    methods: {
        toggleAnswer(faq) {
            faq.showAnswer = !faq.showAnswer;
        }
    }
};
</script>