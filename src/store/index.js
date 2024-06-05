import { createStore } from 'vuex'

import essay from './modules/essay';
import auth from './modules/auth';
import stripe from "@/store/modules/stripe";

export default createStore({
    modules: {
        essay,
        auth,
        stripe
    },
})