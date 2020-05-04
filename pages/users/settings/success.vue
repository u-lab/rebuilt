<template>
  <div>
    <user-title-text title="パスワードの変更をしました" />
    <v-btn :to="{ name: 'users.settings.index' }" nuxt>戻る</v-btn>
  </div>
</template>

<script>
import UserTitleText from '@/components/atoms/text/UserTitleText'
export default {
  components: {
    UserTitleText
  },

  layout: 'user'
}
</script>
