<template>
  <v-list dark>
    <sidebar-list-item
      v-for="item in list"
      :key="item.name"
      :title="$t(item.title)"
      :to="generateLink(item)"
    />
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
    generateLink: () => {
      return (item) => generateLink(item)
    }
  }
}
</script>
