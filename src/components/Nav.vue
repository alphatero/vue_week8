<template>
          <nav class="navbar navbar-expand-lg navbar-light">
          <a class="navbar-brand" href="./index.html">Photo</a>
          <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <router-link to="/admin/products" class="nav-link">Product</router-link>
              <router-link to="/admin/orders" class="nav-link">Order</router-link>
              <router-link to="/admin/coupons" class="nav-link">Coupon</router-link>
              <a href="#" @click.prevent="logout" class="nav-link">LogOut</a>
            </div>
            <div class="navbar-nav ms-auto">
              <router-link to="/user/cart" class="nav-link">cart</router-link>
            </div>
          </div>
        </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      const url = `${process.env.VUE_APP_API}/logout`;
      this.$http.post(url)
        .then((res) => {
          if (res.data.success) {
            this.$router.push('/');
          }
        });
    },
  },
};
</script>
