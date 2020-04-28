<template>
  <v-dialog v-model="dialog" width="300px">
    <v-card>
      <v-alert
        v-text="$t('are_you_sure_you_want_to_delete')"
        width="100%"
        type="error"
      />

      <v-card-actions>
        <v-btn @click="onCancel" v-text="$t('cancel')" color="primary" text />
        <v-spacer></v-spacer>
        <v-btn @click="onDelete" v-text="$t('ok')" color="red" text />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onCancel() {
      return this.$emit('cancel')
    },

    onDelete() {
      return this.$emit('delete')
    }
  }
}
</script>

<style></style>
