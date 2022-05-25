<template>
  <div class="header">
    <div class="container">
      <div class="header__content">
        <img
          src="@/assets/logo.svg"
          alt="logo"
          style="cursor: pointer"
          @click="$router.push('/main')"
        />
        <ul class="header__navbar">
          <li>Куда идти?</li>
          <li>Зачем идти?</li>
          <li>А что там?</li>
        </ul>
        <button v-if="!storage.email" @click="$router.push('/auth')">
          Войти
        </button>
        <p v-if="storage.email" class="header__welcome">
          Здравствуйте, <br /><b>{{ storage.name }}</b
          >!
        </p>
        <button v-if="storage.email" @click="logout">Выйти</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "../../stores/counter";
import { useRouter } from "vue-router";
import { computed } from "vue";

const store = useStore();
const router = useRouter();

const storage = computed(() => {
  return localStorage;
});

const logout = () => {
  store.logout();
  router.go(0);
};
</script>

<style lang="scss" scoped>
.header {
  padding: 30px;
  background-color: #fefefe;
  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
      color: #e2e8e2;
      padding: 10px;
      text-decoration: none;
    }
    button {
      background-color: #4ca24c;
      color: white;
      padding: 10px 20px;
      margin: 10px;
      border: none;
      border-radius: 5px;
      font-size: 20px;
      font-family: "Roboto Regular", sans-serif;
      cursor: pointer;
      transition: 0.1s;
    }
    button:hover {
      opacity: 0.8;
      transition: 0.1s;
    }
  }
  &__navbar {
    display: flex;
    color: #1e1e1e;
    font-family: "Roboto Light", sans-serif;
    font-size: 24px;
    list-style-type: none;
    li {
      padding: 0 20px;
      cursor: pointer;
    }
  }
  &__welcome {
    color: #1e1e1e;
    font-family: "Roboto Regular", sans-serif;
    font-size: 16px;
    line-height: 24px;
  }
}
</style>
