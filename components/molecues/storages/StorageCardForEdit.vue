<template>
  <div class="pos-relative">
    <v-card :disabled="disabled" :to="to" :height="height" :title="title">
      <div :style="heightStyle" class="pos-relative">
        <v-img
          :src="src"
          :height="height"
          class="align-center white--text"
          gradient="rgba(0,0,0,.5), rgba(0,0,0,.5)"
        >
        </v-img>

        <div class="d-flex justify-center pos-bottom card_title">
          <v-card-title>
            {{ title }}
          </v-card-title>
        </div>
      </div>
    </v-card>

    <div class="icon">
      <v-icon
        v-text="`mdi-star`"
        @click.prevent="onClick"
        :color="color"
        :disabled="disabled"
        large
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'white'
    },

    disabled: {
      type: Boolean,
      default: false
    },

    src: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    to: {
      type: Object,
      required: true
    },

    height: {
      type: [String, Number],
      default: '200px'
    }
  },

  computed: {
    heightStyle() {
      return `height: ${this.height};`
    }
  },

  methods: {
    onClick() {
      return this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.card_title {
  background: rgba(#fff, 0.6);
  color: #333;
  width: 100%;
}

.icon {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}
</style>
