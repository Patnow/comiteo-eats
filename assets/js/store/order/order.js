import OrderService from "../../api/order";

const state = {
    order: {},
};

// getters
const getters = {};

// actions
const actions = {
    load({ commit }, payload) {
        OrderService.sendOrder({ id: payload.id,
            cb:
                (response) => {} });
    },
};

// mutations
const mutations = {
    /* eslint-disable no-shadow */
    setOrder(state, order) {
        state.order = order;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
