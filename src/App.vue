<template>
  <div id="app">
    <Header />
    <section class="section">
      <div class="container">
        <router-view />
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  components: { Header, Footer },
};
</script>
