<template>
  <div>
    <div :style="getHeaderMarginBottom" class="user-header">
      <v-img :src="bgSrc" height="180px" />

      <div class="user-header-content">
        <v-avatar :size="avaterSize" class="user-header-avatar">
          <span
            v-if="iconSrc === true || iconSrc === false"
            v-text="getAvaterName"
          />
          <img v-else :src="iconSrc" :alt="getAvaterAlt" />
        </v-avatar>
      </div>
    </div>

    <div class="d-flex justify-center">
      <div class="text-center mb-4" style="max-width: 350px">
        <p v-text="name" class="mb-0" />
        <p v-text="kana" class="mb-2 text-capitalize text-small" />
        <p v-if="description" v-text="description" class="mb-1" />
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

    description: {
      type: String,
      required: false,
      default: undefined
    },

    kana: {
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
      return `margin-bottom: ${this.avaterSize * 0.7}px`
    }
  }
}
</script>

<style lang="scss" scoped>
.user-header {
  position: relative;
}

.user-header-content {
  position: absolute;
  left: 50%;
  bottom: 0;

  transform: translateY(60%) translateX(-50%);
  -webkit-transform: translateY(60%) translateX(-50%);
}

.user-header-avatar {
  border: 1px solid #777;
  background-color: lightseagreen;
  font-size: 3rem;
}

.text-small {
  font-size: 0.85rem;
}
</style>
