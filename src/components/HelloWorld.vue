<template>
  <div class="banner-image
              w-100 vh-100 d-flex justify-content-evenly align-items-center">
      <div class="content text-center text-white">
        <h1>WEB ZONE</h1>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div></div>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data() {
    return {

    };
  },
  props: {
    msg: String,
  },
};
</script>

<style>
  .banner-image {
    background-image: url('../assets/home_cover.jpg');
    background-size: cover;
  }
</style>
