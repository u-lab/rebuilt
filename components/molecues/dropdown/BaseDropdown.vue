<template>
  <v-menu :open-on-hover="openOnHover" offset-y>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" :color="color" :dark="dark" large>
        {{ title }}
        <v-icon v-text="icon" />
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(value, key) in items"
        :key="key"
        @click.prevent="selectItem(key)"
      >
        <v-list-item-title v-text="value" />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: 'grey lighten-2'
    },

    dark: {
      type: Boolean,
      required: false,
      default: false
    },

    icon: {
      type: String,
      required: false,
      default: 'mdi-chevron-down'
    },

    items: {
      type: [Array, Object],
      required: true
    },

    openOnHover: {
      type: Boolean,
      required: false,
      default: true
    },

    title: {
      type: String,
      required: true
    }
  },

  methods: {
    selectItem(newVal) {
      return this.$emit('select-dropdown', newVal)
    }
  }
}
</script>
