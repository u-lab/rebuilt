<template>
  <div>
    <div style="width: 100%; height: 200px; background-color:green">
      モデルの表示
    </div>

    <v-row>
      <v-col cols="6">
        <v-img :src="getEyecatchSrc(storage.eyecatch_image)" />

        <v-row>
          <template v-if="storage.storage_sub_image !== 0">
            <v-col
              v-for="(image, key) in storage.storage_sub_image"
              :key="key"
              cols="3"
            >
              <v-img :src="getSubImageSrc(image)" />
            </v-col>
          </template>
        </v-row>
      </v-col>

      <v-col cols="6">
        <tab-box :content="storage.long_comment" title="Comment" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TabBox from '@/components/molecues/pages/TabBox'

export default {
  components: {
    TabBox
  },

  props: {
    storage: {
      type: Object,
      required: true
    }
  },

  computed: {
    getEyecatchSrc() {
      return (image) => image.url_320 || image.url_640 || image.url
    },

    getSubImageSrc() {
      return (image) => image.url_160 || image.url_320 || image.url
    }
  }
}
</script>
