import axios from 'axios';

export default {
    getRestaurants(payload) {
        axios.get('https://comiteo-eats.victormx.com/api/restaurants')
            .then((response) => {
                if (payload.cb) {
                    payload.cb(response.data.data);
                }
            });
    },
    getRestaurantById(payload) {
        axios.get(`https://comiteo-eats.victormx.com/api/restaurants/${payload.id}`)
            .then((response) => {
                if (payload.cb) {
                    payload.cb(response.data.data);
                }
            });
    },
    rateRestautant(payload) {
        axios.post(`https://comiteo-eats.victormx.com/api/restaurants/${payload.id}/ratings`, { rating: payload.rating })
            .then((response) => {
                if (payload.cb) {
                    payload.cb(response);
                }
            });
    },
};
