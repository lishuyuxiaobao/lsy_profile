<template>
  <!-- post form -->
  <div class="post-form mb-3">
    <div class="card card-info">
      <div class="card-header bg-info text-white">Say Somthing...</div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <TextAreaGroup
            name="text"
            placeholder="Say Somthing..."
            v-model="text"
            :error="errors.text"
          />

          <button type="submit" class="btn btn-dark">提交</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import TextAreaGroup from "../common/TextAreaGroup";
export default {
  name: "PostForm",
  props: {
    id: String
  },
  data() {
    return {
      text: "",
      errors: {}
    };
  },
  components: {
    TextAreaGroup
  },
  methods: {
    handleSubmit() {
      //   console.log(this.text);
      const user = this.$store.getters.user;

      //准备提交的数据
      const newPost = {
        text: this.text,
        name: user.name,
        avatar: user.avatar
      };

      //添加评论 发起请求
      this.$axios
        .post(`/api/posts/comment/${this.id}`, newPost)
        .then(res => {
          console.log(res.data);
          this.errors = {};
          this.text = "";

          //事件公车
          this.$emit("update");
        })
        .catch(err => {
          if (err.response.data) {
            this.errors = err.response.data;
          }
        });
    }
  }
};
</script>

<style scoped>
</style>