<template>
  <div class="list">
    <div class="list__container">
      <h1>List</h1>
      <div class="place" v-for="place in state.places">
        <h2 class="place__title">{{place.title}}</h2>
        <p class="place__text">{{place.text}}</p>
        <div class="list__images">
          <img class="list__image" v-for="img in place.Images" :src="`${img.image}`" alt=""/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import axios from "axios";

const state = reactive({
  places: []
})

onMounted(async ()=>{
  const places = await axios.get('/api/places')
  state.places = [...places.data.places]
  state.places.forEach(p=>{
    p.Images.forEach(p=>{
      const i = new Uint8Array(p.image.data)
      const blob = new Blob([i], {type: 'text/plain'})
      const reader = new FileReader()
      reader.readAsText(blob)
      reader.onload = () => {
        p.image = reader.result
      }
    })
  })
  console.log(state.places)
})
</script>

<style lang="scss" scoped>
.list{
  &__container{
    max-width: 1000px;
    margin: 0 auto;
  }
  &__images{

  }
  &__image{
    height: 400px;
    margin: 20px;
    border: 1px solid grey;
    border-radius: 5px;
    padding: 5px;
  }
}
.place{
  font-family: "Roboto Light", sans-serif;
  &__title{

  }
  &__text{
     max-width: 700px;
  }
}
</style>