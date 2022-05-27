<script setup>
/*import { onMounted } from "vue";
import { useStore } from "./stores/counter";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

onMounted(() => {
  if (localStorage.length !== 0) {
    store.login(localStorage.login, localStorage.password);
    router.push("/main");
  } else {
    store.isAuth === false && router.push("/auth");
  }
  console.log(localStorage);
});*/
import { computed, onMounted } from "vue";
import { useStore } from "./stores/counter";

const store = useStore();

onMounted(() => {
  console.log(localStorage);
});

const loading = computed(() => {
  return store.loading;
});
</script>

<template>
  <div
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <input-text />
    <input-textarea/>
    <difficult-component/>
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
.container {
  max-width: 1000px;
  margin: 0 auto;
}
@font-face {
  font-family: "Roboto Regular";
  src: local("Roboto Regular"), url("@/assets/fonts/Roboto-Regular.ttf");
}
@font-face {
  font-family: "Roboto Bold";
  src: local("Roboto Bold"), url("@/assets/fonts/Roboto-Bold.ttf");
}
@font-face {
  font-family: "Roboto Black";
  src: local("Roboto Black"), url("@/assets/fonts/Roboto-Black.ttf");
}
@font-face {
  font-family: "Roboto Thin";
  src: local("Roboto Thin"), url("@/assets/fonts/Roboto-Thin.ttf");
}
@font-face {
  font-family: "Roboto Light";
  src: local("Roboto Light"), url("@/assets/fonts/Roboto-Light.ttf");
}
</style>
