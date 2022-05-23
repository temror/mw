<template>
  <div class="main">
    <MainComponent v-if="!storage.email"/>
    <div class="main__go" v-if="storage.email">
      <h1>Что ж, начнем?</h1>
      <GoComponent @click="me">СТОЙ!</GoComponent>
      <GoComponent @click="put">ИДИ!</GoComponent>
    </div>
  </div>
</template>

<script setup>
import MainComponent from "@/components/main/MainComponent";
import {computed, reactive} from "vue";
import GoComponent from "@/components/main/GoComponent";
import axios from "axios";

const state = reactive({
  cats: [],
})

const storage = computed(() => {
  return localStorage;
});

const places = async () => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const res = await axios.get(`/api/places?populate=*&filters[$or][0][user_details][email][$null]=${storage.value.email}&filters[$or][1][user_details][email][$ne]=${storage.value.email}`);
  state.cats = res.data.data[getRandomInt(res.data.data.length)]
};

const me = async () => {
  const res = await axios.get('/api/user-details/6?populate=cats')
  const data = res.data.data.attributes.cats.data
  const ids = data.map((data) => data.id);
  state.cats = ids;
  state.cat = state.cats.length + 1
  state.cats.push(Number(state.cat));
  console.log(state.cats.join(","))
}

const put = async () => {
  await me()
  const res = await axios.put('/api/user-details/6', {
    data: {
      cats: state.cats,
    }
  })
  console.log(res)
}
</script>

<style lang="scss" scoped>
.main {
  &__go {
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      font-family: "Roboto Thin", sans-serif;
      font-weight: lighter;
      padding: 60px;
      font-size: 80px;
      color: #414141;
    }
  }
}
</style>
