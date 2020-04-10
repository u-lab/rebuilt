<template>
  <div>
    <v-tabs v-model="tab" dark grow slider-color="white">
      <v-tab v-text="title1" />
      <v-tab v-text="title2" />
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <slot name="first" />
      </v-tab-item>

      <v-tab-item>
        <slot name="second" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  props: {
    title1: {
      type: String,
      required: true
    },

    title2: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      tab: null
    }
  }
}
</script>
