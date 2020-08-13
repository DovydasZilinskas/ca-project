<template>
  <div class="header">
    <div id="nav">
      <nav class="navbar is-light" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" target="_blank" href="https://www.codeacademy.lt">
            <img src="https://www.codeacademy.lt/wp-content/uploads/2017/05/logo.png" />
          </a>
          <div class="navbar-item">
            <h1 class="title">CA Students</h1>
          </div>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start" v-if="loggedIn">
            <router-link
              v-for="link in links"
              :key="link.name"
              :to="link.url"
              class="navbar-item"
            >{{link.name}}</router-link>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <button
                  v-if="loggedIn"
                  @click="signOut"
                  class="button is-light"
                >Logout ({{ this.firstname }})</button>
                <span v-else>
                  <router-link to="/register" class="button is-info">
                    <strong>Sign up</strong>
                  </router-link>
                  <router-link to="/login" class="button is-dark">Log in</router-link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Header",
  data() {
    return {
      loggedIn: false,
      firstname: "",
      links: [
        { name: "Students", url: "/students" },
        { name: "Add Student", url: "/add" },
        { name: "Groups", url: "/groups" },
        { name: "Add Groups", url: "/addgroup" },
        { name: "Create Class", url: "/createclass" },
        { name: "Classes", url: "/classes" },
      ],
    };
  },
  methods: {
    signOut() {
      this.loggedIn = false;
      firebase.auth().signOut();
    },
  },
  beforeMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
        this.firstname = firebase.auth().currentUser.email;
      }
    });
  },
};
</script>

<style scoped>
</style>