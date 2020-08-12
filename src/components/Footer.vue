<template>
  <div class="footeris">
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>CA-Students DB</strong> by
          <a href="https://www.codeacademy.lt">Code Academy</a>.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 2rem 1.5rem 2rem;
  height: 100px;
}
</style>