<template>
  <div class="main">
    <div class="main__nav">
      <button @click="state.panel=true">Создать</button>
      <button @click="state.panel=false">Список</button>
    </div>
    <AdminPanel v-if="state.panel"/>
    <AdminList v-if="!state.panel"/>
  </div>
</template>

<script setup>
import AdminPanel from "./components/admin/AdminPanel";
import {reactive} from "vue";
import AdminList from "./components/admin/AdminList";

const state = reactive({
  panel: true
})
</script>

<style lang="scss" scoped>
.main{
  display: flex;
  flex-direction: column;
  align-items: center;
  &__nav{
     margin: 30px;
    button{
      padding: 10px 20px;
      margin: 20px;
      background-color: black;
      border: none;
      border-radius: 5px;
      color: white;
      box-shadow: 0 0 2px rgba(1,1,1,0.3);
      cursor: pointer;
      font-size: 20px;
      font-family: "Roboto Light", sans-serif;
      transition: 0.1s;
    }
    button:active{
      transform: scale(0.97);
      transition: 0.1s;
    }
  }
}
</style>