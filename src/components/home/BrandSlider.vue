<template>
    <div class="slider-container">
        <Vue3Marquee :duration="30">
            <template v-for="img in imgArray" :key="img">
                <div class="mx-10">
                    <img :src="img" alt="brand slider" width="300"/>
                </div>
            </template>
        </Vue3Marquee>
    </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'

export default {
    components: {
        Vue3Marquee,
    },
    data() {
        return {
            imgArray: [
                '/imgs/brands/penn.png',
                '/imgs/brands/berkeley.png',
                '/imgs/brands/princeton.png',
                '/imgs/brands/stanford.png',
                '/imgs/brands/indiana.png'
            ]
        }
    }
}
</script>
<style>
/* .slider-container {
    margin: 0 auto;
    width: calc(80vw);
} */
</style>