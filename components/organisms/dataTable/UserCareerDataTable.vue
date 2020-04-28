<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="10"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title v-text="$t('user_career')" />

        <v-spacer />

        <v-btn v-text="$t('add_new_career')" @click="onAdd" color="primary" />
      </v-toolbar>
    </template>

    <template v-slot:item.typeText="{ item }">
      {{ typeText(item.type) }}
    </template>

    <template v-slot:item.actions="{ item }">
      <v-btn
        @click="onEdit(item.lid)"
        v-text="$t('edit')"
        color="warning"
        class="mr-2"
      />
      <v-icon @click="onDelete(item.lid)" v-text="`mdi-delete`" />
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: undefined
    }
  },

  computed: {
    headers() {
      return [
        { text: this.$t('name'), value: 'name' },
        { text: '日付', value: 'formatDate' },
        { text: this.$t('category'), value: 'typeText' },
        { text: '', value: 'actions' }
      ]
    },

    typeText() {
      return (type) => (type !== null ? this.$t(this.$sanitize(type)) : null)
    }
  },

  methods: {
    onAdd() {
      return this.$emit('add')
    },

    onDelete(lid) {
      return this.$emit('delete', lid)
    },

    onEdit(lid) {
      return this.$emit('edit', lid)
    }
  }
}
</script>
