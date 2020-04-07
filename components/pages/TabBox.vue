<template>
  <div class="px-4 pb-1">
    <div class="page-tab-box">
      <h3 class="page-tab-box-title">{{ title }}</h3>

      <div>
        <template v-if="isArray(content)">
          <p
            v-for="(value, key) in content"
            :key="key"
            v-text="value"
            class="page-tab-box-content"
          />
        </template>

        <template v-else>
          <p v-text="content" class="page-tab-box-content" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { isArray } from '@/utils/array'

export default {
  props: {
    title: {
      type: String,
      required: true
    },

    content: {
      type: [String, Array],
      required: false,
      default: '　'
    }
  },

  computed: {
    isArray() {
      return (value) => isArray(value) // アロー関数
    }
  }
}
</script>
