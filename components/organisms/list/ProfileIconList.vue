<template>
  <div>
    <h2 v-text="title" />

    <v-row justify="center">
      <v-card
        v-for="(item, key) in items"
        :key="key"
        width="150px"
        class="mr-2"
      >
        <div class="pa-2 text-center">
          <school01 height="80px" />
        </div>

        <v-card-text v-text="item.name" class="pa-2 text-center" />
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },

    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style></style>
