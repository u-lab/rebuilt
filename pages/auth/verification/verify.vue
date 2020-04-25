<template>
  <v-row justify="center">
    <v-col md="8">
      <v-card class="pa-4">
        <v-card-title v-text="$t('verify_email')" />

        <template v-if="success">
          <v-alert type="success">
            {{ status }}
          </v-alert>

          <div class="d-flex justify-center">
            <v-btn :to="{ name: 'login' }" color="primary">
              {{ $t('login') }}
            </v-btn>
          </div>
        </template>

        <template v-else>
          <v-alert type="error">
            {{ status || $t('failed_to_verify_email') }}
          </v-alert>

          <div class="d-flex justify-center mb-2">
            <v-btn :to="{ name: 'login' }" color="primary">
              {{ $t('login') }}
            </v-btn>
          </div>

          <div class="d-flex justify-center">
            <v-btn :to="{ name: 'verification.resend' }" color="primary">
              {{ $t('resend_verification_link') }}
            </v-btn>
          </div>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'

const qs = (params) =>
  Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&')

export default {
  middleware: 'guest',

  layout: 'auth',

  metaInfo() {
    return { title: this.$t('verify_email') }
  },

  async asyncData({ params, query }) {
    try {
      const { data } = await axios.post(
        `/email/verify/${params.id}?${qs(query)}`
      )

      return { success: true, status: data.status }
    } catch (e) {
      return { success: false, status: e.response.data.status }
    }
  }
}
</script>
