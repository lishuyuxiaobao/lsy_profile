<template>
  <!-- 个人信息 -->
  <div class="create-profile">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <a @click.prevent="$router.go(-1)" class="btn btn-light">返回</a>
          <h1 class="display-4 text-center">创建个人信息</h1>
          <p class="lead text-center">写一些有关于你的个人信息</p>
          <small class="d-block pb-3">* = 必填</small>
          <form @submit.prevent="handleSubmit">
            <TextFieldGroup
              v-model="msgInfo.handle"
              placeholder="* Profile handle"
              name="handle"
              info="有关于你的个人信息"
              :error="errors.handle"
            />

            <!-- <div class="form-group">
              <select class="form-control form-control-lg" name="status">
                <option value="0">* 选择你的职业</option>
                <option value="Developer">前端开发</option>
                <option value="Junior Developer">后端开发</option>
                <option value="Senior Developer">后端开发</option>
                <option value="Manager">后端开发</option>
                <option value="Student or Learning">后端开发</option>
                <option value="Instructor">后端开发</option>
                <option value="Intern">后端开发</option>
                <option value="Other">后端开发</option>
              </select>
              <small class="form-text text-muted">写一些关于你工作的内容</small>
            </div>-->

            <SelectListGroup
              v-model="msgInfo.status"
              name="status"
              :error="errors.status"
              info="请选择你的职业"
              :options="options"
            />

            <TextFieldGroup
              v-model="msgInfo.company"
              placeholder="公司"
              name="company"
              info="公司"
              :error="errors.company"
            />

            <TextFieldGroup
              v-model="msgInfo.website"
              placeholder="网址"
              name="website"
              info="网址"
              :error="errors.website"
            />

            <TextFieldGroup
              v-model="msgInfo.location"
              placeholder="地点"
              name="location"
              info="地点"
              :error="errors.location"
            />

            <TextFieldGroup
              v-model="msgInfo.skills"
              placeholder="技能"
              name="skills"
              info="技能( HTML,CSS,JavaScript,PHP)"
              :error="errors.skills"
            />

            <TextFieldGroup
              v-model="msgInfo.githubusername"
              placeholder="Github 用户名"
              name="githubusername"
              info="Github 用户名"
              :error="errors.githubusername"
            />

            <!-- <div class="form-group">
              <textarea class="form-control form-control-lg" placeholder="个人介绍" name="bio"></textarea>
              <small class="form-text text-muted">个人介绍</small>
            </div>-->

            <textAreaGroup
              placeholder="个人介绍"
              name="bio"
              v-model="msgInfo.bio"
              :error="errors.bio"
              info="自我介绍"
            />

            <div class="mb-3">
              <button
                @click="displaySocialInputs = !displaySocialInputs"
                type="button"
                class="btn btn-light"
              >社交应用</button>
              <span class="text-muted">选项</span>
            </div>

            <div v-show="displaySocialInputs">
              <!-- <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fab fa-QQ"></i>
                  </span>
                </div>
                <input type="text" class="form-control form-control-lg" placeholder="QQ" name="QQ" />
              </div>-->

              <InputGroup
                v-model="msgInfo.QQ"
                placeholder="QQ"
                name="QQ"
                :error="errors.QQ"
                icon="fa fa-qq"
              />

              <InputGroup
                v-model="msgInfo.wechat"
                placeholder="wechat"
                name="wechat"
                :error="errors.wechat"
                icon="fa fa-wechat"
              />

              <InputGroup
                v-model="msgInfo.linkedin"
                placeholder="Linkedin"
                name="linkedin"
                :error="errors.linkedin"
                icon="fa fa-linkedin"
              />

              <InputGroup
                v-model="msgInfo.weibo"
                placeholder="weibo"
                name="weibo"
                :error="errors.weibo"
                icon="fa fa-weibo"
              />

              <InputGroup
                v-model="msgInfo.instagram"
                placeholder="Instagram"
                name="instagram"
                :error="errors.instagram"
                icon="fa fa-instagram"
              />
            </div>

            <input type="submit" class="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextFieldGroup from "../components/common/TextFieldGroup";
import InputGroup from "../components/common/InputGroup";
import TextAreaGroup from "../components/common/TextAreaGroup";
import SelectListGroup from "../components/common/SelectListGroup";
export default {
  name: "CreateProfile",
  data() {
    return {
      msgInfo: {
        handle: "",
        company: "",
        website: "",
        location: "",
        skills: "",
        githubusername: "",
        QQ: "",
        wechat: "",
        linkedin: "",
        weibo: "",
        instagram: "",
        status: "* 请选择您的职业",
        bio: ""
      },
      errors: {},
      options: [
        { label: "0", value: "* 请选择您的职业" },
        { label: "Junior Developer", value: "前端初级工程师" },
        { label: "Senior Developer", value: "前端中级工程师" },
        { label: "HighDeveloper", value: "前端高级工程师" },
        { label: "Manager", value: "前端管理" },
        { label: "backend Developer", value: "后端开发" },
        { label: "Python machine learning", value: "Python机器学习" },
        { label: "Other", value: "其他" }
      ],
      displaySocialInputs: false
    };
  },
  components: {
    TextFieldGroup,
    InputGroup,
    TextAreaGroup,
    SelectListGroup
  },
  methods: {
    handleSubmit() {
      // console.log(this.msgInfo);
      this.$axios
        .post("/api/profile", this.msgInfo)
        .then(res => {
          this.errors = {};
          this.$store.dispatch("setProfileAsync", res.data);
          this.$router.push("/dashboard");
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
