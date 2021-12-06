import Vue from 'vue';
import Vuex from 'vuex';
// import OrderService from '../api/order';
import Restaurant from '../models/Restaurant';
import RestaurantService from '../api/restaurants';
import Order from '../models/Order';
import OrderService from '../api/order';

Vue.use(Vuex);

// initial state
const state = {
    cart: [],
    restaurant: {},
    restaurantList: [],
    order: {
        first_name: '',
        last_name: '',
        delivery_street_address: '',
        delivery_zip_code: '',
        delivery_city: '',
        delivery_method: '',
        items: [],
    },
    isEmptyCart: true,
    totalItem: 0,
    orderFilled: false,
};

// getters
const getters = {};

// actions
const actions = {
    updateCart({ commit }, payload) {
        commit('setCart', payload.cart);

        if (payload.cart.length > 0) {
            let total = 0;

            payload.cart.forEach((product) => {
                total += product.quantity;
            });

            commit('setTotalItem', total);
            commit('setIsEmptyCart', false);
        } else {
            commit('setIsEmptyCart', true);
        }

        if (payload.cb) {
            payload.cb();
        }
    },
    createOrder({ commit }) {
        OrderService.sendOrder({ order: state.order,
            cb: (response) => {
                commit('setOrder', response);
            } });
    },
    getRestaurants({ commit }, payload) {
        RestaurantService.getRestaurants({ cb: (list) => {
            commit('setRestaurantList', list);
            if (payload.cb) {
                payload.cb();
            }
        } });
    },
    initNewOrder({ commit }) {
        const newOrder = new Order({
            first_name: '',
            last_name: '',
            delivery_street_address: '',
            delivery_zip_code: '',
            delivery_city: '',
            delivery_method: 'bike',
            items: [],
        });

        commit('setOrder', newOrder);
    },
    loadRestaurant({ commit }, payload) {
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
    updateOrder({ commit }, payload) {
        const order = new Order(payload.order);
        commit('setOrder', order);
        commit('setOrderFilled', true);
    },
    updateCartOrder({ commit }, cart) {
        if (cart.length === 0) {
            state.order.items = [];
        } else {
            const items = [];
            cart.forEach((item) => {
                items.push({ id: item.id, quantity: item.quantity });
            });
            state.order.items = items;
        }
        commit('setOrder', state.order);
    },
};

// mutations
const mutations = {
    /* eslint-disable no-shadow */
    setCart(state, cart) {
        state.cart = cart;
    },
    setIsEmptyCart(state, isEmptyCart) {
        state.isEmptyCart = isEmptyCart;
    },
    setOrder(state, order) {
        state.order = order;
    },
    setOrderFilled(state, orderFilled) {
        state.orderFilled = orderFilled;
    },
    setRestaurant(state, restaurant) {
        state.restaurant = restaurant;
    },
    setRestaurantList(state, restaurantList) {
        state.restaurantList = restaurantList;
    },
    setTotalItem(state, totalItem) {
        state.totalItem = totalItem;
    },
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});
