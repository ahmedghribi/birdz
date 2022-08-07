<template>
  <div>
    <div class="ToDoTable mt">
      <div class="tableHeader">
        <el-row>
          <el-col :span="12"> ToDo Terminated </el-col>
          <el-col :span="12"> Items {{ items }} </el-col>
        </el-row>
      </div>
      <div class="table">
        <div class="tableRow" v-for="item in [toDos]" :key="item.title">
          <div>
            <el-row>
              <el-col :span="12"> {{ item.title }}</el-col>
              <el-col :span="12"> </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    toDos: Object | Array,
  },
  watch: {
    toDos: function (newVal, oldVal) {
      this.item = Object.keys(newVal).length;
    },
  },
  data() {
    return {
      items: 0,
    };
  },
};
</script>

<style>
.mt {
  margin-top: 60px;
}
</style>
