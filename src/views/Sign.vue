<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md8>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Sign Form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field 
                                prepend-icon="fas fa-font" 
                                name="title" 
                                label="Title" 
                                type="text"
                                v-model="title" 
                                :rules="titleRules" 
                                required
                            >
                            </v-text-field>
                            <v-textarea                            
                                prepend-icon="fas fa-comment-alt" 
                                v-model="message"
                                auto-grow
                                label="Message"
                                rows="5"
                                :rules="messageRules" 
                                required
                            >
                            </v-textarea>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            flat
                            @click="$refs.form.reset()"
                        >
                            Clear
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" :disabled="!valid" @click.prevent="sign">Sign</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data () {
      return {
        title : "",
        message : "",
        titleRules: [
            v => !!v || 'Title is required',
            v => v.length > 0 || 'Title must be greater than 0 characters',
            v => v.length <= 255 || 'Title must be lower than 255 characters'
        ],  
        messageRules: [
            v => !!v || 'Message is required',
            v => v.length > 0 || 'Message must be greater than 0 characters',
            v => v.length <= 255 || 'Message must be lower than 255 characters'
        ],    
      }
    },
    methods: {
        sign: function () {
            let signature = {
                title: this.title,
                message: this.message,
            }    
            axios({url: 'http://appmed-guestbook-api.herokuapp.com/api/signatures', data: signature, method: 'POST' })
            .then(() => this.$router.push('/'))
            .catch(error => console.log(error))
        }
    }
}
</script>

<style scoped>
</style>