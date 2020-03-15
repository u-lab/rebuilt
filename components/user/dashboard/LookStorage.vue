<template>
  <v-card>
    <v-card-title>
      {{ $t('look_at_the_storage') }}
      <v-icon>mdi-book-open-variant</v-icon>
    </v-card-title>

    <v-list dense>
      <v-list-item-group>
        <v-list-item
          v-for="item in showItems(showItemNum)"
          :key="item.storage_id"
          :to="{
            name: 'users.storages.show',
            params: { storageId: item.storage_id }
          }"
          link
          nuxt
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-avatar
            v-if="
              item.eyecatch_image &&
                item.eyecatch_image.hasOwnProperty('url_160')
            "
          >
            <v-img
              v-if="item.eyecatch_image.url_160"
              :src="item.eyecatch_image.url_160"
            ></v-img>
            <v-img v-else :src="item.eyecatch_image.url"></v-img>
          </v-list-item-avatar>
        </v-list-item>
      </v-list-item-group>

      <template v-if="showItemNum !== maxShowItmeNum">
        <v-divider></v-divider>

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
export default {
  props: {
    data: {
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
