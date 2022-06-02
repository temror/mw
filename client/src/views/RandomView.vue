<template>
  <div class="random">
    <h1 class="random__title">Куда сегодня?</h1>
    <img src="@/assets/banner-random.svg" alt="banner-random" style="width: 700px">
    <article class="random__article">Иди! - это сервис для тех, кто много гуляет. Или хотел бы много гулять.

      Я часто сталкивался с проблемой, что люди, живущие всю жизнь в Москве, совершенно не знают свой город. Слова вроде “Крутицкое подворье” или “Хохловка” часто вызывают недоумение, а диапазон прогулок ограничивается Новым Арбатом и Тверской.

      Для туристов или ребят, только что переехавших из других городов, Москва вообще кажется большим клубком из дорог, подземных переходов и серых пятиэтажек.

      Мне бы очень хотелось изменить такой порядок вещей и рассказать, в каком чудесном, разнообразном и потрясающем городе мы живем. </article>
  </div>
</template>

<script setup>
import {onMounted} from "vue";

onMounted(() => {
  window.scrollTo(0,0)
});
</script>

<style lang="scss" scoped>
.random{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &__title {
    font-family: "Roboto Light", sans-serif;
    font-size: 60px;
    font-weight: lighter;
    text-align: center;
    max-width: 800px;
    color: #292626;
    margin: 100px 0;
  }

  &__subtitle {
    font-family: "Roboto Light", sans-serif;
    font-size: 35px;
    font-weight: lighter;
    text-align: center;
    max-width: 700px;
    margin-bottom: 50px;
  }

  &__article {
    line-height: 135%;
    font-family: "Roboto Regular", sans-serif;
    font-size: 25px;
    width: 900px;
    margin: 100px 0 20px 0;
    color: #6c6c6c;
  }
}
</style>
