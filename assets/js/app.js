import Vue from 'vue';
import InstantSearch from 'vue-instantsearch';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router/index';
import store from './store/index';

import '../styles.css';

library.add(faStar, faShoppingCart);
Vue.component('FontAwesomeIcon', FontAwesomeIcon);

Vue.use(InstantSearch);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
