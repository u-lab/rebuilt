<template>
  <v-card>
    <v-card-title>
      {{ $t('record_your_storage') }}
      <v-icon>mdi-pencil</v-icon>
    </v-card-title>

    <v-card-text>
      <ol class="list">
        <li>自分の情報を設定しよう!</li>
        <li>作品を投稿しよう!</li>
        <li>ポートフォリオを確認しよう!</li>
      </ol>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.list {
  font-size: 1rem;
}
</style>
