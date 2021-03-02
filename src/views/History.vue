<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading"/>

    <p v-else-if="!loading && !records.length"
    >Категорий пока нет.
      <router-link to="/categories">Перейти в раздел категорий</router-link>
    </p>

    <section v-else>
      <history-tab :records="items" />

      <Paginate
          v-model="page"
          :page-count="pageCount"
          :click-handler="pageChangeHandler"
          :prev-text="'Назад'"
          :next-text="'Вперед'"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTab from '@/components/HistoryTab'
export default {
  name: 'history',
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
   this.records = await this.$store.dispatch('fetchRecords')
   const categories = await this.$store.dispatch('fetchCategories')
    this.setupPagination(this.records.map(record => {
      return {
        ...record,
        categoryName: categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      }
    }))
    this.loading = false
  },
  components: {HistoryTab}
}
</script>
<style scoped></style>