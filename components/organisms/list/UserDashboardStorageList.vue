<template>
  <v-card>
    <v-card-title>
      {{ $t('look_at_the_storage') }}
      <v-icon>mdi-book-open-variant</v-icon>
    </v-card-title>

    <v-list>
      <v-list-item-group>
        <user-dashboard-storage-list-item
          v-for="item in showItems(showItemNum)"
          :key="item.storage_id"
          :item="item"
          :user-name="user.name"
        />
      </v-list-item-group>

      <template v-if="showItemNum !== maxShowItmeNum">
        <v-divider />

        <v-list-item @click="showItemNum = maxShowItmeNum" link>
          <v-list-item-content>
            <v-list-item-title>もっと見る</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
const UserDashboardStorageListItem = () =>
  import('@/components/organisms/list/UserDashboardStorageListItem')

export default {
  components: {
    UserDashboardStorageListItem
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
  },

  data() {
    return {
      showItemNum: 5
    }
  },

  computed: {
    maxShowItmeNum() {
      const len = this.data.data.length

      return len < 10 ? len : 10
    },

    showItems() {
      return function(num) {
        return this.data.data.slice(0, num)
      }
    }
  },

  created() {
    this.showItemNum = this.maxShowItmeNum < 5 ? this.maxShowItmeNum : 5
  }
}
</script>
