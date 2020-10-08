<template>
  <div>
    <b-button v-b-modal.login-modal>管理者登入</b-button>

    <b-modal id="login-modal" centered title="管理者登入" ref="login-modal">
      <b-input-group class="mt-3">
        <b-form-input
          placeholder="Email Address"
          v-model="email"
        ></b-form-input>
      </b-input-group>
      <b-input-group class="mt-3">
        <b-form-input
          placeholder="password"
          type="password"
          v-model="password"
          @keyup.enter="login"
        ></b-form-input>
      </b-input-group>

      <template v-slot:modal-footer="{}">
        <b-button size="md" variant="primary" @click="login" class="btn-block">
          Sign In
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { fb } from '../firebase';

export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    login() {
      this.$refs['login-modal'].hide();
      fb.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ name: 'Admin' });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
