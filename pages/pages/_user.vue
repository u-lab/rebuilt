<template>
  <div>
    <user-header
      :bgSrc="BgExampleImg"
      :iconSrc="myIcon"
      :name="data.name"
      kana="FURIGANA"
    />
  </div>
</template>

<script>
import axios from 'axios'
import UserHeader from '@/components/pages/UserHeader'
import BgExampleImg from '@/assets/img/page_background_example.png'
import myIcon from '~/assets/img/usericon-ex.jpg'

export default {
  components: {
    UserHeader
  },

  data() {
    return {
      BgExampleImg,
      myIcon
    }
  },

  async asyncData({ params, error }) {
    try {
      const { data } = await axios.get(`pages/${params.user}`)
      return { success: true, data: data.data }
    } catch (e) {
      // return error({
      //   statusCode: e.response.data.status,
      //   message: e.response.data.message
      // })
      return { success: false, statusCode: e.response.data.status }
    }
  }
}
</script>
