<template>
    <v-app>
        <navigation></navigation>
        <v-content>
            <v-fade-transition mode="out-in">
                <router-view></router-view>
            </v-fade-transition>
        </v-content>        
    </v-app>
</template>

<script>
import Navigation from '@/components/Navigation';
import axios from 'axios';

export default {
    name: 'App',
    components: {
        Navigation,
    },
    created: function () {
        axios.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            return Promise.reject(error);
        });
    }
};
</script>

<style>
</style>