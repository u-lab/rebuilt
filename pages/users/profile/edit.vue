<template>
  <div>
    <!-- TODO 全プロフィール修正 -->
    <user-title title="プロフィール編集" />
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
