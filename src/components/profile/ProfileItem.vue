<template>
  <!-- 开发者信息 -->
  <div class="profiles">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card card-body bg-light mb-3">
            <div class="row">
              <div class="col-lg-3">
                <img class="rounded-circle" :src="profileItem.user.avatar" alt />
              </div>
              <div class="col-lg-5 col-md-4 col-8">
                <h3>{{profileItem.user.name}}</h3>
                <p>{{profileItem.status}}</p>
                <p v-if="profileItem.location">{{profileItem.location}}</p>
                <router-link
                  :to="{name:'profile',params:{handle:profileItem.handle}}"
                  class="btn btn-info"
                >更多信息</router-link>
              </div>
              <div class="col-md-4 d-none d-lg-block">
                <h4>技能</h4>
                <ul class="list-group">
                  <li
                    v-for="(skill,index) in profileItem.skills"
                    :key="index"
                    class="list-group-item"
                  >
                    <i class="fa fa-check pr-1"></i>
                    {{skill}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileItem",
  props: {
    profileItem: Object
  }
};
</script>

<style scoped>
</style>
