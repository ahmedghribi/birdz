import axios from "axios";

const todo = {
  state: {
    id: "",
    Terminated: "",
  },
  mutations: {
    GetID(state, id) {
      state.id = id;
      state.status = "Get id Sucess";
    },

    Terminated(state, objComp) {
      state.objComp = objComp;
    },
  },
  actions: {
    AddItem({ commit }, toDo) {
      return new Promise((resolve, reject) => {
        const item = {
          userId: 1,
          title: toDo.title,
          completed: false,
        };
        axios({
          url: "https://jsonplaceholder.typicode.com/todos",
          data: item,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "POST",
        })
          .then((response) => commit("GetID", response.data.id))
          .catch((err) => {
            reject(err);
          });
      });
    },

    deleteToDo(idToDo) {
      return new Promise((resolve, reject) => {
        axios({
          url: "https://jsonplaceholder.typicode.com/todos/" + idToDo,
          method: "DELETE",
        })
          .then()
          .catch((err) => {
            reject(err);
          });
      });
    },

    updateItem({ commit }, toDo) {
      return new Promise((resolve, reject) => {
        const item = {
          userId: 1,
          title: toDo.title,
          completed: toDo.completed,
        };
        axios({
          url: "https://jsonplaceholder.typicode.com/todos/" + toDo.id,
          data: item,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "PATCH",
        })
          .then((response) => commit("GetID", response.data.id))
          .catch((err) => {
            reject(err);
          });
      });
    },

    async getCompleatedToDos({ commit }, todos) {
      commit("Terminated", todos);
    },
  },

  getters: {
    GetId: (state) => state.id,
    Terminated: (state) => state.objComp,
  },
};
export default todo;
