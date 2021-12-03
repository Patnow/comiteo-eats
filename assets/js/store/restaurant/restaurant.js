// initial state
import Restaurant from '../../models/Restaurant';
import RestaurantService from '../../api/restaurants';

const state = {
    restaurant: {},
};

// getters
const getters = {};

// actions
const actions = {
    load({ commit }, payload) {
        RestaurantService.getRestaurantById({ id: payload.id,
            cb:
                (restaurantObject) => {
                    const restaurant = new Restaurant(restaurantObject);
                    commit('setRestaurant', restaurant);

                    if (payload.cb) {
                        payload.cb();
                    }
                } });
    },
};

// mutations
const mutations = {
    /* eslint-disable no-shadow */
    setRestaurant(state, restaurant) {
        state.restaurant = restaurant;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
