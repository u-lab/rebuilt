<template>
  <v-container fluid class="mb-4">
    <div class="px-sm-10 py-4">
      <header class="d-flex justify-space-between navbar-wrapper">
        <site-title-text
          :title="title"
          :titleElement="getElement"
          :to="toTitle"
        />
      </header>
    </div>
  </v-container>
</template>

<script>
const SiteTitleText = () => import('@/components/atoms/text/SiteTitleText')

export default {
  components: {
    SiteTitleText
  },

  props: {
    isTop: {
      type: Boolean,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    toTitle: {
      type: [String, Object],
      required: false,
      default: undefined
    }
  },

  computed: {
    getElement() {
      return this.isTop ? 'h1' : 'p'
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-wrapper {
  border-bottom: 0.25rem solid $font-color-light-navy;
  position: relative;
}

.triangle {
  position: absolute;
  top: 12px;
  right: 0;

  @include mq(sm) {
    top: 30%;
    right: 1rem;
  }

  @include mq(md) {
    top: 15%;
    right: 1rem;
  }
}
</style>
