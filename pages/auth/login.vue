<template>
  <v-container class="d-flex center flex-column">
    <v-row>
      <v-col cols="2" />

      <v-row class="auth-form">
        <v-col cols="1" />
        <v-col cols="10">
          <h1 class="text-center auth-form-title">
            Archi Walk
          </h1>

          <v-form @submit.prevent="login" @keydown="form.onKeydown($event)">
            <v-text-field
              v-model="form.email"
              :rules="rules.email"
              :counter="255"
              :label="$t('username_or_email')"
              required
            />

            <v-text-field
              v-model="form.password"
              :append-icon="field.password ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="rules.password"
              :type="field.password ? 'text' : 'password'"
              :label="$t('password')"
              required
              @click:append="field.password = !field.password"
            />

            <div class="d-flex justify-space-between">
              <v-checkbox
                v-model="remember"
                :label="$t('remember_me')"
                class="mt-0 small"
              />

              <router-link :to="{ name: 'password.request' }" class="small">
                {{ $t('forgot_password') }}
              </router-link>
            </div>

            <div class="text-center login-btn-wraaper">
              <!-- Submit Button -->
              <v-btn color="grey lighten-1" large :disabled="form.busy" type="submit">
                {{ $t('login') }}
              </v-btn>

              <!-- GitHub Login Button -->
              <login-with-github />
            </div>
          </v-form>
        </v-col>
        <v-col cols="1" />
      </v-row>
      <v-col cols="2" />
    </v-row>
  </v-container>
</template>

<script>
import Form from 'vform'

export default {
  head () {
    return { title: this.$t('login') }
  },

  layout: 'auth',

  data: () => ({
    form: new Form({
      email: '',
      password: ''
    }),
    remember: false,
    rules: {
      email: [
        v => !!v || 'Name is required'
      ],
      password: [
        v => !!v || 'Password is required',
        v => v.length >= 7 || 'Password must be more than 7 characters'
      ]
    },
    field: {
      password: false
    }
  }),

  methods: {
    async login () {
      let data

      // Submit the form.
      try {
        const response = await this.form.post('/login')
        data = response.data
      } catch (e) {
        return
      }

      // Save the token.
      this.$store.dispatch('auth/saveToken', {
        token: data.token,
        remember: this.remember
      })

      // Fetch the user.
      await this.$store.dispatch('auth/fetchUser')

      // Redirect home.
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
