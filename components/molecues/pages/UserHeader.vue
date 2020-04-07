<template>
  <div :style="getHeaderMarginBottom" class="pages-user-header">
    <v-img :src="bgSrc" height="180px" />

    <div class="pages-user-header-content">
      <v-avatar :size="avaterSize" class="pages-user-header-avatar">
        <span
          v-if="iconSrc === true || iconSrc === false"
          v-text="getAvaterName"
        />
        <img v-else :src="iconSrc" :alt="getAvaterAlt" />
      </v-avatar>

      <div class="text-center">
        <p v-text="name" />
        <p v-text="kana" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bgSrc: {
      type: String,
      required: true
    },

    iconSrc: {
      /* Booleanはfalseのみ */
      type: [String, Boolean],
      required: true
    },

    name: {
      type: String,
      required: true
    },

    kana: {
      type: String,
      required: true
    }
  },

  computed: {
    avaterSize() {
      return 130
    },

    getAvaterName() {
      return this.name.substr(0, 2)
    },

    getAvaterAlt() {
      return `${this.name} - Archi Walk アバターアイコン`
    },

    getHeaderMarginBottom() {
      return `margin-bottom: ${this.avaterSize}px`
    }
  }
}
</script>
