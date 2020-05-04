<template>
  <auth-wrapper>
    <auth-form :title="$t('login')">
      <login-form
        v-model="form"
        :value-remember="valueRemember"
        @submit="onSubmit"
        @remember="onRemember"
      />

      <div class="d-flex justify-center justify-sm-end mb-2">
        <div>
          <p>
            <nuxt-link :to="{ name: 'password.request' }" class="small">
              {{ $t('forgot_password') }}
            </nuxt-link>
          </p>

          <p>
            <nuxt-link v-text="$t('create_an_account')" to="register" />
          </p>
        </div>
      </div>
    </auth-form>
  </auth-wrapper>
</template>

<script>
const AuthForm = () => import('@/components/molecues/auth/AuthForm')
const AuthWrapper = () => import('@/components/atoms/Wrapper')
const LoginForm = () => import('@/components/organisms/form/LoginForm')

export default {
  components: {
    AuthForm,
    AuthWrapper,
    LoginForm
  },

  props: {
    value: {
      type: Object,
      required: true
    },

    valueRemember: {
      type: Boolean,
      required: true
    }
  },

  data: () => ({
    emailOrName: ''
  }),

  computed: {
    form: {
      get() {
        return this.value
      },
      set(newVal) {
        return this.$emit('input', newVal)
      }
    },

    remember: {
      get() {
        return this.value
      },
      set(newVal) {
        return this.$emit('remember', newVal)
      }
    }
  },

  methods: {
    onSubmit() {
      return this.$emit('submit')
    },

    onRemember(newVal) {
      this.remember = newVal
    }
  }
}
</script>
