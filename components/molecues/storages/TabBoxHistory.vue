<template>
  <div>
    <tab-box :content="getCareer" title="History" />
  </div>
</template>

<script>
import TabBox from '@/components/molecues/pages/TabBox'

const formatDate = (date) => {
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()
  return year + '年' + month + '月' + day + '日'
}

export default {
  components: {
    TabBox
  },

  props: {
    career: {
      type: Array,
      required: true
    }
  },

  computed: {
    convertToString() {
      return (obj) => `${formatDate(obj.date)} ${obj.name}`
    },

    convertToArray() {
      return (careers) => {
        const retArr = []

        for (const career of careers) {
          retArr.push(this.convertToString(career))
        }
        return retArr
      }
    },

    getCareer() {
      const career = this.career
      return this.convertToArray(career)
    }
  }
}
</script>
