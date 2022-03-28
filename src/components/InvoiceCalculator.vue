<template>
  <v-container fluid class="mt-12">
    <v-row class="d-flex justify-center">
      <v-col :cols="12" :lg="7" :md="8" :sm="10">
        <v-card>
          <v-card-title>
            Vue Invoice Calc
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col :cols="12" :sm="6">
                <v-text-field
                  v-model="invoice.name"
                  label="Product name"
                  dense>
                </v-text-field>
              </v-col>
              <v-col :cols="12" :sm="2">
                <v-text-field
                  v-model="invoice.price"
                  label="Price"
                  type="number"
                  dense>
                </v-text-field>
              </v-col>
              <v-col :cols="12" :sm="2">
                <v-text-field
                  v-model="invoice.qty"
                  label="Qty"
                  type="number"
                  dense>
                </v-text-field>
              </v-col>
              <v-col :cols="12" :sm="2">
                <v-btn 
                  class="white--text no-transform"
                  @click="addInvoice"
                  color="grey darken-3"
                  small
                  block
                  :disabled="!hasRequired">
                  Add
                </v-btn>
              </v-col>
            </v-row>
            <v-data-table
              class="invoice-table"
              v-model="selected"
              :headers="headers"
              :items="invoices"
              item-key="name"
              show-select
              dense
              :hide-default-footer="true"
              :hide-default-header="!invoices.length">
              <!-- eslint-disable-next-line -->
              <template #item.price="{ item }">
                {{ usFormat(item.price) }}
              </template>
              <!-- eslint-disable-next-line -->
              <template #item.sum="{ item }">
                {{ usFormat(item.sum) }}
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions v-show="invoices.length">
            <v-row class="d-flex justify-space-between">
              <v-col :cols="12" :sm="3">
                <v-btn
                  v-show="selected.length"
                  @click="deleteInvoices"
                  class="white--text no-transform"
                  color="grey darken-3"
                  small
                  block
                >
                  Delete
                </v-btn>
              </v-col>
              <v-col :cols="12" :sm="4">
                <strong class="mr-6">Total: {{ totalInvoiceSum }}</strong>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { InvoiceCalculator } from './InvoiceCalculator'
export default InvoiceCalculator
</script>

<style lang="scss">
  .v-data-table {
    &.invoice-table {
      .mdi {
        font-size: 20px;
      }
    }
  }

  .v-btn {
    &.no-transform {
      text-transform: none;
    }
  }
  
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  
  input[type=number] {
    -moz-appearance: textfield;
  }
</style>