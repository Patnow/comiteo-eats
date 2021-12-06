<template>
    <div>
        <div>
            <h2 class="text-5xl font-extrabold mt-5 ml-5">
                Commande
            </h2>
        </div>
        <div
            v-if="cart.length > 0"
            class="flex justify-center"
        >
            <form-wizard
                shape="circle"
                title=""
                subtitle=""
                color="#3B82F6"
                back-button-text="Retour"
                next-button-text="Suivant"
                finish-button-text="Créer la commande"
                class="w-8/12"
                @on-complete="createOrder"
            >
                <tab-content title="Panier">
                    <div>
                        <table class="w-full">
                            <thead>
                                <tr>
                                    <th>Entrées, Plats, Désserts, Boissons</th>
                                    <th>Prix</th>
                                    <th>Quantité</th>
                                    <th>Total</th>
                                    <th>Supprimer</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(dish, index) in cart">
                                    <tr
                                        :key="dish.id"
                                        class="h-16"
                                    >
                                        <td class="object-center">
                                            {{ dish.name }}
                                        </td>
                                        <td class="object-center text-center">
                                            {{ formatPrice(dish.price) }}
                                        </td>
                                        <td class="flex justify-center">
                                            <span class="w-6/12 flex flex-row-reverse space-x-4 space-x-reverse items-center object-center text-center">
                                                <span class="bg-blue-500 text-white hover:bg-blue-700 w-8 h-8 rounded-full">
                                                    <button
                                                        class="w-full h-full"
                                                        @click="incrementQuantity(dish)"
                                                    >
                                                        <font-awesome-icon icon="plus"></font-awesome-icon>
                                                    </button>
                                                </span>
                                                <input
                                                    :value="getQuantityForDish(dish)"
                                                    disabled
                                                    type="text"
                                                    class="focus:outline-none bg-gray-100 border h-8 w-8 rounded text-sm text-center mx-2"
                                                />
                                                <span class="bg-blue-500 text-white hover:bg-blue-700 w-8 h-8 rounded-full">
                                                    <button
                                                        class="w-full h-full"
                                                        @click="decrementQuantity(dish)"
                                                    >
                                                        <font-awesome-icon icon="minus"></font-awesome-icon>
                                                    </button>
                                                </span>
                                            </span>
                                        </td>
                                        <td class="object-center text-center">
                                            {{ formatPrice(dish.price*dish.quantity) }}
                                        </td>
                                        <td class="object-center text-center">
                                            <span>
                                                <font-awesome-icon
                                                    icon="trash"
                                                    @click="suppressDish(index)"
                                                ></font-awesome-icon>
                                            </span>
                                        </td>
                                    </tr>
                                </template>
                                <tr class="h-16">
                                    <td></td>
                                    <td></td>
                                    <td class="font-extrabold text-center text-2xl text-blue-500">
                                        Sous-total
                                    </td>
                                    <td class="font-extrabold text-center text-2xl text-blue-500">
                                        {{ getTotalPrice() }}
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </tab-content>

                <tab-content
                    title="Adresse"
                    :before-change="validateContactInfos"
                >
                    <div class="w-full flex jsutify-center">
                        <div class="m-auto w-4/6 h-full flex flex-col">
                            <div class="w-4/6 m-auto">
                                <div class="w-full mt-3 mb-1">
                                    <label for="last-name">Nom : </label>
                                </div>
                                <div class="w-full mb-3">
                                    <input
                                        id="last-name"
                                        v-model="contact.last_name"
                                        type="text"
                                        class="w-full h-10 border-2 focus:outline-none focus:ring-4 focus:border-blue-500 border-gray-300 pl-4 placeholder-gray-500 placeholder-opacity-75 leading-tight"
                                        placeholder="Entrez votre nom"
                                    />
                                    <span
                                        v-if="errors.last_name != null"
                                        class="text-red-500 text-sm"
                                    >{{ errors.last_name }}</span>
                                </div>
                                <div class="w-full mt-3 mb-1">
                                    <label for="first-name">Prénom : </label>
                                </div>
                                <div class="w-full mb-3">
                                    <input
                                        id="first-name"
                                        v-model="contact.first_name"
                                        type="text"
                                        class="w-full h-10 border-2 focus:outline-none focus:ring-4 focus:border-blue-500 border-gray-300 pl-4 placeholder-gray-500 placeholder-opacity-75 leading-tight"
                                        placeholder="Entrez votre prénom"
                                    />
                                    <span
                                        v-if="errors.first_name != null"
                                        class="text-red-500 text-sm"
                                    >{{ errors.first_name }}</span>
                                </div>
                                <div class="w-full mt-3 mb-1">
                                    <label for="address">Rue : </label>
                                </div>
                                <div class="w-full mb-3">
                                    <input
                                        id="address"
                                        v-model="contact.delivery_street_address"
                                        type="text"
                                        class="w-full h-10 border-2 focus:outline-none focus:ring-4 focus:border-blue-500 border-gray-300 pl-4 placeholder-gray-500 placeholder-opacity-75 leading-tight"
                                        placeholder="Entrez votre rue (numéro et nom de la rue)"
                                    />
                                    <span
                                        v-if="errors.delivery_street_address != null"
                                        class="text-red-500 text-sm"
                                    >{{ errors.delivery_street_address }}</span>
                                </div>
                                <div class="w-full mt-3 mb-1">
                                    <label for="zipcode">Code Postal : </label>
                                </div>
                                <div class="w-full mb-3">
                                    <input
                                        id="zipcode"
                                        v-model="contact.delivery_zip_code"
                                        type="text"
                                        class="w-full h-10 border-2 focus:outline-none focus:ring-4 focus:border-blue-500 border-gray-300 pl-4 placeholder-gray-500 placeholder-opacity-75 leading-tight"
                                        placeholder="Entrez votre code postal"
                                    />
                                    <span
                                        v-if="errors.delivery_zip_code != null"
                                        class="text-red-500 text-sm"
                                    >{{ errors.delivery_zip_code }}</span>
                                </div>
                                <div class="w-full mt-3 mb-1">
                                    <label for="city">Ville : </label>
                                </div>
                                <div class="w-full mb-3">
                                    <input
                                        id="city"
                                        v-model="contact.delivery_city"
                                        type="text"
                                        class="w-full h-10 border-2 focus:outline-none focus:ring-4 focus:border-blue-500 border-gray-300 pl-4 placeholder-gray-500 placeholder-opacity-75 leading-tight"
                                        placeholder="Entrez votre ville"
                                    />
                                    <span
                                        v-if="errors.delivery_city != null"
                                        class="text-red-500 text-sm"
                                    >{{ errors.delivery_city }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </tab-content>

                <tab-content title="Livraison">
                    <div class="w-full flex jsutify-center">
                        <div class="m-auto w-4/6 h-full flex flex-col">
                            <div class="w-4/6 m-auto">
                                <div class="w-full mt-3 mb-1">
                                    <label for="delivery_methods">Méthode de livraison : </label>
                                </div>
                                <div class="w-full mb-3">
                                    <select
                                        id="delivery_methods"
                                        v-model="methodChosen"
                                        class="w-full h-10 border-2 focus:outline-none focus:ring-4 focus:border-blue-500 border-gray-300 pl-4 placeholder-gray-500 placeholder-opacity-75 leading-tight"
                                    >
                                        <template v-for="method in deliveryMethods">
                                            <option
                                                :key="method.id"
                                                :value="method"
                                            >
                                                {{ capitalizeFirstLetter(method.label) }} - {{ formatTime(method.eta) }} - {{ formatPrice(method.price) }}
                                            </option>
                                        </template>
                                    </select>
                                    <span
                                        v-if="errors.methodChosen"
                                        class="text-red-500 text-sm"
                                    >{{ errors.methodChosen }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </tab-content>
            </form-wizard>
        </div>
        <div
            v-else
            class="text-center"
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
            contact: {
                first_name: '',
                last_name: '',
                delivery_street_address: '',
                delivery_zip_code: '',
                delivery_city: '',
            },
            errors: {
                first_name: null,
                last_name: null,
                delivery_street_address: null,
                delivery_zip_code: null,
                delivery_city: null,
                methodChosen: null,
            },

            isLoadingAddress: false,
            isInvalidMethod: false,
            deliveryMethods: [],
            methodChosen: {},
        };
    },
    computed: mapState({
        order: (state) => state.order,
        cart: (state) => state.cart,
        totalItem: (state) => state.totalItem,
        orderFilled: (state) => state.orderFilled,
    }),
    created() {
        this.getDeliveryMethods();
    },
    methods: {
        buildOrder() {
            const orderData = this.contact;
            orderData.delivery_method = this.methodChosen.value;
            orderData.items = [];

            this.cart.forEach((item) => {
                orderData.items.push({ id: item.id, quantity: item.quantity });
            });
            this.$store.dispatch('updateOrder', { order: orderData });
        },
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        createOrder() {
            this.validateDeliveryMethod();

            if (!this.isInvalidMethod) {
                this.buildOrder();
                this.$router.push({
                    name: 'recap',
                });
            }
        },
        decrementQuantity(dish) {
            const key = dish.id;

            if (this.cart.length > 0) {
                for (let i = 0; i < this.cart.length; i += 1) {
                    if (this.cart[i].id === key) {
                        const cartQuantity = parseInt(this.cart[i].quantity, 10);
                        if (cartQuantity > 0) {
                            if (cartQuantity === 1) {
                                this.cart.splice(i, 1);
                            } else {
                                this.cart[i].quantity = cartQuantity - 1;
                            }
                        } else {
                            this.suppressDish(i);
                        }
                        this.updateCart();
                    }
                }
            }
            this.updateCart();
        },
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
        getDeliveryMethods() {
            const self = this;
            DeliveryService.getDeliveryMethods({ cb: (response) => {
                self.deliveryMethods = response;
                self.initOrder();
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
        getTotalPrice() {
            let totalPrice = 0;
            this.cart.forEach((item) => {
                totalPrice += (item.price * item.quantity);
            });
            return this.formatPrice(totalPrice);
        },
        incrementQuantity(dish) {
            const key = dish.id;
            let cartUpdated = false;

            if (this.cart.length > 0) {
                let found = false;

                for (let i = 0; i < this.cart.length; i += 1) {
                    if (this.cart[i].id === key) {
                        found = true;
                        this.cart[i].quantity += 1;
                        cartUpdated = true;
                    }
                }

                if (!found) {
                    this.cart.push({
                        id: `${this.restaurant.id}_${dish.name}_${dish.price}`,
                        name: dish.name,
                        price: dish.price,
                        quantity: 1,
                    });
                    cartUpdated = true;
                }

                if (cartUpdated) {
                    this.updateCart();
                }
            } else {
                this.cart.push({
                    id: `${this.restaurant.id}_${dish.name}_${dish.price}`,
                    name: dish.name,
                    price: dish.price,
                    quantity: 1,
                });
                this.$store.dispatch('updateCart', { cart: this.cart });
            }
            this.updateCart();
        },
        initOrder() {
            const self = this;
            if (this.orderFilled) {
                this.contact.last_name = this.order.last_name;
                this.contact.first_name = this.order.first_name;
                this.contact.delivery_street_address = this.order.delivery_street_address;
                this.contact.delivery_zip_code = this.order.delivery_zip_code;
                this.contact.delivery_city = this.order.delivery_city;

                this.deliveryMethods.forEach((method) => {
                    if (self.order.delivery_method === method.value) {
                        self.methodChosen = method;
                    }
                });
            } else {
                this.$store.dispatch('initNewOrder');
            }
        },
        suppressDish(index) {
            this.cart.splice(index, 1);
            this.updateCart();
        },
        updateCart() {
            this.$store.dispatch('updateCart', { cart: this.cart });
        },
        validateContactInfos() {
            const self = this;
            let isInvalidContact = false;
            const lettersRegex = /^[a-zA-Z]+$/;
            const streetRegex = /^[(\w) -\u00C0-\u00FF]+$/;
            const zipcodeRegex = /^[0-9]{5}$/;

            const infos = [
                'last_name',
                'first_name',
                'delivery_street_address',
                'delivery_zip_code',
                'delivery_city',
            ];

            for (let i = 0; i < infos.length; i += 1) {
                const info = infos[i];

                if (['', null, undefined].includes(self.contact[info])) {
                    isInvalidContact = true;
                    self.errors[info] = 'Vous devez renseigner ce champ';
                } else {
                    isInvalidContact = false;
                    self.errors[info] = null;

                    if (['last_name', 'first_name'].includes(info) && !lettersRegex.test(self.contact[info])) {
                        isInvalidContact = true;
                        self.errors[info] = 'Ce champ ne peut contenir que des lettres';
                    }

                    if (['delivery_street_address', 'delivered_city'].includes(info) && !streetRegex.test(self.contact[info])) {
                        isInvalidContact = true;
                        self.errors[info] = 'L\'adresse ne peut contenir que des chiffres et des lettres';
                    }

                    if (info === 'delivery_zip_code') {
                        const zipcode = parseInt(self.contact[info], 10);
                        if (!zipcodeRegex.test(zipcode)) {
                            isInvalidContact = true;
                            self.errors[info] = 'Le code postal ne peut être constitué que de 5 chiffres';
                        }
                    }
                }
            }

            return new Promise((resolve, reject) => {
                /* eslint-disable prefer-promise-reject-errors */
                if (isInvalidContact) {
                    reject('Il y a une ou plusieurs erreurs dans l\'adresse renseignée');
                } else {
                    resolve(true);
                }
            });
        },
        validateDeliveryMethod() {
            if (['', null, undefined].includes(this.methodChosen.value)) {
                this.isInvalidMethod = true;
                this.errors.methodChosen = 'Vous devez choisir une méthode de livraison';
            } else {
                this.isInvalidMethod = false;
                this.errors.methodChosen = null;
            }
        },
    },
};
</script>
