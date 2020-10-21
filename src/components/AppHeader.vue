<template>
  <div class="mb-3 fixed-top">
    <b-navbar toggleable="md" type="light" class="customNav">
      <router-link to="/">
        <b-navbar-brand>
          <img class="logo" src="../assets/logo.png" alt="" />
        </b-navbar-brand>
      </router-link>

      <b-navbar-nav class="ml-auto mr-2 d-flex">
        <b-nav-item class="mobile-cart">
          <router-link to="/cart" tag="li">
            <i class="fas fa-shopping-cart">
              <span v-if="itemsAmount > 0" class="badge-number">
                {{ itemsAmount }}
              </span>
            </i>
          </router-link>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-toggle
        target="nav-collapse"
        class="navbarToggle"
      ></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <router-link to="/getOrderInfo" tag="li">查詢訂單</router-link>
          </b-nav-item>
          <b-nav-item class="hideOnMobile">
            <router-link to="/cart" tag="li">購物車</router-link>
          </b-nav-item>

          <b-nav-item @click="handleLogin">
            後台管理
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <app-login></app-login>

    <transition name="fade">
      <app-cart-list-slider v-if="showCartList"></app-cart-list-slider>
    </transition>
  </div>
</template>

<script>
import AppLogin from '@/components/AppLogin.vue';
import AppCartListSlider from '@/components/AppCartListSlider.vue';
import { fb } from '../firebase';

export default {
  data() {
    return {
      adminSignedIn: fb.auth().currentUser,
    };
  },
  computed: {
    showCartList() {
      return this.$store.state.showCartListSlider;
    },
    itemsAmount() {
      return this.$store.state.cartItems.length;
    },
  },
  methods: {
    handleLogin() {
      if (this.adminSignedIn) {
        this.$router.push('/admin');
      } else {
        this.$bvModal.show('login-modal');
      }
    },
  },
  components: {
    AppLogin,
    AppCartListSlider,
  },
};
</script>

<style lang="scss" scoped>
// Transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fa-shopping-cart {
  font-size: 23px;
  margin-top: 4px;
  position: relative;
}

.badge-number {
  color: white;
  font-size: 12px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  line-height: 18px;
  position: absolute;
  top: -9px;
  right: -12px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #ff6347;
}

.navbarToggle {
  border: none;
}

.logo {
  max-width: 150px;
  height: auto;
}

.customNav {
  background: white;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
}

.hideOnMobile {
  display: none;
}

.fixed-top {
  z-index: 10;
}

@media (min-width: 768px) {
  .logo {
    max-width: 200px;
  }

  .mobile-cart {
    display: none;
  }

  .hideOnMobile {
    display: block;
  }

  .navbar-brand {
    transform: translateX(-50%) translateY(-50%);
    left: 50%;
    position: absolute;
    // margin-left: 30px;
  }

  .navbar-collapse {
    flex-grow: 0;
    padding: 15px 0;
  }
}
</style>
