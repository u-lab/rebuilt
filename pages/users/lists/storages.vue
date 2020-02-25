<template>
  <div>
    <!-- TODO 全作品一覧を作る -->
    <user-title title="全作品一覧" />
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
