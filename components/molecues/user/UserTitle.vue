<template>
  <div class="user-title-container">
    <h1 class="user-title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
