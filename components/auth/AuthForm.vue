<template>
  <v-row class="auth-form">
    <v-col cols="1" />

    <v-col cols="10">
      <auth-form-title title="Archi Walk" />

      <slot />
    </v-col>

    <v-col cols="1" />
  </v-row>
</template>

<script>
import AuthFormTitle from '~/components/auth/AuthFormTitle'

export default {
  components: {
    AuthFormTitle
  }
}
</script>
