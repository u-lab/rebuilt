<template>
  <nuxt-link :to="to" class="link">
    <div class="background-navy field px-4 py-2 d-flex align-center">
      <v-avatar size="70">
        <v-img :src="src" />
      </v-avatar>

      <div class="d-flex justify-center w-100">
        <div>
          <p v-text="name" class="mb-0 name text-center" />
          <p v-if="kana" v-text="kana" class="mb-0 kana text-center" />
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    kana: {
      type: String,
      required: false,
      default: undefined
    },

    name: {
      type: String,
      required: true
    },

    src: {
      type: String,
      required: false,
      default: '/no-image.png'
    },

    to: {
      type: [String, Object],
      required: false,
      default: undefined
    }
  }
}
</script>

<style lang="scss" scoped>
.field {
  background: #fff;
  border-radius: 10px;
}

.link {
  text-decoration: none;

  p {
    color: rgba(0, 0, 0, 0.85);
  }
}

.name {
  font-size: 1.5rem;
}

.background-navy {
  background: $background-page-header;
}
</style>
