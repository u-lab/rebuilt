<template>
  <div>
    <!-- TODO 新規作品追加 -->
    <user-title :title="$t('storage')" />
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
