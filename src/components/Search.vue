<template>
  <div class="search">
    <div class="field is-grouped">
      <p class="control is-expanded">
        <input
          v-model="query"
          class="input"
          type="search"
          placeholder="Find a product"
          v-on:keyup="callParent"
        />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      query: "",
    };
  },
  methods: {
    callParent() {
      this.$emit("search", this.query);
    },
  },
};
</script>

<style scoped>
.field {
  margin-bottom: 1.5em;
}
</style>