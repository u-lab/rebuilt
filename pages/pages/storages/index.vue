<template>
  <div>
    <!-- TODO 作品一覧を作る -->
    <h1>こんにちは</h1>
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    const { data } = await axios.get("pages/admin/storages");

    return { success: true, data: data.data, user: data.user };
  }
};
</script>
