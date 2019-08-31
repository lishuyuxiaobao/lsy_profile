<template>
  <!-- post display -->
  <div class="posts">
    <div class="card card-body mb-3">
      <div class="row">
        <div class="col-md-2">
          <a>
            <img
              style="width:150px"
              class="rounded-circle d-none d-md-block"
              :src="post.avatar"
              alt
            />
          </a>
          <br />
          <p class="text-center">{{post.name}}</p>
        </div>
        <div class="col-md-10">
          <p class="lead mt-5 ml-5">{{post.text}}</p>
          <p class="lead mt-5 ml-5">{{post.date}}</p>

          <!-- 删除留言 -->
          <button
            v-if="user != null && user.id == post.user "
            type="button"
            class="btn btn-danger ml-5"
            @click="handleDelete(post._id)"
          >
            <i class="fa fa-times" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostFeed",
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  props: {
    post: Object,
    postid: String
  },
  methods: {
    handleDelete(id) {
      //   console.log(id);
      this.$axios
        .delete(`/api/posts/comment/${this.postid}/${id}`)
        .then(res => {
          this.$emit("update");
        });
    }
  }
};
</script>

<style scoped>
</style>