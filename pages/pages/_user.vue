<template>
  <div>
    <!-- TODO 個人ページを作る -->
  </div>
</template>

<script>
import axios from 'axios'
import Form from 'vform'

export default {

  data () {
    return {
      form: new Form({
        data: ''
      })
    }
  },

  async asyncData ({ params, error }) {
    try {
      const { data } = await axios.get(`pages/${params.user}`)
      return { success: true, data }
    } catch (e) {
      // return error({
      //   statusCode: e.response.data.status,
      //   message: e.response.data.message
      // })
      return { success: false, statusCode: e.response.data.status }
    }
  },

  created () {
      // Fill the form with data.
      this.form.keys().forEach((key) => {
        if (this.data[key] !== null) {
          this.form[key] = this.data[key]
        }
      })
  }
}
</script>
