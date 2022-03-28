import Vue from 'vue'
import Store, { Invoices } from '../store'

const InvoiceCalculator =  Vue.extend({
  name: 'InvoiceCalculator',
  data: () => ({
    headers: [
      { text: 'Product name', value: 'name' },
      { text: 'Price', value: 'price' },
      { text: 'Qty', value: 'qty' },
      { text: 'Sum', value: 'sum' },
    ],
  }),
  computed: {
    invoice() {
      return Store.state.invoice
    },
    invoices() {
      return Store.state.invoices
    },
    /** @param { get } selected */
    selected: {
      get: function () {
        return this.$store.state.selected
      },
      set: function (invoices) {
        this.selected.splice(0)
        this.selected.push(...invoices as Invoices)
      }
    },
    hasRequired() {
      // @ts-ignore
      return this.invoice.name && this.invoice.price && this.invoice.qty
    },
    totalInvoiceSum() {
      if (!this.invoices.length) return 0
      // @ts-ignore
      const sum = this.invoices.reduce((acc, curr) => ({ sum: acc.sum + curr.sum }))?.sum
      // @ts-ignore
      return this.usFormat(sum)
    },
  },
  methods: {
    usFormat(sum: number) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(sum)
    },
    deleteInvoices() {
      this.$store.commit('deleteInvoices', this.selected)
    },
    addInvoice() {
      this.$store.commit('addInvoice', this.invoice)
    }
  },
  watch: {
    'invoice.price': function(value) {
      if (!this.invoice.qty || !value) return
      const sum = parseInt(this.invoice.qty) * parseInt(value)

      this.$store.commit('setInvoiceSum', sum)
    },
    'invoice.qty': function(value) {
      if (!this.invoice.price || !value) return
      const sum = parseInt(this.invoice.price) * parseInt(value)

      this.$store.commit('setInvoiceSum', sum)
    },
    invoice: {
      handler: function() {
        this.$store.commit('saveToStorage')
      },
      deep: true,
    },
    invoices: {
      handler: function() {
        this.$store.commit('saveToStorage')
      },
      deep: true,
    },
  },
  mounted() {
    this.$store.commit('getFromStorage')
  },
})

export { InvoiceCalculator }