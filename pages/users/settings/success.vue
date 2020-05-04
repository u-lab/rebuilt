<template>
  <div>
    <user-title title="パスワードの変更をしました" />
    <v-btn :to="{ name: 'users.settings.index' }" nuxt>戻る</v-btn>
  </div>
</template>

<script>
import UserTitle from '@/components/molecues/pages/UserTitle'
export default {
  components: {
    UserTitle
  },

  layout: 'user'
}
</script>
