<template>
  <div>
    <user-title title="パスワードを変更する" />

    <v-form @submit.prevent="update" @keydown="form.onKeydown($event)">
      <alert-success :form="form" :message="$t('password_updated')" />

      <!-- Password -->
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">{{
          $t('new_password')
        }}</label>
        <div class="col-md-7">
          <input
            v-model="form.password"
            :class="{ 'is-invalid': form.errors.has('password') }"
            type="password"
            name="password"
            class="form-control"
          />
          <has-error :form="form" field="password" />
        </div>
      </div>

      <!-- Password Confirmation -->
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">{{
          $t('confirm_password')
        }}</label>
        <div class="col-md-7">
          <input
            v-model="form.password_confirmation"
            :class="{ 'is-invalid': form.errors.has('password_confirmation') }"
            type="password"
            name="password_confirmation"
            class="form-control"
          />
          <has-error :form="form" field="password_confirmation" />
        </div>
      </div>

      <!-- Submit Button -->
      <div class="form-group row">
        <div class="col-md-9 ml-md-auto">
          <v-button :loading="form.busy" type="success">
            {{ $t('update') }}
          </v-button>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
import Form from 'vform'
import UserTitle from '~/components/molecues/pages/UserTitle'
export default {
  middleware: 'auth',

  layout: 'user',

  components: {
    UserTitle
  },

  data: () => ({
    form: new Form({
      password: '',
      password_confirmation: ''
    })
  }),

  methods: {
    async update() {
      await this.form.patch('/settings/password')

      this.form.reset()
    }
  }
}
</script>

<style></style>
