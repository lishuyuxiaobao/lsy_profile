<template>
  <!-- 个人经验 -->
  <div>
    <h4 class="mb-2">个人经验</h4>
    <table class="table">
      <thead>
        <tr>
          <th>公司</th>
          <th>工作内容</th>
          <th>工作时间</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(exp,index) in experience" :key="index">
          <td>{{exp.company}}</td>
          <td>{{exp.title}}</td>
          <td>{{exp.from}} - {{exp.to ? exp.to : "至今"}}</td>
          <td>
            <button class="btn btn-danger" @click="handleExpDelete(exp._id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "Experience",
  props: {
    experience: Array
  },
  methods: {
    handleExpDelete(id) {
      //   this.$axios.delete("/api/profile/experience/" + id).then(res => {
      //     // console.log(res.data);
      //     // this.experience = res.data.experience;
      //   });
      //注册事件
      this.$emit("handleDashDelete", id); //事件公车  子组件不能删除父组件的数据   由父组件删掉数据   定义一个组件就可完成
    }
  }
};
</script>