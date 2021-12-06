import Vue from 'vue';
import InstantSearch from 'vue-instantsearch';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faShoppingCart, faMinus, faPlus, faArrowLeft, faTrash, faMapMarked, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { FormWizard, TabContent } from 'vue-form-wizard';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';

import '../styles.css';

library.add(faStar, faShoppingCart, faMinus, faPlus, faArrowLeft, faTrash, faMapMarked, faCartArrowDown);
Vue.component('FontAwesomeIcon', FontAwesomeIcon);

Vue.component('FormWizard', FormWizard);
Vue.component('TabContent', TabContent);

Vue.use(InstantSearch);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
