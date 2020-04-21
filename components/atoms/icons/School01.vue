<template>
  <v-img :src="iconSrc" :height="height" :width="width" />
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
