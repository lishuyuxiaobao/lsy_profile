<template>
  <div class="feed">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <PostForm @update="updatePost" />
          <PostFeed v-for="post in posts" :key="post.id" :post="post" @update="updatePost" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostForm from "../components/post/PostForm";
import PostFeed from "../components/post/PostFeed";
export default {
  name: "Posts",
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getPosts());
  },
  data() {
    return {
      posts: []
    };
  },
  components: {
    PostForm,
    PostFeed
  },
  methods: {
    getPosts() {
      this.$axios.get("/api/posts").then(res => {
        this.posts = res.data;
        // console.log(this.posts);
      });
    },
    updatePost() {
      this.getPosts();
    }
  }
};
</script>

<style scoped>
</style>