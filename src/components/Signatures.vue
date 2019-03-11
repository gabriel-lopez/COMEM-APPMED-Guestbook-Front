<template>
  <div>
    <div class="text-xs-center">
      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="5"
        :dark=true
        prev-icon="fas fa-arrow-left"
        next-icon="fas fa-arrow-right"
        @input="onPageChange"        
      ></v-pagination>
    </div>
    <v-container
        fluid
        grid-list-lg
      >
      <v-layout row wrap>
        <v-flex xs12 v-for="signature in signatures" :key="signature.id">
          <v-card color="cyan darken-2" class="white--text">
            <v-layout>
              <v-flex xs12>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{ signature.title }}</div>
                    <div>{{ signature.message }}</div>
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
            <v-divider light></v-divider>
            <v-card-actions class="pa-3">  
              <div>{{ signature.created_at }}</div>    
              <v-spacer></v-spacer>              
              <v-spacer></v-spacer>              
              <a href="#" class="report-link" @click.prevent="openDialog(signature.id)">Report this signature</a>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <div class="text-xs-center">
      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="5"
        :dark=true
        prev-icon="fas fa-arrow-left"
        next-icon="fas fa-arrow-right"
        @input="onPageChange"        
      ></v-pagination>
    </div>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="590">
        <v-card>
          <v-card-title class="headline">Are you sure you want to report this signature ?</v-card-title>
          <v-card-text>This signature will be temporarily unavailable until an administrator verifies it.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat @click="closeDialog()">No</v-btn>
            <v-btn color="green darken-1" flat @click="report()">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios';
var _ = require('lodash');

export default {
    name: 'Signatures',
    data () {
      return {
        dialog: false,
        reportId: -1,
        signatures: [],
        page: 1,
        pageCount: 1,
        endpoint: 'http://appmed-guestbook-api.herokuapp.com/api/signatures?page='
      }
    },
    created() {
      this.fetch();
    },
    methods: {
      onPageChange() {
        this.fetch(this.page);
      },
      fetch(page = 1) {
        console.log('fetch');
        axios.get(this.endpoint + page)
          .then(({data}) => {
            this.signatures = data.data;
            this.pageCount = data.meta.last_page;
        });
      },
      report() {
        this.dialog = false
        console.log(this.reportId);
        axios.put('http://appmed-guestbook-api.herokuapp.com/api/signatures/'+ this.reportId +'/report')
          .then(() => this.removeSignature(this.reportId))
          .catch(error => console.log(error))
      },
      removeSignature(id) {
        this.signatures = _.remove(this.signatures, function (signature) {
          return signature.id !== id;
        });
      },
      openDialog(id) {
        this.dialog = true
        this.reportId = id
      },
      closeDialog() {
        this.dialog = false
        this.reportId = -1
      }
    },
};
</script>

<style scoped>
.report-link {
  color: inherit;
  text-decoration: inherit;
}
</style>