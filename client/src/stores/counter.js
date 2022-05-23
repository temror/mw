import { defineStore } from "pinia";
import axios from "axios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

export const useStore = defineStore({
  id: "store",
  token: null,
  user: {},
  state: () => ({
    isAuth: false,
    places: [],
    loading: false,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
    async login(login, password) {
      this.loading = true
      axios
        .post("http://localhost:1337/api/auth/local", {
          identifier: login,
          password: password,
        })
        .then((response) => {
          this.token = response.data.jwt;
          this.user = response.data.user;
          localStorage.login = login;
          localStorage.password = password;
          this.isAuth = false;
          console.log(this.state);
          this.loading = false
        })
        .catch((error) => {
          // Handle error.
          console.log("An error occurred:", error.response);
          ElMessage({
            type: "error",
            message: "Ошибка!!!",
          });
          this.loading = false
        });
    },
    logout() {
      this.token = null;
      localStorage.clear();
      this.isAuth = false;
    },
  },
});
