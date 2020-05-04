<template>
  <v-list dark>
    <template v-for="item in list">
      <sidebar-list-item
        v-if="!item.subtitles"
        :key="item.name"
        :title="$t(item.title)"
        :to="generateLink(item)"
      />

      <v-list-group
        v-if="item.subtitles"
        :key="item.name"
        color="white"
        sub-group
      >
        <template v-slot:activator>
          <v-list-item-title v-text="$t(item.title)" />
        </template>

        <sidebar-list-item
          v-for="subItem in item.subtitles"
          :key="subItem.name"
          :title="$t(subItem.title)"
          :to="generateLink(subItem)"
        />
      </v-list-group>
    </template>
  </v-list>
</template>

<script>
const SidebarListItem = () =>
  import('@/components/organisms/list/SidebarListItem')
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
  components: {
    SidebarListItem
  },

  props: {
    list: {
      type: Array,
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
