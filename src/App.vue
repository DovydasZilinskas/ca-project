<template>
  <div id="app">
    <Header />
    <section class="section">
      <div class="container">
        <router-view />
      </div>
    </section>
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  components: { Header },
};
</script>
