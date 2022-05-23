<template>
  <div class="auth">
    <img
      src="@/assets/logo.svg"
      alt="htf"
    />
    <div class="auth__form">
      <el-popover
        placement="left"
        :width="200"
        trigger="hover"
        content="example@gmail.com"
      >
        <template #reference>
          <div class="auth__item">
            <input
              ref="login"
              v-model="state.login"
              name="login"
              type="text"
              class="auth__input"
              :class="{ border: focusLogin }"
            />
            <p
              class="auth__label"
              :class="{ focus: focusLogin }"
              @click="$refs.login.focus()"
            >
              {{ state.showName ? "Придумайте логин" : "Введите логин" }}
            </p>
          </div>
        </template>
      </el-popover>
      <el-popover
        placement="left"
        :width="200"
        trigger="hover"
        content="Артём Богданов"
        v-if="state.showName"
      >
        <template #reference>
          <div class="auth__item">
            <input
              ref="name"
              v-model="state.name"
              name="name"
              type="text"
              class="auth__input"
              :class="{ border: focusName }"
            />
            <p
              class="auth__label"
              :class="{ focus: focusName }"
              @click="$refs.name.focus()"
            >
              Введите ваше имя
            </p>
          </div>
        </template>
      </el-popover>
      <el-popover
        placement="left"
        :width="200"
        trigger="hover"
        content="123456Ab"
      >
        <template #reference>
          <div class="auth__item">
            <input
              ref="password"
              v-model="state.password"
              name="password"
              type="password"
              class="auth__input"
              :class="{ border: focusPassword }"
            />
            <p
              class="auth__label"
              :class="{ focus: focusPassword }"
              @click="$refs.password.focus()"
            >
              {{ state.showName ? "Придумайте пароль" : "Введите пароль" }}
            </p>
          </div>
        </template>
      </el-popover>
      <div class="auth__buttons">
        <button @click="logined">ВОЙТИ</button>
        <button @click="register">РЕГИСТРАЦИЯ</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import axios from "axios";
import { useStore } from "../stores/counter";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const store = useStore();
const router = useRouter();

const state = reactive({
  login: "",
  name: "",
  password: "",
  showName: false,
  label: true,
});

const focusLogin = computed(() => {
  return state.login !== "";
});
const focusName = computed(() => {
  return state.name !== "";
});
const focusPassword = computed(() => {
  return state.password !== "";
});

const logined = async () => {
  if (state.showName) {
    state.showName = false;
  } else {
    axios
      .get(`http://localhost:1337/api/user-details?filters[email][$eq]=${state.login}&filters[password][$eq]=${state.password}`)
      .then((response) => {
        const data = response.data.data;
        if (data.length === 0) {
          ElMessage({
            message: `Вы ввели неверный логин или пароль`,
            type: 'error'
          });
        }
        else {
          localStorage.email = data[0].attributes.email
          localStorage.password = data[0].attributes.password
          localStorage.name = data[0].attributes.name
          store.isAuth = true
          ElMessage({
            message: `Добро пожаловать, ${data[0].attributes.name}!`,
            type: "success",
          });
          router.push('/main')
        }
        console.log(data);
        ElMessage({
          message: `Добро пожаловать, ${response.data.user.username}!`,
          type: 'success'
        });
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  }
};

const register = () => {
  if (!state.showName) {
    state.showName = true;
  } else if (state.login === "" || state.password === "" || state.name === "") {
    ElMessage({
      type: "warning",
      message: "Введите логин и пароль",
    });
  } else {
    axios
      .post("http://localhost:1337/api/user-details", {
        data:{
          name: state.name,
          email: state.login,
          password: state.password,
        }
      })
      .then(() => {
        ElMessage({
          type: "success",
          message: "Вы зарегистрированы!",
        });
      })
      .catch(() => {
        // Handle error.
        ElMessage({
          type: "error",
          message: "Неправильно введен логин или пароль",
        });
      });
  }
};
</script>

<style lang="scss" scoped>
$transition: 0.2s;
$main-color: #4ca24c;

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.auth {
  font-family: Roboto, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #FEFEFE;

  h3{
    font-weight: lighter;
    color: #525252;
    padding-bottom: 40px;
  }

  img {
    margin: 100px 0 100px 0;
    height: 140px;
  }

  h1 {
    margin: 20px 0 60px 0;
    font-weight: normal;
    color: #a4a9a4;
    font-size: 29px;
  }

  .subtitle {
    margin-bottom: 35px;
    color: rgba(28, 31, 31, 0.31);
    font-weight: lighter;
    text-align: center;
    line-height: 25px;
  }

  &__item {
    height: content-box;
    background-color: #FEFEFE;
    width: content-box;
    display: flex;
    flex-direction: column;
    transition: $transition;
    margin-bottom: 19px;

    &:hover > input {
      border: 1px solid $main-color;
      transition: $transition;
    }

    &:hover > p {
      color: $main-color;
      transition: $transition;
    }

    input:focus {
      outline: 2px solid $main-color;
      border: 1px solid #f5f5f5;
      transition: $transition;
    }

    input:focus ~ p {
      transform: scale(0.7) translateY(-34px) translateX(-35px);
      color: $main-color;
      transition: $transition;
    }
  }

  &__label {
    transition: $transition;
    cursor: text;
    background-color: #FEFEFE;
    align-self: flex-start;
    margin: -52px 0 22px 10px;
    z-index: 1000;
    padding: 2px;
    font-size: 18px;
    color: #969696;
    border-radius: 30px;
    font-weight: lighter;
  }

  &__form {
    display: flex;
    flex-direction: column;
    min-width: 300px;
  }

  &__input {
    outline: 2px solid #f5f5f5;
    margin-bottom: 15px;
    background: none;
    border: 1px solid #969696;
    padding: 15px;
    border-radius: 10px;
    transition: $transition;
    caret-color: $main-color;
  }

  &__buttons {
    align-self: center;
    width: 400px;
    display: flex;
    justify-content: center;
    margin-top: 30px;

    button {
      padding: 15px 25px;
      font-family: Roboto Regular, sans-serif;
      border: none;
      background: none;
      color: $main-color;
      border-radius: 10px;
      font-size: 16px;
      cursor: pointer;
      transition: $transition;
      width: 150px;
    }

    button:hover {
      background-color: rgba(51, 108, 51, 0.2);
    }
  }
}

.focus {
  transform: scale(0.7) translateY(-34px) translateX(-35px);
  color: $main-color;
  transition: $transition;
}

.border {
  border: 1px solid $main-color;
}

@keyframes round {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<!--<script setup>
import { onMounted, reactive } from "vue";
import axios from "axios";
import {useStore} from "./stores/counter";
import {useRouter} from "vue-router";

const state = reactive({
  places: [],
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUxNzU0MTc1LCJleHAiOjE2NTQzNDYxNzV9.XrwLXRHG_Xz6F1XtXDZGTdQUEoOCeRh5y59HiPtzU5g'
});

const store = useStore()
const router = useRouter()

const res = async () => {
  const res = await axios.get("/api/places", {
    headers: {
      Authorization: `Bearer ${state.token}`,
    },
  });
  const req = res.data.data;
  state.places = req;
  console.log(req);
};

const register = () => {
  axios
      .post("http://localhost:1337/api/auth/local", {
        identifier: "me@strapi.io",
        password: "strapiPassword",
      })
      .then((response) => {
        // Handle success.
        console.log("Well done!");
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
};

onMounted( () => {
  store.isAuth === false && router.push("/auth");
});
</script>-->
