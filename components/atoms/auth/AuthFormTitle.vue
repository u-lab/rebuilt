<template>
  <h1 class="text-center auth-form-title">
    {{ title }}
  </h1>
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
.auth-form-title {
  padding: 1rem;
}
</style>
