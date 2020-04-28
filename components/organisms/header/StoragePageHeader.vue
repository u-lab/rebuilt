<template>
  <v-row align="end">
    <v-col cols="12" sm="7" class="pb-0 pb-sm-3">
      <h1 v-text="title" class="main-title" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.main-title {
  font-size: 1.5rem;
  font-weight: normal;

  @include mq(sm) {
    font-size: 1.75rem;
  }
}
</style>
