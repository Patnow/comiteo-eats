import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import sidebar from '../components/sidebar.vue';
import Restaurant from '../views/Restaurant.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', name: 'homepage', components: { default: Home, sidebar } },
    { path: '/restaurant/:id(\\d+)', name: 'restaurant', components: { default: Restaurant, sidebar } },
    { path: '*', redirect: '/' },
];
const router = new VueRouter({
    mode: 'history',
    base: process.env.APP_URL,
    routes,
});
export default router;
