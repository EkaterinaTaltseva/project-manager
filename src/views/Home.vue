<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <loader v-if="loading" />
    <div class="row" v-else >
      <home-bill  :rates="currency.rates" />
      <home-currency/>
    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill";
import HomeCurrency from "@/components/HomeCurrency";
export default {
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    console.log(this.currency)
    this.loading = false
  },
  components: {
    HomeBill,
    HomeCurrency
  }
}
</script>
