<template>
    <v-toolbar app dark>
        <router-link to="/" class="toolbar-title">
            <v-toolbar-title class="headline text-uppercase">
                <span>APPMED</span>
                <span class="font-weight-light">Guestbook</span>
            </v-toolbar-title>
        </router-link>      
        <v-btn to="/sign" flat>
            SIGN            
        </v-btn>  
        <v-spacer></v-spacer>
        <div v-if="!isLoggedIn">
            <v-btn to="/login" flat>
                LOGIN            
            </v-btn>
            <v-btn to="/register" color="white lighten-3" class="black--text">
                REGISTER            
            </v-btn>
        </div>
        <v-btn v-else outline color="white" @click="logout">Logout</v-btn>
    </v-toolbar>
</template>

<script>
export default {
    name: 'Navigation',
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        }
    },
    methods: {
        logout: function () {
            this.$store.dispatch('logout').then(() => { this.$router.push('/') })
      }
    }
};
</script>

<style scoped>
.toolbar-title {
  color: inherit;
  text-decoration: inherit;
}
</style>