<template>
    <div>
        <div v-if="restaurant.hasOwnProperty('id')">
            <div class="mt-6">
                <img
                    class="w-10/12 mx-auto rounded-lg shadow-lg"
                    :src="restaurant.cover_picture"
                    :alt="restaurant.name"
                />
                <div class="mt-6 w-10/12 mx-auto">
                    <h2 class="text-5xl font-bold">
                        {{ restaurant.name }}
                    </h2>
                    <div class="mt-2">
                        <p class="text-3xl">
                            {{ restaurant.street_address.toUpperCase() }}
                        </p>
                        <p class="text-3xl">
                            {{ restaurant.zip_code }} {{ restaurant.city.toUpperCase() }}
                        </p>
                    </div>
                </div>
            </div>
            <div v-if="restaurant.dishes.length > 0">
                <plateMenu :dishes="restaurant.dishes"></plateMenu>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import plateMenu from '../components/menu.vue';

export default {
    components: {
        plateMenu,
    },
    data() {
        return {
            id: null,
        };
    },
    computed: mapState({
        restaurant: (state) => state.restaurant.restaurant,
    }),
    created() {
        if (this.$route.params.id) {
            this.$store.dispatch('restaurant/load', { id: this.$route.params.id });
        }
    },
    methods: {
        convertCentsToRegularPrice(priceInCents) {
            const priceInEuros = parseInt(priceInCents, 10) / 100;
            return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(priceInEuros);
        },
    },
};
</script>
