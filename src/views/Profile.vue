<template>
  <div class="profile">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <a class="btn btn-light mb-3 float-left" @click.prevent="$router.go(-1)">返回个人信息</a>
        </div>
      </div>
      <div>
        <ProfileHeader v-if="profile" :profile="profile" />
        <ProfileAbout v-if="profile" :profile="profile" />
        <ProfileCreds
          v-if="profile && (profile.experience || profile.education)"
          :experience="profile.experience"
          :education="profile.education"
        />
        <ProfileGithub
          v-if="profile && profile.githubusername"
          :githubusername="profile.githubusername"
        />
      </div>
    </div>
  </div>
</template>
          

<script>
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileAbout from "../components/profile/ProfileAbout";
import ProfileCreds from "../components/profile/ProfileCreds";
import ProfileGithub from "../components/profile/ProfileGithub";
export default {
  name: "Profile",
  data() {
    return {
      profile: null,
      experience: null,
      education: null,
      githubusername: null
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getProfileByHandle(to.params.handle);
    });
  },
  components: {
    ProfileHeader,
    ProfileAbout,
    ProfileCreds,
    ProfileGithub
  },
  methods: {
    getProfileByHandle(handle) {
      //   console.log(handle);
      this.$axios.get(`/api/profile/handle/${handle}`).then(res => {
        // console.log(res.data);
        this.profile = res.data;
        this.$store.dispatch("setProfileAsync", res.data);
      });
    }
  }
};
</script>

<style scoped>
</style>