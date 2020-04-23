<template>
  <v-icon v-text="`mdi-trophy`" :size="height" />
</template>

<script>
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
  }
}
</script>
