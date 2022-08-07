<template>
  <div>
    <el-button type="info" @click="dialogVisible = true" v-if="createVisible"
      >Create</el-button
    >
    <el-button
      type="info"
      v-if="!createVisible && !softDel && !isUpdate"
      @click="validateToDo()"
      >Validate</el-button
    >
    <el-button
      type="info"
      v-if="!createVisible && softDel"
      @click="toDoDeleted()"
      >Validate</el-button
    >

    <el-button
      type="info"
      v-if="!createVisible && isUpdate && !softDel"
      @click="toDoUpdate()"
      >Validate</el-button
    >

    <el-button type="info" v-if="!createVisible" @click="cancelToDo()"
      >Cancel</el-button
    >

    <div class="ToDoTable">
      <div class="tableHeader">
        <el-row>
          <el-col :span="12"> ToDo Active </el-col>
          <el-col :span="12"> Items {{ items }} </el-col>
        </el-row>
      </div>
      <div class="table">
        <div
          class="tableRow"
          v-for="item in toDoList"
          :key="item.title"
          :style="'background-color:' + color"
        >
          <div>
            <el-row>
              <el-col :span="12"> {{ item.title }}</el-col>
              <el-col :span="12">
                <span v-if="showBtnValid">
                  <i class="el-icon-edit-outline" @click="UpdateToDo(item)"></i>
                  <i class="el-icon-close" @click="delToDO(item)"></i>
                </span>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible" width="30%">
      <el-checkbox v-model="terminated" :disabled="checked1"
        >Terminated</el-checkbox
      >

      <el-form
        label-position="top"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
      >
        <el-form-item label="Title" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">Cancel</el-button>

          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            v-if="!isUpdate"
            >Add</el-button
          >
          <el-button
            type="primary"
            @click="editForm('ruleForm')"
            v-if="isUpdate"
            >Edit</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: 0,
      dialogVisible: false,
      terminated: false,
      checked1: true,
      createVisible: true,
      ruleForm: {
        title: "",
        desc: "",
      },
      rules: {
        title: [
          {
            required: true,
            message: "title required",
            trigger: "blur",
          },
        ],
        desc: [
          {
            required: true,
            message: "description required",
            trigger: "blur",
          },
        ],
      },
      toDoList: [],
      color: "#fff",
      showBtnValid: false,
      softDel: false,
      toDoForDelete: "",
      toDoForUpdate: "",
      isUpdate: false,
      dataForUpdate: [],
    };
  },
  methods: {
    //form submit
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.toDoList.push({
            title: this.ruleForm.title,
            desc: this.ruleForm.desc,
            id: "0",
          });
          console.log(this.toDoList);
          this.items++;
          this.$refs[formName].resetFields();

          this.dialogVisible = false;
          this.createVisible = false;
          this.showBtnValid = true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //form reset
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
    //Effective add todo API
    validateToDo() {
      const lastItem = this.toDoList[this.toDoList.length - 1];

      this.$store.dispatch("AddItem", lastItem).then(this.afterValidate());
      setTimeout(() => {
        this.toDoList[this.toDoList.length - 1].id = this.$store.getters.GetId;
      }, 3000);
    },
    //after the add of todo
    afterValidate() {
      this.createVisible = true;
      this.color = "gray";
      this.showBtnValid = true;
    },
    //get item for delete & softdelete
    delToDO(item) {
      this.createVisible = false;
      this.softDel = true;
      this.toDoForDelete = item.id;
    },
    //effective delete todo API
    toDoDeleted() {
      this.$store
        .dispatch("deleteToDo", this.toDoForDelete)
        .then(this.afterDelete());
    },
    //after the delete
    afterDelete() {
      this.toDoList = this.toDoList.filter(
        (data) => data.id != this.toDoForDelete
      );
      this.items--;
      this.createVisible = true;
      this.showBtnValid = false;
      this.softDel = false;
    },
    //open modal edit and get todo id for the update
    UpdateToDo(item) {
      this.isUpdate = true;
      this.ruleForm.title = item.title;
      this.ruleForm.desc = item.desc;
      this.dialogVisible = true;
      this.checked1 = false;
      this.toDoForUpdate = item.id;
      console.log(item.id + "6555555555555555555555555555");
    },
    //edit form
    editForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.toDoList = this.toDoList.map((obj) => {
            if (obj.id === this.toDoForUpdate) {
              return {
                ...obj,
                title: this.ruleForm.title,
                desc: this.ruleForm.desc,
              };
            }

            return obj;
          });

          this.dialogVisible = false;
          this.createVisible = false;
          this.showBtnValid = true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //effective edit API
    toDoUpdate() {
      this.dataForUpdate = {
        id: this.toDoForUpdate,
        title: this.ruleForm.title,
        desc: this.ruleForm.desc,
        completed: this.terminated,
      };
      this.$store
        .dispatch("updateItem", this.dataForUpdate)
        .then(this.checkTerminated());
    },
    checkTerminated() {
      if (this.dataForUpdate.completed == true) {
        this.toDoList = this.toDoList.filter(
          (data) => data.id != this.dataForUpdate.id
        );
        this.items--;
        this.$store.dispatch("getCompleatedToDos", this.dataForUpdate).then();
        this.$emit('eventComp',  this.dataForUpdate)
      }
    },
  },

};
</script>

<style></style>
