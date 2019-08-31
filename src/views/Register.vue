<template>
  <!-- Register -->
  <div class="register">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <h1 class="display-4 text-center">注册</h1>
          <p class="lead text-center">创建一个新的账号</p>
          <form @submit.prevent="handleSubmit" autocomplete="off" method="post">
            <TextFieldGroup
              v-model="newUser.name"
              type="name"
              placeholder="Name"
              name="name"
              :error="errors.name"
            />

            <!-- 封装组件 -->
            <!-- <div class="form-group">
              <input
                v-model="newUser.email"
                type="email"
                class="form-control form-control-lg"
                placeholder="Email Address"
                name="email"
                :class="{'is-invalid':errors.email}"
              />
              <div v-if="errors.email" class="invalid-feedback">{{errors.email}}</div>
              <small class="form-text text-muted">
                This site uses Gravatar so if you want a profile image, use a
                Gravatar email
              </small>
            </div>-->

            <TextFieldGroup
              v-model="newUser.email"
              type="email"
              placeholder="Email Address"
              name="email"
              info="This site uses Gravatar so if you want a profile image, use a
                Gravatar email"
              :error="errors.email"
            />

            <TextFieldGroup
              v-model="newUser.password"
              type="password"
              placeholder="password"
              name="password"
              :error="errors.password"
            />

            <TextFieldGroup
              v-model="newUser.password2"
              type="password"
              placeholder="Confirm Password"
              name="password2"
              :error="errors.password2"
            />

            <input type="submit" class="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { maxHeaderSize } from "http";
import TextFieldGroup from "../components/common/TextFieldGroup";
export default {
  name: "Register",
  components: {
    TextFieldGroup
  },
  data() {
    return {
      newUser: {
        name: "",
        email: "",
        password: "",
        password2: ""
      },
      errors: {}
    };
  },

  methods: {
    handleSubmit() {
      this.$axios
        .post("/api/users/register", this.newUser)
        .then(res => {
          this.errors = {};
          this.$router.push("/login"); //不可以传参
          //   this.$router.push({ name: "login" ,params:{param:"helloword"} }); //可以传参
          //   this.$router.replace("/login");
          //   this.$router.replace({ name: "login" });
          //   this.$router.go(-1)
        })
        .catch(err => {
          if (err.response.data) {
            this.errors = err.response.data;
          }
        });

      //同源策略   只要不同源就是跨域
      /** http://localhost:8080/
       * 1.请求头 http://   https://  file://
       * 2.域名 localhost  /  127.0.0.1 / www.baidu.com   /  taobao.com  ....
       * 3.端口号 :8080 / :8081 / :5000 / :5001
       *
       * http://www.baidu.com:2042
       * https://www.baidu.com:2042
       *
       *
       */
    }
  }
};
</script>

<style scoped>
</style>