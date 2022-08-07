<template>
  <div>
    <el-row>
      <el-col :span="12">
        <TodoActiveVue @eventComp="showResultData($event)" />
      </el-col>
      <el-col :span="12">
        <TodoTermiVue :toDos="data" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TodoActiveVue from "./TodoActive.vue";
import TodoTermiVue from "./TodoTermi.vue";

export default {
  data() {
    return {
      data: [],
    };
  },

  components: {
    TodoActiveVue,
    TodoTermiVue,
  },

  methods: {
    showResultData($event) {
      this.data = $event;
    },
  },
};
</script>

<style></style>
