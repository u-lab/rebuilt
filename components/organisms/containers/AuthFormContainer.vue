<template>
  <v-row class="auth-form" justify="center">
    <v-col cols="12" md="10">
      <auth-form-title-text :title="title" />

      <slot />
    </v-col>
  </v-row>
</template>

<script>
const AuthFormTitleText = () =>
  import('@/components/atoms/text/AuthFormTitleText')

export default {
  components: {
    AuthFormTitleText
  },

  props: {
    title: {
      type: String,
      default: 'Archi Walk'
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-form {
  background-color: rgba(#fff, 0.8);
  border-radius: 1rem;
}
</style>
