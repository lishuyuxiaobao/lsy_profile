 <<template>
 
 <!-- 教育 -->
          <div>
            <h4 class="mb-2">教育</h4>
            <table class="table">
              <thead>
                <tr>
                  <th>学校</th>
                  <th>学历</th>
                  <th>专业</th>
                  <th>时间</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr v-for="(edu,index) in education" :key="index">
                  <td>{{edu.school}}</td>
                  <td>{{edu.degree}}</td>
                  <td>{{edu.fieldofstudy}}</td>
                  <td>
                    {{edu.from}} - {{edu.to ? edu.to : "至今"}}
                  </td>
                  <td>
                    <button class="btn btn-danger" @click="handleEduDelete(edu._id)">
                      删除
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
              
 </template>
 <script>
export default {
  name: "Education",
  props: {
    education: Array
  },
  methods: {
    handleEduDelete(id) {
      this.$emit("handleDashDelete", id);
    }
  }
};
</script>