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

<style lang="scss" scoped>
.page-tab-box {
  position: relative;
  padding: 0.5rem 1rem;
  margin: 2rem 0 1rem;
  border: solid 3px #ccc;
  border-radius: 5px;
}

.page-tab-box-title {
  position: absolute;
  display: inline-block;
  top: -0.75rem;
  left: 0.5rem;
  padding: 0 0.5rem;

  background: #fff;
  color: #333;

  line-height: 1;
  font-size: 1.2rem;
  font-weight: bold;
}

.page-tab-box-content {
  padding: 1rem 0.25rem 0;
  margin-bottom: 0;
}
</style>
