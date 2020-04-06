<template>
  <div class="px-4 pb-1">
    <div class="page-tab-box">
      <h3 class="page-tab-box-title">{{ title }}</h3>
      <p class="page-tab-box-content">{{ content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },

    content: {
      type: String,
      default: '　'
    }
  }
}
</script>
