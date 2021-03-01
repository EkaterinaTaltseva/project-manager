<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4> {{ info.bill | currencyFilter }} </h4>
    </div>
    <Loader v-if="loading" />
    <p v-else-if="!loading && !categories.length"
    >Категорий пока нет.
      <router-link to="/categories">Перейти в раздел категорий</router-link>
    </p>
    <section v-else>
      <div v-for="cat of categories" :key="cat.id"  >
        <p>
          <strong> {{ cat.title }} :</strong>
          {{ cat.spend | currencyFilter }} из {{ cat.limit | currencyFilter}}
        </p>
        <div class="progress" v-tooltip="cat.tooltip" >
          <div
              class="determinate"
              :class="[cat.progressColor]"
              :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import currencyFilter from "@/filters/currency.filter";
export default {
  name: 'planning',
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(cat => {
      const spend = records
          .filter(r => r.categoryId === cat.id)
          .filter(r => r.type === 'outcome')
          .reduce((total, record) => {
            return total += +record.amount
          }, 0)

      const persent = 100 * spend / cat.limit
      const progressPercent = persent > 100 ? 100 : persent
      const progressColor = persent < 60
          ? 'green'
          : persent < 100
              ? 'yellow'
              : 'red'

      const  tooltipValue = cat.limit - spend
      const  tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${ currencyFilter(Math.abs(tooltipValue)) }`

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }

    })

    this.loading = false
  }
}
</script>
<style scoped></style>