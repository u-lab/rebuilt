<template>
  <div class="tab-container">
    <v-tabs
      v-model="tab"
      centered
      background-color="transparent"
      slider-color="#a9ceec"
    >
      <v-tab>
        <span v-text="title1" class="text-capitalize" />
      </v-tab>
      <v-tab v-if="title2">
        <span v-text="title2" class="text-capitalize" />
      </v-tab>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <div class="tab-item-container">
            <v-container>
              <slot name="first" />
            </v-container>
          </div>
        </v-tab-item>

        <v-tab-item v-if="title2">
          <div class="tab-item-container">
            <v-container>
              <slot name="second" />
            </v-container>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
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
      default: undefined
    }
  },

  data() {
    return {
      tab: null
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-container {
  border-top: 1px solid grey;
}

.tab-item-container {
  background: $background-page-header;
}
</style>
