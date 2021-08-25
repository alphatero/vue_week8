<template>
<Nav></Nav>
<div class="container-fluid mt-3 positon-relative">
  <router-view v-if="status"></router-view>
</div>
</template>

<script>
import Nav from '@/components/Nav.vue';

export default {
  components: {
    Nav,
  },
  data() {
    return {
      status: false,
    };
  },
  inject: ['emitter', '$httpMessageState'],
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
    const url = `${process.env.VUE_APP_API}/api/user/check`;
    this.$http.post(url).then((res) => {
      if (res.data.success) {
        this.status = true;
      } else {
        this.$httpMessageState(res, 'Sign in');
        this.$router.push('/');
      }
    });
  },
};
</script>
