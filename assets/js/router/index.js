import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import sidebar from '../components/sidebar.vue';
import Restaurant from '../views/Restaurant.vue';
import Cart from '../views/Cart.vue';
import OrderRecap from '../views/OrderRecap.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', name: 'homepage', components: { default: Home, sidebar } },
    { path: '/restaurant/:id(\\d+)', name: 'restaurant', components: { default: Restaurant, sidebar } },
    { path: '/cart', name: 'cart', components: { default: Cart, sidebar } },
    { path: '/order_recap', name: 'recap', components: { default: OrderRecap, sidebar } },
    { path: '*', redirect: '/' },
];
const router = new VueRouter({
    mode: 'history',
    base: process.env.APP_URL,
    routes,
});
export default router;
