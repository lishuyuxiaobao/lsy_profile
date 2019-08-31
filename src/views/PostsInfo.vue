<template>
  <div class="feed">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <PostFeedInfo :post="postinfo" />
          <PostFormInfo :id="postinfo._id" @update="updatePost" />
          <PostFeedInfo
            v-for="post in posts"
            :key="post.id"
            :post="post"
            :postid="postinfo._id"
            @update="updatePost"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostFormInfo from "../components/post/PostFormInfo";
import PostFeedInfo from "../components/post/PostFeedInfo";
import PostFeed from "../components/post/PostFeed";
export default {
  name: "PostsInfo",
  beforeRouteEnter(to, from, next) {
    next(vm => vm.getPosts(to.params.post));
  },
  data() {
    return {
      posts: [],
      postinfo: {}
    };
  },
  components: {
    PostFormInfo,
    PostFeedInfo,
    PostFeed
  },
  methods: {
    getPosts(post) {
      this.$axios.get(`/api/posts/${post._id}`).then(res => {
        this.postinfo = res.data;
        this.posts = res.data.comments;
        console.log(res.data);
        console.log(this.posts);
      });
    },
    updatePost() {
      this.getPosts(this.postinfo);
    }
  }
};
</script>

<style scoped>
</style>