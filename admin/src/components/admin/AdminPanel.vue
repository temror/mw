<template>
  <div class="admin">
    <div class="admin__container">
      <h1 class="admin__title">Создать место</h1>
      <div class="admin__text">
        <div class="admin__textItem">
          <p>Название</p>
          <input type="text" v-model="state.title">
        </div>
        <div class="admin__textItem">
          <p>Описание</p>
          <textarea type="text" v-model="state.text"></textarea>
        </div>
        <div class="admin__stations">
          <select name="" id="">
            <option v-for="s in state.stations" value="" @click="()=>{addStation(s)}">{{s.title}}</option>
          </select>
          <p v-for="s in state.selectedStations">{{s.title}}</p>
        </div>
      </div>
      <div class="admin__buttons">
        <input type="file" ref="file" hidden @change="show" multiple accept="image/png,image/jpeg,image/jpg">
        <div class="" style="display: flex">
          <button @click="$refs.file.click()">Загрузить файлы</button>
          <button v-if="length > 0" @click="state.imgs=[]" style="margin-left: 15px;">Очистить</button>
        </div>
        <div class="admin__images">
          <img v-if="state.imgs.length > 0" v-for="(image,index) in state.imgs" :src="`${image}`" alt="" @click="()=>{showBig(index)}">
        </div>
        <button @click="create">Создать</button>
      </div>
    </div>
    <!--    <div class="" v-if="!state.loading">
         <p v-for="place in state.places" >
            <span>{{place.title}} {{place.text}}</span><br>
            <img :src="`${place.img}`" alt="" style="width: 100%">
            <button @click="del(place.id)">Удалить</button>
          </p>
        </div>
        <p v-if="state.loading">Загрузка!</p>-->
    <div class="admin__big" v-if="state.showBig"  @click="hideBig">
      <img :src="`${state.bigImg}`" alt="" style="max-height: 80vh" @click.stop>
      <div class="admin__exit" @click="hideBig"><span>x</span></div>
      <div class="admin__next" @click.stop="()=>{state.imgs.length > state.bigImgInd+1 && showBig(state.bigImgInd+1)}"><span> &#10095; </span></div>
      <div class="admin__next" @click.stop="()=>{state.bigImgInd !==0 && showBig(state.bigImgInd-1)}" style="left: 0; right: auto"><span> &#10094; </span></div>
    </div>
  </div>
</template>

<script setup>

import {computed, onMounted, reactive, ref} from "vue";
import axios from "axios";

const file = ref(null)

const state = reactive({
  places: [],
  title: '',
  text: '',
  imgs: [],
  stations: [],
  selectedStations: [],
  loading: false,
  showBig: false,
  bigImg: '',
  bigImgInd: 0
})

const addStation = station =>{
  state.selectedStations.push(station)
}

const show = e => {
  const imgs = [...e.target.files]
  imgs.forEach(i =>{
    const reader = new FileReader()
    reader.readAsDataURL(i)
    reader.onload = () => {
      state.imgs.push(reader.result)
    }
  })
  console.log(state.imgs)
}

const length = computed(()=>{return state.imgs.length})

const create = async () => {
  const create = axios.post('/api/place/create', {
    body: {
      title: state.title,
      text: state.text,
      images: state.imgs,
      stations: state.selectedStations
    }
  })
  console.log(create)
}

const del = async id => {
  const res = await axios.delete(`/api/place/${id}`)
  console.log(res)
}

const showBig = i =>{
  state.showBig = true
  state.bigImgInd = i
  state.bigImg = state.imgs[i]
}

const hideBig = () =>{
  state.showBig = false
  state.bigImg = ''
}

const changeImg = p => {
  const i = new Uint8Array(p.image.data)
  const blob = new Blob([i], {type: 'text/plain'})
  const reader = new FileReader()
  reader.readAsText(blob)
  reader.onload = () => {
    p.image = reader.result
  }
}

onMounted(async ()=>{
  const stations = await axios.get('/api/stations')
  state.stations = [...stations.data.stations]
})

/*onMounted(async () => {
  state.loading = true
  const users = await axios.get('/api/place')
  state.places = users.data.places

  state.places.forEach(p=>{
    const i = new Uint8Array(p.image.data)
    const blob = new Blob([i], {type: 'text/plain'})
    const reader = new FileReader()
    reader.readAsText(blob)
    reader.onload = () => {
      p.img = reader.result
  }
    state.loading = false
  })



      /!*const i = new Uint8Array(users.data.places[0].image.data)
      const blob = new Blob([i], {type: 'text/plain'})
      const reader = new FileReader()
      reader.readAsText(blob)
      reader.onload = () => {
        state.img = reader.result
      }*!/
  console.log(state.places)
})*/
</script>

<style lang="scss" scoped>
.admin {
  width: 100%;
  font-family: Roboto, sans-serif;
  color: #232323;

  &__container {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    padding-top: 100px;
    font-size: 70px;
    font-weight: lighter;
  }

  &__text {
    width: 700px;
    display: flex;
    flex-direction: column;
  }

  &__textItem {
    width: 100%;
    display: flex;
    flex-direction: column;

    p {
      font-size: 25px;
      font-weight: lighter;
    }

    input, textarea {
      width: 400px;
      padding: 10px;
      border-radius: 5px;
      border: none;
      box-shadow: 0 0 1px rgba(1, 1, 1, 0.5);
      font-size: 20px;
      font-weight: lighter;
      color: #6c6c6c;
    }

    textarea {
      resize: none;
      width: 700px;
      height: 300px;
    }
  }

  &__buttons {
    width: 700px;
    display: flex;
    flex-direction: column;
    padding: 10px 0;

    button {
      align-self: flex-start;
      padding: 10px 30px;
      margin: 10px 0;
      font-size: 20px;
      background-color: #232323;
      border: none;
      box-shadow: 0 0 1px rgba(1, 1, 1, 0.5);
      border-radius: 5px;
      cursor: pointer;
      font-weight: lighter;
      color: #f8f8f8;
    }
  }
  &__images{
    display: flex;
    flex-wrap: wrap;
    img{
      height: 100px;
      max-width: 500px;
      margin: 10px;
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 0 3px rgba(1,1,1,0.3);
      transition: 0.2s;
    }
    img:hover{
      scale: 1.03;
      transition: 0.2s;
      cursor: pointer;
    }
  }
  &__big{
    position: fixed;
    background-color: rgba(1,1,1,0.3);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__exit{
    position: fixed;
    right: 0;
    top: 0;
    width: 100px;
    height: 100px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    z-index: 10;
    span{
      color: #dadada;
      font-size: 60px;
      font-weight: lighter;
    }
  }
  &__exit:hover{
    transition: 0.3s;
    background-color: rgba(1,1,1,0.3);
  }
  &__next{
    z-index: 5;
    position: fixed;
    right: 0;
    top: 100px;
    bottom: 100px;
    width: 100px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    span{
      color: #dadada;
      font-size: 60px;
      font-weight: lighter;
    }
  }
  &__next:hover{
    transition: 0.3s;
    background-color: rgba(1,1,1,0.3);
  }
  &__stations{
    select{
      padding: 10px 30px;
      margin: 20px 0;
      font-size: 20px;
      background-color: #232323;
      border: none;
      box-shadow: 0 0 1px rgba(1, 1, 1, 0.5);
      border-radius: 5px;
      cursor: pointer;
      font-weight: lighter;
      color: #f8f8f8;
    }
  }
}
</style>
