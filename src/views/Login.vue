<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md8>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Login Form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field 
                                prepend-icon="fas fa-envelope" 
                                name="email" 
                                label="Email" 
                                type="email"
                                v-model="email" 
                                :rules="emailRules" 
                                required
                            >
                            </v-text-field>
                            <v-text-field 
                                prepend-icon="fas fa-lock" 
                                name="password" 
                                label="Password" 
                                id="password"                                          
                                type="password"                                 
                                v-model="password" 
                                :rules="passwordRules"
                                required
                            >
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" :disabled="!valid" @click.prevent="login">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {            
            email : "",
            password : "",
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v =>
                    v.length >= 6 ||
                    'Password must be greater than 6 characters'
            ],
            valid: false,
        }
    },
    methods: {
        login: function () {
            if (this.$refs.form.validate()) {
                let user = {
                    email: this.email,
                    password: this.password
                }
                this.$store.dispatch('login', user).then(() => this.$router.push('/'))
            }
        }
    }
};
</script>

<style scoped>
</style>