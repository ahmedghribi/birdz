<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.ToDoTable {
  border: solid 1px black;
  min-height: 200px;
  margin-top: 20px;
  margin-left: 200px;
  margin-right: 200px;
}
.tableHeader {
  border-bottom: solid 1px black;
}
i {
  font-size: 26px;
  cursor: pointer;
  padding-right: 20px;
}
.tableRow {
  margin-top: 10px;
  border: solid 1px black;
}
</style>
