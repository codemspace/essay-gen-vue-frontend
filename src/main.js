import { createApp } from 'vue'
import Toast from "vue-toastification";
import vue3GoogleLogin from 'vue3-google-login'
import App from './App.vue'
import router from './router' // Import router from the router directory
import store from './store' // Import Vuex store
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import "vue-toastification/dist/index.css";
import './assets/main.css' // Ensure this imports TailwindCSS if it's your CSS entry point
import './assets/fonts.css'
import '@stripe/stripe-js'

const app = createApp(App);

// Use Vue Router
app.use(router);

// Use Vuex Store
app.use(store);


const options = {
    position: 'bottom-right'
};

app.use(vue3GoogleLogin, {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
})

app.use(Toast, options);
app.use(LoadingPlugin);

// Mount the application
app.mount('#app');
