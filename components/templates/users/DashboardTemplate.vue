<template>
  <div>
    <user-title-text :title="$t('dashboard')" class="text-center mb-3" />

    <v-card>
      <v-card-title>{{ $t('welcome_to_the_archi_walk') }}</v-card-title>
      <v-card-text>No Message</v-card-text>
    </v-card>

    <v-row>
      <v-col cols="12" sm="6">
        <user-dashboard-intro-card />
      </v-col>

      <v-col cols="12" sm="6">
        <user-dashboard-storage-list :data="data" :user="user" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
const UserDashboardStorageList = () =>
  import('@/components/organisms/list/UserDashboardStorageList')
const UserDashboardIntroCard = () =>
  import('@/components/organisms/cards/UserDashboardIntroCard')
const UserTitleText = () => import('@/components/atoms/text/UserTitleText')

export default {
  components: {
    UserDashboardStorageList,
    UserDashboardIntroCard,
    UserTitleText
  },

  props: {
    data: {
      type: Object,
      required: true
    },

    user: {
      type: Object,
      required: true
    }
  }
}
</script>
