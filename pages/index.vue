<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :items-per-page="5"
    class="elevation-1"
    :search="String(toggle_exclusive)"
    :custom-filter="filterByDate"
  >
    <template #top>
      <v-btn-toggle
        v-model="toggle_exclusive"
        class="pa-5"
        mandatory
      >
        <v-btn>
          Today
        </v-btn>
        <v-btn>
          1D
        </v-btn>
        <v-btn>
          1M
        </v-btn>
        <v-btn>
          1Y
        </v-btn>
      </v-btn-toggle>
    </template>
  </v-data-table>
</template>

<script>
import moment from 'moment'
import 'moment/locale/th'
export default {
  name: 'IndexPage',
  async asyncData ({ $axios }) {
    const ip = await $axios.$get('/finno-ex-re-v2-static-staging/recruitment-test/fund-ranking-1Y.json')
    const data = ip.data
    console.log(data)
    data.forEach((element) => {
      element.nav_date = moment(element.nav_date).locale('th').format('LL')
    })
    return { data }
  },
  data () {
    return {
      cliked: '',
      toggle_exclusive: 0,
      headers: [
        { text: 'ชื่อกองทุน', value: 'thailand_fund_code', class: 'header1' },
        { text: 'อันดับของกองทุน', value: 'nav_return', class: 'header2' },
        { text: 'เวลาที่ข้อมูลถูกอัพเดต', value: 'nav_date', class: 'header3' },
        { text: 'ผลตอบแทน', value: 'nav_return', class: 'header4' },
        { text: 'ราคา ', value: 'nav', class: 'header5' }
      ]
    }
  },
  methods: {
    filterByDate (value, search, item) {
      if (search === '0') {
        const startDate = moment().endOf('day')
        const selectDate = moment(item.nav_date, 'LL')
        const endDate = moment().startOf('day')
        return startDate >= selectDate && selectDate >= endDate
      } else if (search === '1') {
        const startDate = moment().endOf('day')
        const selectDate = moment(item.nav_date, 'LL')
        const endDate = moment().startOf('day').subtract(1, 'day')
        return startDate >= selectDate && selectDate >= endDate
      } else if (search === '2') {
        const startDate = moment().endOf('day')
        const selectDate = moment(item.nav_date, 'LL')
        const endDate = moment().startOf('day').subtract(1, 'months')
        return startDate >= selectDate && selectDate >= endDate
      } else if (search === '3') {
        const startDate = moment().endOf('day')
        const selectDate = moment(item.nav_date, 'LL')
        const endDate = moment().startOf('day').subtract(1, 'years')
        return startDate >= selectDate && selectDate >= endDate
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
