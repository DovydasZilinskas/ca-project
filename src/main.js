/** @format */

import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "./services/firebase";
import "normalize.css";
import "bulma/css/bulma.css";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
