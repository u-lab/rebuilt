<template>
  <div>
    <!-- TODO 自分の作品を見る -->
    <user-title :title="$t('mywork')" class="text-center" />
    <v-container>
      <v-row>
        <v-col cols="4">
          <storage-card-for-create
            :to="{
              name: 'users.storages.create'
            }"
          />
        </v-col>

        <v-col v-for="(items, key) in data.data" :key="key" cols="4">
          <storage-card-for-edit
            :to="{
              name: 'users.storages.edit',
              params: { storageId: items.storage_id }
            }"
            :title="items.title"
            :src="items.eyecatch_image.url"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import UserTitle from '~/components/molecues/pages/UserTitle'
import StorageCardForEdit from '@/components/molecues/storages/StorageCardForEdit'
import StorageCardForCreate from '@/components/molecues/storages/StorageCardForCreate'

export default {
  middleware: 'auth',

  components: {
    UserTitle,
    StorageCardForCreate,
    StorageCardForEdit
  },

  computed: {
    user() {
      return this.$store.getters['auth/user']
    },

    cardHeight() {
      return '200px'
    },

    cardHeightStyle() {
      return `height: ${this.cardHeight};`
    }
  },

  async asyncData({ params, error }) {
    const { data } = await axios.get('users/storage')
    return { success: true, data }
  }
}
</script>
