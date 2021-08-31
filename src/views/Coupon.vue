<template>
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <div class="text-end mt-4">
    <button
      type="button"
      class="btn btn-primary"
      @click="openCouponModal(true)"
    >
      建立新的優惠券
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in coupons" :key="key">
        <td>{{ item.title }}</td>
        <td>{{ item.percent }}%</td>
        <td>{{ $filters.date(item.due_date) }}</td>
        <td>
          <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
          <span v-else class="text-muted">未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="openCouponModal(false, item)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openDelCouponModal(item)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <CouponModal
    :coupon="tempCoupon"
    :is-new="isNew"
    ref="couponModal"
    @update-coupon="updateCoupon"
  />
  <DelModal :item="tempCoupon" ref="delModal" @del-item="delCoupon" />
</template>

<script>
import CouponModal from '@/components/CouponModal.vue';
import DelModal from '@/components/DelModal.vue';

export default {
  components: { CouponModal, DelModal },
  props: {
    config: Object,
  },
  inject: ['emitter', '$httpMessageState'],
  data() {
    return {
      tempCoupon: {
        title: '',
        percent: 100,
        code: '',
        is_enabled: 0,
      },
      isNew: false,
      isLoading: false,
      coupons: {},
    };
  },
  methods: {
    getCoupon() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons`;
      this.isLoading = true;
      this.$http.get(url, this.tempProduct).then((res) => {
        this.coupons = res.data.coupons;
        this.isLoading = false;
      });
    },
    openCouponModal(isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
      } else {
        this.tempCoupon = { ...item };
      }
      this.$refs.couponModal.openModal();
    },
    updateCoupon(tempCoupon) {
      this.isLoading = true;
      if (this.isNew) {
        const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`;
        this.$http.post(url, { data: tempCoupon }).then((res) => {
          if (res.data.success) {
            this.$httpMessageState(res, 'add coupon');
            this.isLoading = false;
            this.getCoupon();
            this.$refs.couponModal.hideModal();
          } else {
            this.$httpMessageState(res, 'update coupon');
            this.isLoading = false;
          }
        });
      } else {
        const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
        this.$http.put(url, { data: this.tempCoupon }).then((res) => {
          if (res.data.success) {
            this.$httpMessageState(res, 'update coupon');
            this.isLoading = false;
            this.getCoupon();
            this.$refs.couponModal.hideModal();
          } else {
            this.$httpMessageState(res, 'update coupon');
            this.isLoading = false;
          }
        });
      }
    },
    openDelCouponModal(item) {
      this.tempCoupon = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.openModal();
    },
    delCoupon() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.isLoading = true;
      this.$http.delete(url).then((res) => {
        if (res.data.success) {
          this.$httpMessageState(res, 'delete coupon');
          this.isLoading = false;
          const delComponent = this.$refs.delModal;
          delComponent.hideModal();
          this.getCoupon();
        } else {
          this.$httpMessageState(res, 'delete coupon');
          this.isLoading = false;
        }
      });
    },
  },
  created() {
    this.getCoupon();
  },
};
</script>
