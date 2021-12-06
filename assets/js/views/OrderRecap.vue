<template>
    <div>
        <div
            v-if="cart.length > 0"
            class="w-full h-11/12"
        >
            <div class="mr-6 mt-6 h-1/12">
                <p class="text-5xl font-extrabold">
                    Récapitulatif de la commande
                </p>
            </div>
            <div class="w-full mx-10 my-20">
                <div>
                    <p class="text-2xl">
                        Panier
                    </p>
                </div>
                <div class="w-full flex justify-center">
                    <table class="table-auto m-auto">
                        <thead>
                            <tr>
                                <th class="border-2 border-gray-700 text-1xl">
                                    Entrées, Plats, Désserts, Boissons
                                </th>
                                <th class="border-2 border-gray-700 text-1xl">
                                    Quantité x prix
                                </th>
                                <th class="border-2 border-gray-700 text-1xl">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="dish in cart">
                                <tr
                                    :key="dish.id"
                                    class="h-16 border-2 border-gray-700"
                                >
                                    <td class="object-center border-2 border-gray-700 text-1xl">
                                        {{ dish.name }}
                                    </td>
                                    <td class="object-center text-center border-2 border-gray-700 text-1xl">
                                        {{ getQuantityForDish(dish) }} x {{ formatPrice(dish.price) }}
                                    </td>
                                    <td class="object-center text-center border-2 border-gray-700 text-1xl">
                                        {{ formatPrice(dish.price*dish.quantity) }}
                                    </td>
                                </tr>
                            </template>
                            <tr class="h-16">
                                <td></td>
                                <td class="font-extrabold text-center text-1xl text-blue-500 border-2 border-gray-700">
                                    Sous-total
                                </td>
                                <td class="font-extrabold text-center text-1xl text-blue-500 border-2 border-gray-700">
                                    {{ formatPrice(getTotalCartPrice()) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="w-full mx-10 my-20">
                <div>
                    <p class="text-2xl">
                        Adresse de livraison
                    </p>
                </div>
                <div class="w-full flex justify-center">
                    <table class="table-auto m-auto">
                        <tbody>
                            <tr>
                                <td class="text-left text-2xl">
                                    {{ order.last_name }} {{ order.first_name }}
                                </td>
                            </tr>
                            <tr>
                                <td class="text-left text-2xl">
                                    {{ order.delivery_street_address }}
                                </td>
                            </tr>
                            <tr>
                                <td class="text-left text-2xl">
                                    {{ order.delivery_zip_code }} {{ order.delivery_city }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="w-full mx-10 my-20">
                <div>
                    <p class="text-2xl">
                        Méthode de livraison
                    </p>
                </div>
                <div class="w-full flex justify-center">
                    <table class="w-3/6 m-auto">
                        <thead>
                            <tr class="border-2 border-gray-700">
                                <th class="border-2 border-gray-700 text-1xl">
                                    Transport
                                </th>
                                <th class="border-2 border-gray-700 text-1xl">
                                    Délai
                                </th>
                                <th class="border-2 border-gray-700 text-1xl">
                                    Prix
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-2 border-gray-700">
                                <td class="text-center border-2 border-gray-700 text-1xl">
                                    {{ methodChosen.label }}
                                </td>
                                <td class="text-center border-2 border-gray-700 text-1xl">
                                    {{ methodChosen.eta }}
                                </td>
                                <td class="text-center border-2 border-gray-700 text-1xl">
                                    {{ formatPrice(methodChosen.price) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="w-full mx-10 my-20">
                <div>
                    <p class="text-2xl">
                        Envoyer de la commande
                    </p>
                </div>
                <div>
                    <div class="w-full flex justify-center">
                        <table class="w-3/6 m-auto">
                            <thead>
                                <tr class="border-2 border-gray-700">
                                    <th class="border-2 border-gray-700 text-1xl">
                                        Panier
                                    </th>
                                    <th class="border-2 border-gray-700 text-1xl">
                                        Livraison
                                    </th>
                                    <th class="border-2 border-gray-700 text-1xl">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-2 border-gray-700">
                                    <td class="text-center border-2 border-gray-700 text-1xl">
                                        {{ formatPrice(getTotalCartPrice()) }}
                                    </td>
                                    <td class="text-center border-2 border-gray-700 text-1xl">
                                        {{ formatPrice(methodChosen.price) }}
                                    </td>
                                    <td class="text-center text-blue-500 font-extrabold text-2xl border-2 border-gray-700">
                                        {{ formatPrice(getTotalCartPrice() + methodChosen.price) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="flex justify-evenly w-full ml-6 mt-6 mr-10 mb-10">
                <div class="w-2/12 flex justify-center">
                    <button class="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded items-center">
                        <router-link to="/cart">
                            Modifier
                        </router-link>
                    </button>
                </div>
                <div class="w-2/12 flex justify-center">
                    <button
                        class="bg-green-300 text-white hover:bg-green-500 font-bold py-2 px-4 rounded items-center"
                        @click="sendOrder"
                    >
                        Envoyer
                    </button>
                </div>
            </div>
        </div>
        <div
            v-else
            class="text-center mt-6"
        >
            <p class="text-4xl font-extrabold mb-10">
                Oups! Votre panier est vide.
            </p>
            <router-link to="/">
                <button class="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded">
                    Chercher un restaurant
                </button>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import DeliveryService from '../api/delivery';

export default {
    data() {
        return {
            methodChosen: {},
        };
    },
    computed: mapState({
        // Since there is no ID on items in a restaurant (properties available : name, price, type), we need to
        // get the cart made for the summary of order
        cart: (state) => state.cart,
        order: (state) => state.order,
    }),
    created() {
        if (this.cart.length > 0) {
            this.getDeliveryMethodChosen();
        }
    },
    methods: {
        formatPrice(price) {
            const priceToFormat = parseInt(price, 10) / 100;
            return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(priceToFormat);
        },
        formatTime(timeInMinutes) {
            let timeFormatted = '0 min';

            // Making sure that time is not null before trying to divide it
            if (timeInMinutes > 0) {
                const time = parseInt(timeInMinutes, 10);
                const hours = Math.floor(time / 60);
                const minutes = time % 60;
                timeFormatted = (hours !== 0) ? `${hours}H${minutes}` : `${minutes}min`;
            }
            return timeFormatted;
        },
        getDeliveryMethodChosen() {
            const self = this;
            DeliveryService.getDeliveryMethods({ cb: (response) => {
                response.forEach((method) => {
                    if (self.order.delivery_method === method.value) {
                        self.methodChosen = method;
                    }
                });
            } });
        },
        getQuantityForDish(dish) {
            let quantity = 0;
            const key = dish.id;

            if (this.cart.length > 0) {
                this.cart.forEach((item) => {
                    if (item.id === key) {
                        quantity = item.quantity;
                    }
                });
            }
            return quantity;
        },
        getTotalCartPrice() {
            let totalPrice = 0;
            this.cart.forEach((item) => {
                totalPrice += (item.price * item.quantity);
            });
            return totalPrice;
        },
        sendOrder() {
            this.$store.dispatch('createOrder');
        },
    },
};
</script>
