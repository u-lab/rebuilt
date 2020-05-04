<template>
  <v-list dark>
    <template v-for="item in getLinkList">
      <v-list-item
        v-if="!item.subtitles"
        :key="item.name"
        :to="generateLink(item)"
        nuxt
        link
        dark
        color="white"
      >
        <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
      </v-list-item>

      <v-list-group
        v-if="item.subtitles"
        :key="item.name"
        color="white"
        sub-group
      >
        <template v-slot:activator>
          <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
        </template>

        <v-list-item
          v-for="subItem in item.subtitles"
          :key="subItem.name"
          :to="generateLink(subItem)"
          link
          nuxt
          dark
        >
          <v-list-item-title>{{ $t(subItem.title) }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </template>
  </v-list>
</template>

<script>
const generateLink = (item) => {
  if ('name' in item) {
    if ('params' in item) {
      return { name: item.name, params: item.params }
    }

    return { name: item.name }
  }

  if ('link' in item) {
    return item.link
  }

  return null
}

export default {
  props: {
    list: {
      type: Array,
      required: true
    },

    user: {
      type: Object,
      required: true
    }
  },

  computed: {
    generateLink() {
      return (item) => generateLink(item)
    }
  }
}
</script>

<style></style>
