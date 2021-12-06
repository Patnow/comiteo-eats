import axios from 'axios';

export default {
    getDeliveryMethods(payload) {
        axios.get('https://comiteo-eats.victormx.com/api/delivery_methods')
            .then((response) => {
                if (payload.cb) {
                    payload.cb(response.data);
                }
            });
    },
};
