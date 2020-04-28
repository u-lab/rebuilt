<template>
  <v-container class="d-flex center flex-column">
    <v-row justify="center">
      <p class="wrapper-title mb-0">Archi Walk</p>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <slot />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.wrapper-title {
  font-size: 1.5rem;
  color: #fff;

  @include mq(sm) {
    font-size: 2.75rem;
  }
}
</style>
