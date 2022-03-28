<template>
  <v-app>
    <InvoiceCalculator></InvoiceCalculator>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import InvoiceCalculator from './components/InvoiceCalculator.vue'

export default Vue.extend({
  name: 'App',
  components: { 
    InvoiceCalculator, 
  },
});
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0px;
  }
</style>