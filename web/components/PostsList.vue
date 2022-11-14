<template>
  <v-row justify="center" align="center">
    <v-card v-for="(post, i) in posts" :key="i" class="ma-3" max-width="344">
      <v-img
        :src="post.mediaUrl"
        height="200px"
      ></v-img>

      <v-card-title> {{post.charityName}} </v-card-title>

      <v-card-subtitle> {{post.userName}} </v-card-subtitle>
      <v-card-text class="text--primary px-4 py-2"> {{post.description}} </v-card-text>

      <div class="px-4 py-2 ma-0 font-weight-medium">Funds needed: {{post.funds}}$ </div>
    </v-card>
  </v-row>
</template>
<script>
export default {
  data() {
      return {
          posts: []
      }
  },
  methods: {
      async loadPosts() {
          try {
        await this.$axios.get("api/posts").then((response) => {
          this.posts = response.data
        });
      } catch (err) {
        console.log(err)
      }
      }
  },
  created() {
      this.loadPosts()
  }
};
</script>

<style lang="scss">
.v-card__title {
    word-break: break-word;
    height: 100px;
}
.v-card__text {
    height:200px;
    overflow: hidden;
    overflow-y: scroll;
}
</style>
