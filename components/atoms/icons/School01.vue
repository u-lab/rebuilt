<template>
  <v-icon v-text="`mdi-school`" :size="height" />
</template>

<script>
import Icon from '@/assets/icons/school01.png'

export default {
  props: {
    height: {
      type: [String, Number],
      default: undefined
    },

    width: {
      type: [String, Number],
      default: undefined
    }
  },

  computed: {
    iconSrc: () => Icon
  }
}
</script>
