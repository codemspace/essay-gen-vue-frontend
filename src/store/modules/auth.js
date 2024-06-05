import { apis } from "@/apis";

const state = () => ({
    loading: false,
    user: {}
});

const actions = {
    signup: async ({ commit }, payload) => {
        commit('startLoading');
        try {
            const result = await apis.signup(payload);
            commit('setUser', result);
            localStorage.setItem('token', result.token);
            commit('endLoading');
            return result;  // Return result for component-level handling (e.g., redirection)
        } catch (err) {
            commit('endLoading');
            throw err;  // Rethrow to allow component-level handling
        }
    },
    signin: async ({ commit }, payload) => {
        commit('startLoading');
        try {
            const result = await apis.signin(payload);
            commit('setLoggedIn', true);
            localStorage.setItem('token', result.token);
            commit('endLoading');
            return result;  // Return result for component-level handling (e.g., redirection)
        } catch (err) {
            commit('endLoading');
            throw err;  // Rethrow to allow component-level handling
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        return true;
    },
    getAuth: async ({ commit }) => {
        commit('startLoading');
        try {
            if (!localStorage.getItem('token')) {
                commit('setAuth', null);
                return false;
            }
            const result = await apis.getAuth();
            if (!result) {
                commit('setAuth', null);
            } else {
                commit('setAuth', result.data.user);
            }
            commit('endLoading');
            return result;  // Return result for component-level handling (e.g., redirection)
        } catch (err) {
            commit('endLoading');
            throw err;  // Rethrow to allow component-level handling
        }
    },
    googleAuth: async ({ commit }, payload) => {
        commit('startLoading');
        try {
            const result = await apis.googleAuth(payload);
            commit('setLoggedIn', true);
            localStorage.setItem('token', result.token);
            commit('endLoading');
            return result;  // Return result for component-level handling (e.g., redirection)
        } catch (err) {
            commit('endLoading');
            throw err;  // Rethrow to allow component-level handling
        }
    }
}

const mutations = {
    startLoading: (state) => {
        state.loading = true;
    },
    endLoading: (state) => {
        state.loading = false;
    },
    setAuth: (state, user) => {
        state.user = user;
    },
    setLoggedIn: (state, status) => {
        state.loggedIn = status;
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}