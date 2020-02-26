<template>
  <div>
    <!-- TODO ユーザーダッシュボード -->
    <user-title :title="$t('dashboard')" />
  </div>
</template>

<script>
import UserTitle from '~/components/user/UserTitle'

export default {
  middleware: 'auth',

  layout: 'user',

  components: {
    UserTitle
  }
}
</script>
