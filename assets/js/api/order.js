import axios from 'axios';

export default {
    sendOrder(payload) {
        axios.post('https://comiteo-eats.victormx.com/api/orders/', payload.ordersInfos)
            .then((response) => {
                if (payload.cb) {
                    payload.cb(response.data.data);
                }
            });
    },
};
