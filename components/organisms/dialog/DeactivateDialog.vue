<template>
  <v-dialog v-model="dialog" width="300px">
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        v-text="$t('deactivate_your_account')"
        color="red"
        dark
      />
    </template>

    <v-card>
      <v-alert width="100%" type="error">
        {{ $t('are_you_sure_you_want_to_delete_your_account') }}
      </v-alert>

      <v-card-actions>
        <v-btn
          @click="dialog = false"
          v-text="$t('cancel')"
          color="primary"
          text
        />
        <v-spacer></v-spacer>
        <v-btn @click="onClick" v-text="$t('i_accept')" color="red" text />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    }
  },

  methods: {
    onClick() {
      this.dialog = false
      return this.$emit('click')
    }
  }
}
</script>

<style></style>
