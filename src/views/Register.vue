<template>
  <div class="login">
    <Notification
      v-on:displaynot="error = false"
      v-if="error"
      type="is-danger"
      :message="errorMessage"
    />
    <form v-on:submit.prevent="login">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="email" v-model="email" placeholder="email@mail.lt" />
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" v-model="password" type="password" placeholder="Password" />
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button class="button is-info" :class="loading && 'is-loading'" type="submit">Register</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import Notification from "../components/Notification";
export default {
  name: "Register",
  components: { Notification },
  data() {
    return {
      email: "",
      password: "",
      error: false,
      errorMessage: "",
      loading: false,
    };
  },
  methods: {
    login() {
      this.loading = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          () => this.$router.push("/"),
          (error) => {
            this.error = true;
            this.errorMessage = error.message;
            this.loading = false;
          }
        );
    },
  },
};
</script>