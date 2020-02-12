<template>
  <div>
    <!-- TODO 作品情報を修正 -->
    <form @submit.prevent="update" @keydown="form.onKeydown($event)">
      <!-- title -->
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">タイトル</label>
        <div class="col-md-7">
          <input v-model="form.title" :class="{ 'is-invalid': form.errors.has('password') }" type="text" name="title" class="form-control">
          <has-error :form="form" field="form.title" />
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
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Form from 'vform'

export default {
  middleware: 'auth',

  data () {
    return {
      form: new Form({
        title: '',
        storage_id: ''
      })
    }
  },

  async asyncData ({ params, error }) {
    const { data } = await axios.get(`/users/storage/${params.storageId}`)
    return { success: true, data: data.data }
  },

  created () {
      // Fill the form with data.
      this.form.keys().forEach((key) => {
        if (this.data[key] !== null) {
          this.form[key] = this.data[key]
        }
      })
  },

  methods: {
    async update () {
      const storageId = this.form.storage_id
      console.log(storageId)

      await this.form.patch(`/users/storage/${storageId}`)
    }
  }
}
</script>
