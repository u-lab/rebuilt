<template>
  <card :title="$t('home')">
    {{ $t('you_are_logged_in') }}

    <hr />

    <h2>リンク集・デバッグ用</h2>
    <ul>
      <template v-for="(item, index) in getLinkList">
        <li :key="index" style="margin: 8px; font-size: 16px;">
          <a :href="item.link"> {{ item.name }} ({{ item.link }}) </a>
        </li>
      </template>
    </ul>
  </card>
</template>

<script>
export default {
  middleware: 'auth',

  head() {
    return { title: this.$t('home') }
  },

  computed: {
    getLinkList: () => {
      return [
        { name: 'Top Page', link: '/' },
        { name: '個人ページ', link: '/pages/admin' },
        { name: '作品一覧', link: '/pages/admin/storages' },
        { name: '作品ページ', link: '/pages/admin/storages/1581315433ra05d0' },
        { name: 'プロフィール一覧', link: '/profiles' },
        { name: '作品一覧', link: '/storages' },
        { name: '自分のポートフォリオ', link: '/users/page' },
        { name: '自分のポートフォリオ(編集)', link: '/users/page/edit' },
        { name: '自分の作品一覧', link: '/users/storages' },
        { name: '新規作品追加', link: '/users/storages/create' },
        { name: '自分の作品を見る', link: '/users/storages/1581315433ra05d0' },
        {
          name: '自分の作品(編集)',
          link: '/users/storages/1581315433ra05d0/edit'
        }
      ]
    }
  }
}
</script>
