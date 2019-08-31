<template>
  <!-- 仪表盘 -->
  <div class="dashboard">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="display-4">仪表盘</h1>
          <p v-if="user != null && profile != null" class="lead text-muted">
            Welcome
            <router-link :to="{name:'profile',params:{handle:profile.handle}}">{{user.name}}</router-link>
          </p>
          <div v-if="profile != null">
            <ProfileActived />

            <!-- 个人工作经验 和 个人教育经历 -->
            <Experience @handleDashDelete="handleExpDelete" :experience="profile.experience" />
            <Education @handleDashDelete="handleEduDelete" :education="profile.education" />

            <!-- 删除 -->
            <div style="margin-bottom: 60px;">
              <button class="btn btn-danger" @click="deleteClick">删除当前账户</button>
            </div>
          </div>
          <div v-else>
            <p>没有任何相关的个人信息，请添加您的个人信息</p>
            <!-- 跳转到添加个人信息的组件 -->
            <router-link to="/create-profile" class="btn btn-lg btn-info">添加个人信息</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProfileActived from "../components/common/ProfileActived";
import Experience from "../components/common/Experience";
import Education from "../components/common/Education";
export default {
  name: "DashBoard",
  computed: mapGetters(["user"]),
  components: {
    ProfileActived,
    Experience,
    Education
  },
  data() {
    return {
      profile: null
    };
  },
  created() {
    // console.log(this.profile);
    this.getProfileData();
  },
  methods: {
    getProfileData() {
      this.$axios
        .get("/api/profile")
        .then(res => {
          this.profile = res.data;

          //存储到vuex
          this.$store.dispatch("setProfileAsync", res.data);
        })
        .catch(err => {
          this.$store.dispatch("setProfileAsync", null);

          this.profile = null;
          //   console.log(err);
        });
    },
    deleteClick() {
      this.$axios
        .delete("/api/profile")
        .then(res => {
          this.profile = null;
          // vuex状态初始化
          this.$store.dispatch("setIsLoginAsync", false);
          this.$store.dispatch("setProfileAsync", null);
          this.$store.dispatch("setUserAsync", null);
          this.$router.push("/login");
        })
        .catch(err => {
          alert(err.response.data);
        });
    },
    handleExpDelete(id) {
      this.$axios.delete("/api/profile/experience/" + id).then(res => {
        // console.log(res.data);
        this.profile = res.data;
      });
    },
    handleEduDelete(id) {
      this.$axios.delete("/api/profile/education/" + id).then(res => {
        // console.log(res.data);
        this.profile = res.data;
      });
    }
  }
};
</script>


<style scoped>
</style>
