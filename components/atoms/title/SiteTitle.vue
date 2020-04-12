<template>
  <div>
    <nuxt-link v-if="to" :to="to" class="link">
      <top-left-parenthesized-key
        :element="titleElement"
        :text="title"
        class="mb-0 site-title"
      />
    </nuxt-link>

    <a
      v-else-if="href"
      :href="href"
      class="link"
      rel="noopener"
      target="_blank"
    >
      <top-left-parenthesized-key
        :element="titleElement"
        :text="title"
        class="mb-0 site-title"
      />
    </a>

    <template v-else>
      <top-left-parenthesized-key
        :element="titleElement"
        :text="title"
        class="mb-0 site-title"
      />
    </template>
  </div>
</template>

<script>
import TopLeftParenthesizedKey from '@/components/atoms/text/TopLeftParenthesizedKey'

export default {
  components: {
    TopLeftParenthesizedKey
  },

  props: {
    href: {
      type: String,
      required: false,
      default: undefined
    },

    title: {
      type: String,
      required: true
    },

    titleElement: {
      type: String,
      required: false,
      default: 'p'
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
.site-title {
  font-size: 1.5rem;
  font-weight: normal;
  @include mq(sm) {
    font-size: 2rem;
  }
}

.link {
  color: $font-color-light-navy;
  text-decoration: none;
}
</style>
