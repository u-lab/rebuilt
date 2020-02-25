<template>
  <div>
    <!-- TODO 作品紹介ページ(1作品を紹介) -->
    <h1>title:{{data.title}}</h1>
    <h1>name:{{user.name}}</h1>
    <img :src="userImg" />
    <img :src="work1Img" />
    <img :src="work2Img" />
  </div>
</template>

<script>
import axios from "axios";
import work1Img from "~/assets/img/work1.jpg";
import work2Img from "~/assets/img/work2.jpg";

export default {
  async asyncData({ params }) {
    const { data } = await axios.get("pages/admin/storages/1581315433ra05d0");

    return { success: true, data: data.data, user: data.user };
  },

  data() {
    return {
      work1Img: work1Img,
      work2Img: work2Img
      //userImg: this.user.photo_url
    };
  },
  method() {}
};
</script>
