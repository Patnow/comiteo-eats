<template>
    <div
        v-if="restaurant.dishes.length > 0"
        class="mt-6 w-10/12 mx-auto"
    >
        <h1 class="text-4xl font-extrabold">
            Menu
        </h1>
        <div class="ml-2">
            <template v-for="(kind, index) in plateKinds">
                <div
                    :key="index"
                    class="mt-4 mb-4 shadow-lg rounded-lg"
                >
                    <div class="flex items-center justify-between flex-wrap">
                        <p class="font-bold text-2xl mt-3 mb-3 ml-4">
                            {{ kind.label }}
                        </p>
                        <p class="font-bold text-2xl mt-3 mb-3 mr-4">
                            total
                        </p>
                    </div>
                    <template v-for="(dish, key) in menu[kind.name]">
                        <div
                            :key="key"
                            class="flex items-center justify-between flex-wrap ml-3 mt-3 mr-3 mb-3"
                        >
                            <span class="flex items-center flex-shrink-0 text-1xl mt-1 mb-2 ml-2 mr-2">{{ dish.name }}</span>
                            <div class="text-1xl mr-2 mt-1 ml-2 mb-2 w-1/5 flex items-center justify-between flex-wrap">
                                <span class="w-3/12 text-center">{{ convertCentsToRegularPrice(dish.price) }}</span>
                                <span class="w-6/12 flex flex-row-reverse space-x-4 space-x-reverse items-center">
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
                                <span class="w-3/12 text-right">{{ getTotalPerPlate(dish) }}</span>
                            </div>
                        </div>
                    </template>
                </div>
            </template>
        </div>
        <div class="flex justify-end mb-10">
            <router-link
                v-if="!isEmptyCart"
                to="/cart"
                class="mr-4"
            >
                <button
                    class="bg-yellow-500 text-white hover:bg-yellow-700 font-bold py-2 px-4 rounded"
                    @click="toCart"
                >
                    Voir mon panier
                </button>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        restaurant: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            plateKinds: [
                { name: 'starter', label: 'Entrées' },
                { name: 'main', label: 'Plats' },
                { name: 'dessert', label: 'Desserts' },
                { name: 'drink', label: 'Boissons' },
            ],
            menu: [],
            tempCart: [],
        };
    },
    computed: mapState({
        cart: (state) => state.cart,
        isEmptyCart: (state) => state.isEmptyCart,
    }),
    created() {
        const self = this;

        if (this.restaurant.dishes.length > 0) {
            this.plateKinds.forEach((kind) => {
                self.menu[kind.name] = [];
            });

            this.restaurant.dishes.forEach((dish) => {
                self.plateKinds.forEach((type) => {
                    if (dish.type === type.name) {
                        self.menu[type.name].push(dish);
                    }
                });
            });
        }

        this.tempCart = this.cart.length > 0 ? this.cart : [];
    },
    methods: {
        convertCentsToRegularPrice(priceInCents) {
            const priceInEuros = parseInt(priceInCents, 10) / 100;
            return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(priceInEuros);
        },
        decrementQuantity(dish) {
            // Since there is no ID on dishes, we need to create one using restaurant's ID, dish name
            // and dish price to built it
            const key = `${this.restaurant.id}_${dish.name}_${dish.price}`;

            if (this.tempCart.length > 0) {
                for (let i = 0; i < this.tempCart.length; i += 1) {
                    if (this.tempCart[i].id === key) {
                        if (this.tempCart[i].quantity > 0) {
                            if (parseInt(this.tempCart[i].quantity, 10) === 1) {
                                this.tempCart.splice(i, 1);
                            } else {
                                this.tempCart[i].quantity = parseInt(this.tempCart[i].quantity, 10) - 1;
                            }
                        } else {
                            this.tempCart.splice(i, 1);
                        }
                    }
                }
            }
            this.updateCart();
        },
        getQuantityForDish(dish) {
            let quantity = 0;
            const key = `${this.restaurant.id}_${dish.name}_${dish.price}`;

            if (this.tempCart.length > 0) {
                this.tempCart.forEach((item) => {
                    if (item.id === key) {
                        quantity = item.quantity;
                    }
                });
            }
            return quantity;
        },
        getTotalPerPlate(dish) {
            let price = 0;
            const quantity = this.getQuantityForDish(dish);
            price = quantity > 0 ? (quantity * dish.price) : 0;
            return this.convertCentsToRegularPrice(price);
        },
        incrementQuantity(dish) {
            // Since there is no ID on dishes, we need to create one using restaurant's ID, dish name
            // and dish price to built it
            const key = `${this.restaurant.id}_${dish.name}_${dish.price}`;

            if (this.tempCart.length > 0) {
                let found = false;

                for (let i = 0; i < this.tempCart.length; i += 1) {
                    if (this.tempCart[i].id === key) {
                        found = true;
                        this.tempCart[i].quantity += 1;
                    }
                }

                if (!found) {
                    this.tempCart.push({
                        id: `${this.restaurant.id}_${dish.name}_${dish.price}`,
                        name: dish.name,
                        price: dish.price,
                        quantity: 1,
                    });
                }
            } else {
                this.tempCart.push({
                    id: `${this.restaurant.id}_${dish.name}_${dish.price}`,
                    name: dish.name,
                    price: dish.price,
                    quantity: 1,
                });
            }

            this.updateCart();
        },
        toCart() {
            this.$router.push({ name: 'cart' });
        },
        updateCart() {
            this.$store.dispatch('updateCart', { cart: this.tempCart, cb: () => {} });
        },
    },
};
</script>
