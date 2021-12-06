<template>
    <div>
        <nav class="flex items-center justify-between flex-wrap bg-black p-6">
            <div class="flex items-center flex-shrink-0 mr-6">
                <span class="font-semibold text-4xl tracking-tight">
                    <router-link to="/"><span class="text-white">Comiteo </span><span class="text-blue-500">Eats</span></router-link>
                </span>
            </div>
            <div class="lg:flex lg:items-center lg:w-auto">
                <div class="relative">
                    <router-link
                        :to="{ name: 'cart' }"
                        class="inline-block hover:text-blue-500 :hover:border-blue-500 text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                    >
                        <font-awesome-icon icon="shopping-cart" />
                        <span
                            v-if="totalItem > 0"
                            class="absolute left-0 top-0 rounded-full bg-red-600 w-5 h-5 top right text-white font-mono text-base leading-tight text-center font-bold"
                        >{{ totalItem }}</span>
                    </router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: mapState({
        totalItem: (state) => state.totalItem,
    }),
};
</script>
