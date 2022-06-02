<template>
  <div class="footer">
    <div class="container">
      <div class="footer__content">
        <div class="footer__logo">
          <img
            src="@/assets/logo.svg"
            alt="logo"
            @click="$router.push('/main')"
          />
        </div>
        <div class="footer__rights">©All rights are reserved</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  &__content {
    height: 100px;
    border-top: 1px solid #46865c;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
  }
  &__logo {
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      transform: scale(1.01);
      transition: 0.3s;
    }
  }
  &__rights {
    padding: 50px;
  }
}
</style>
