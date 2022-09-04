<template>
  <div class="navbar">
    <span>Конвертирование валют</span>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scope lang="scss">
  .navbar {
    height: 50px;
    width: 100%;
    top: 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
    & span {
      font-size: 28px;
      color: white
    }
  }
</style>