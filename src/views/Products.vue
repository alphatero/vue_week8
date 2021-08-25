<template>
  <div>
    <Loading :active="isLoading"></Loading>

    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal(true)">
        建立新的產品
      </button>
    </div>

    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ $filters.currency(item.origin_price) }}
          </td>
          <td class="text-right">
            {{ $filters.currency(item.price) }}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="openModal(false, item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openDelProductModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <ProductModal
      :product="tempProduct"
      :isNew="isNew"
      ref="productModal"
      @upload-product="udateProduct"
    >

    </ProductModal>

    <Pagination :pages="pagination" @emit-pages="getProducts" />

    <DelModal :product="tempProduct" ref="delModal" @del-itme="delProduct"></DelModal>
  </div>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue';
import Pagination from '@/components/Pagination.vue';
import DelModal from '@/components/DelModal.vue';

export default {
  components: {
    ProductModal,
    Pagination,
    DelModal,
  },
  data() {
    return {
      isLoading: false,
      pagination: {},
      products: [],
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      this.currentPage = page;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.isLoading = true;
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        }
      });
    },
    updateProduct(item) {
      this.tempProduct = item;
      let url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      let status = 'add product';
      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
        httpMethod = 'put';
        status = 'update';
      }
      const productComponent = this.$refs.ProductModal;
      this.$http[httpMethod](url, { data: this.tempProduct })
        .then((res) => {
          if (res.data.success) {
            this.$httpMessageState(res, status);
            productComponent.hideModal();
            this.getProducts(this.currentPage);
          } else {
            this.$httpMessageState(res, status);
          }
        });
    },
    delProduct() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.isLoading = true;
      this.$http.delete(url).then((res) => {
        if (res.data.success) {
          this.$httpMessageState(res, 'delete product');
          const delComponent = this.$refs.delModal;
          delComponent.hideModal();
        }
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = { ...item };
        this.isNew = false;
      }
      const productComponent = this.$refs.productModal;
      productComponent.openModal();
    },
    openDelProductModal(item) {
      this.tempProduct = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.openModal();
    },
  },
};
</script>
