<template>
  <b-container :title="$t('deactivate_your_account')">
    <p>
      {{ $t('click_on_the_red_button_if_you_want_to_delete_your_account') }}
    </p>

    <deactivate-dialog @click="onClick" />
  </b-container>
</template>

<script>
const BContainer = () =>
  import('@/components/organisms/containers/UserSettingsContainer')
const DeactivateDialog = () =>
  import('@/components/organisms/dialog/DeactivateDialog')

export default {
  components: {
    BContainer,
    DeactivateDialog
  },

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  methods: {
    onClick() {
      return this.$emit('click')
    }
  }
}
</script>
