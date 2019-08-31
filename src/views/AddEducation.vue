<template>
  <div class="section add-experience">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <a class="btn btn-light" @click.prevent="$router.go(-1)">返回</a>
          <h1 class="display-4 text-center">添加教育经历</h1>
          <p class="lead text-center">有关于教育的任何经验</p>
          <small class="d-block pb-3">* 为必填项</small>

          <form @submit.prevent="handleSubmit">
            <TextFieldGroup
              name="school"
              v-model="msgInfo.school"
              placeholder="* 学校"
              :error="errors.school"
            />
            <TextFieldGroup
              name="degree"
              v-model="msgInfo.degree"
              placeholder="* 学历"
              :error="errors.degree"
            />
            <TextFieldGroup
              name="fieldofstudy"
              v-model="msgInfo.fieldofstudy"
              placeholder="* 专业"
              :error="errors.fieldofstudy"
            />

            <h6>开始时间</h6>

            <TextFieldGroup type="date" name="from" v-model="msgInfo.from" :error="errors.from" />

            <h6>结束时间</h6>

            <TextFieldGroup
              :disabled="msgInfo.current"
              type="date"
              name="to"
              v-model="msgInfo.to"
              :error="errors.to"
            />

            <div class="form-check mb-4">
              <input
                class="form-check-input"
                type="checkbox"
                name="current"
                value
                id="current"
                v-model="msgInfo.current"
                @click="msgInfo.to=''"
              />
              <label class="form-check-label" for="current">在读</label>
            </div>

            <TextAreaGroup
              placeholder="描述"
              name="description"
              v-model="msgInfo.description"
              :error="errors.description"
              info="更多关于教育的内容"
            />

            <input type="submit" class="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextFieldGroup from "../components/common/TextFieldGroup";
import TextAreaGroup from "../components/common/TextAreaGroup";
export default {
  name: "AddExperience",
  data() {
    return {
      msgInfo: {
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
        description: ""
      },
      errors: {}
    };
  },
  components: {
    TextFieldGroup,
    TextAreaGroup
  },
  methods: {
    handleSubmit() {
      //   console.log(this.msgInfo);
      this.$axios
        .post("/api/profile/education", this.msgInfo)
        .then(res => {
          this.errors = {};
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

<style>
</style>