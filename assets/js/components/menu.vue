<template>
    <div
        v-if="dishes.length > 0"
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
                    <p class="font-bold text-2xl mt-3 mb-3 ml-2">
                        {{ kind.label }}
                    </p>
                    <template v-for="(dish, key) in menu[kind.name]">
                        <div
                            :key="key"
                            class="flex items-center justify-between flex-wrap ml-3 mt-3 mr-3 mb-3"
                        >
                            <span class="flex items-center flex-shrink-0 text-1xl mt-1 mb-1 ml-2 mr-2">{{ dish.name }}</span>
                            <span class="lg:flex lg:items-center lg:w-auto text-1xl mt-1 mb-1 ml-2 mr-2">{{ convertCentsToRegularPrice(dish.price) }}</span>
                        </div>
                    </template>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        dishes: {
            type: Array,
            default() {
                return [];
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
        };
    },
    created() {
        const self = this;

        if (this.dishes.length > 0) {
            this.plateKinds.forEach((kind) => {
                self.menu[kind.name] = [];
            });

            this.dishes.forEach((dish) => {
                self.plateKinds.forEach((type) => {
                    if (dish.type === type.name) {
                        self.menu[type.name].push(dish);
                    }
                });
            });
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
