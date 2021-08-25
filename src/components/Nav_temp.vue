<template>
        <nav class="navbar navbar-expand-lg fixed-top navbar-dark p-md-3 bg-dark"
        :class="{bgDark: scrollPos > 50}">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
                <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/admin/products">後台產品頁表</router-link>
                    </li>
                    <li class="nav-item">
                        <a href="#" @click.prevent="signout">登出</a>
                    </li>
                </ul>
                </div>
        </div>
    </nav>
</template>

<script>
export default {
  data() {
    return {
      scrollPos: null,
    };
  },
  methods: {
    handleScroll() {
      this.scrollPos = window.scrollY;
    },
  },
  mounted() {
    this.handleScroll();
  },
};
</script>
