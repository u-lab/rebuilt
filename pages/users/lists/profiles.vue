<template>
  <div>
    <!-- TODO 全プロフィール一覧を作る -->
    <user-title title="全プロフィール一覧" />
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
