<template>
    <div id="app">
        <div
            v-if="restaurantList.length > 0"
            class="grid grid-cols-2 gap-4"
        >
            <template
                v-for="restaurant in restaurantList"
            >
                <div
                    :key="restaurant.id"
                    class="h-96"
                >
                    <div
                        class="relative rounded-lg ml-2 mt-2 mr-2 mb-2"
                    >
                        <div class="relative">
                            <img
                                :src="restaurant.cover_picture"
                                :alt="restaurant.name"
                                class="rounded-lg object-cover shadow-lg"
                            />
                            <div class="absolute w-4/5 h-40 bg-white text-black font-bold text-2xl -bottom-0.75 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg">
                                <div class="flex items-center justify-between flex-wrap ">
                                    <div class="ml-6 mt-6">
                                        <h2 class="text-4xl hover:text-gray-700 font-extrabold">
                                            <router-link :to="'/restaurant/'+restaurant.id">
                                                {{ restaurant.name }}
                                            </router-link>
                                        </h2>
                                        <h3 class="text-xl font-light">
                                            {{ restaurant.city.toUpperCase() }}
                                        </h3>
                                    </div>
                                    <div class="mr-6 mt-2">
                                        <ul>
                                            <template v-for="index in 5">
                                                <font-awesome-icon
                                                    :key="index"
                                                    icon="star"
                                                    :class="starClass(index, restaurant.ratings_average)"
                                                />
                                            </template>
                                        </ul>
                                        <span class="text-sm text-gray-300">{{ restaurant.ratings_count + (restaurant.ratings_count > 1 ? ' votes' : ' vote') }} </span>
                                    </div>
                                </div>
                                <div class="ml-6 mt-4">
                                    <button class="bg-blue-500 hover:bg-blue-700 text-base font-lg border border-blue-700 rounded px-4 py-1">
                                        {{ restaurant.category_label }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
        };
    },
    computed: mapState({
        restaurantList: (state) => state.restaurantList,
    }),
    created() {
        this.getRestaurantList();
    },
    methods: {
        getRestaurantList() {
            this.$store.dispatch('getRestaurants', { cb: () => {} });
        },
        starClass(index, rating) {
            let starClass = 'fa-sm mr-1 text-lg ';
            starClass += index <= rating ? 'text-yellow-500' : 'text-gray-500';
            return starClass;
        },
    },
};
</script>
