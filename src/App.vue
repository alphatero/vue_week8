<template>
  <ToastMessages />
  <router-view />
</template>

<script>
import ToastMessages from '@/components/ToastMessages.vue';
import emitter from '@/methods/eventBus';
import $httpMessageState from '@/methods/pushMessageState';

export default {
  components: {
    ToastMessages,
  },
  provide() {
    return {
      emitter,
      $httpMessageState,
    };
  },
};
</script>

<style lang="scss">
@import './assets/all.scss';
</style>
