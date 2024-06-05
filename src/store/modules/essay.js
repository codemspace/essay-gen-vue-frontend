const state = () => ({
    generating: false,
    essay: null,
    essayArr: []
});

const actions = {
    setEssay: async ({ commit }, payload) => {
        try {
            commit('setEssay', payload);
        } catch (err) {
            commit('setGenerating', false);
        }
    },
    setEssayArr: ({ commit }, payload) => {
        commit('setEssayArr', payload);
    },
    removeEssayById: ({ commit }, payload) => {
        commit('removeEssayById', payload)
    },
    addEssay: ({ commit }, payload) => {
        commit('insertEssayArr', {id: payload.id, title: payload.title});
    },
    formatEssay: ({ commit }) => {
        commit('setEssay', null);
    },
    startGenerate: ({commit}) => {
        commit('setGenerating', true);
    },
    stopGenerate: ({commit}) => {
        commit('setGenerating', false);
    }
};

const mutations = {
    setEssay: (state, payload) => {
        state.essay = payload;
    },
    setGenerating: (state, payload) => {
        state.generating = payload;
    },
    setEssayArr: (state, payload) => {
        state.essayArr = [...payload]
    },
    insertEssayArr: (state, payload) => {
        state.essayArr.unshift(payload)
    },
    removeEssayById: (state, payload) => {
        state.essayArr.splice(state.essayArr.findIndex(ess => ess.id === payload), 1)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
