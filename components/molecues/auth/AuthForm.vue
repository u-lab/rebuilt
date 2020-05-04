<template>
  <v-row class="auth-form" justify="center">
    <v-col cols="12" md="10">
      <auth-form-title :title="title" />

      <slot />
    </v-col>
  </v-row>
</template>

<script>
import AuthFormTitle from '@/components/atoms/auth/AuthFormTitle'

export default {
  components: {
    AuthFormTitle
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
