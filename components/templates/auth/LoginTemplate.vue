<template>
  <auth-wrapper>
    <auth-form :title="$t('login')">
      <v-form
        @submit.prevent="onSubmit"
        @keydown="form.onKeydown($event)"
        class="mb-4"
      >
        <!-- Email -->
        <form-email-or-name
          v-model="emailOrName"
          :dirty="formDirty"
          :errors="form.errors"
          :lazy-validation="true"
          @dirty="dirty"
          obj-key="email"
        />

        <form-password
          v-model="form.password"
          :dirty="formDirty"
          :errors="form.errors"
          :lazy-validation="true"
          @dirty="dirty"
          obj-key="password"
        />

        <div class="d-sm-flex justify-space-between">
          <v-checkbox
            v-model="remember"
            :label="$t('remember_me')"
            class="mt-0 small"
          />
        </div>

        <div class="text-center login-btn-wraaper">
          <!-- Submit Button -->
          <v-btn
            :disabled="form.busy"
            color="grey lighten-1"
            large
            type="submit"
          >
            {{ $t('login') }}
          </v-btn>
        </div>
      </v-form>

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
import { isEmail } from '@/utils/helper'
import AuthForm from '@/components/molecues/auth/AuthForm'
import AuthWrapper from '@/components/atoms/Wrapper'
import FormEmailOrName from '@/components/auth/form/FormEmailOrName'
import FormPassword from '@/components/auth/form/FormPassword'

export default {
  components: {
    AuthForm,
    AuthWrapper,
    FormEmailOrName,
    FormPassword
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

  data() {
    return {
      emailOrName: '',
      formDirty: false
    }
  },

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
    dirty() {
      this.formDirty = true
    },

    onSubmit() {
      if (isEmail(this.emailOrName)) {
        this.form.email = this.emailOrName
      } else {
        this.form.name = this.emailOrName
      }

      return this.$emit('submit')
    }
  }
}
</script>
