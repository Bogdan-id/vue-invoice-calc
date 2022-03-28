import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export class Invoice {
  name: string
  price: string
  qty: string
  sum: string

  constructor() {
    this.name = ''
    this.price = ''
    this.qty = ''
    this.sum = ''
  }
}

export type InvoiceType = typeof Invoice
export type Invoices = Array<InvoiceType>

const Store = new Vuex.Store({
  state: {
    invoice: {
      name: '',
      price: '',
      qty: '',
      sum: '',
    },
    invoices: [] as Invoices,
    selected: [] as Invoices,
  },
  mutations: {
    addInvoice(state, invoice: InvoiceType) {
      state.invoices.push(invoice)
      state.invoice = new Invoice()
    },
    deleteInvoices(state, itemsToDelete) {
      itemsToDelete = itemsToDelete.map((item: Invoice) => JSON.stringify(item))
      state.invoices = state.invoices.filter(item => !itemsToDelete.includes(JSON.stringify(item)))
      state.selected.splice(0)
    },
    setInvoiceSum(state, sum) {
      state.invoice.sum = sum
    },
    saveToStorage(state) {
      localStorage.setItem('calculator', JSON.stringify(state))
    },
    getFromStorage(state) {
      const item = localStorage.getItem('calculator')
      if (!item) return

      Object.assign(state, JSON.parse(item))
    },
  },
})

export default Store