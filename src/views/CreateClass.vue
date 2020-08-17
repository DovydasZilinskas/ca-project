<template>
  <div class="create-class">
    <Notification
      v-on:displaynot="error = false"
      v-if="error"
      type="is-link"
      :message="errorMessage"
    />
    <form v-on:submit.prevent="add()">
      <table class="table">
        <tr v-for="group in groups" :key="group.id">
          <td>
            <input type="checkbox" :value="`${group.id}`" v-model="groupname" />
            {{group.name}}
          </td>
        </tr>
      </table>

      <div class="buttons">
        <button type="submit" class="button is-info">Add Class</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import Notification from "../components/Notification";

export default {
  name: "CreateClass",
  components: { Notification },
  data() {
    return {
      date: new Date(),
      groups: [],
      groupname: [],
      error: false,
      type: "",
      errorMessage: "",
    };
  },
  methods: {
    add() {
      firebase
        .firestore()
        .collection("classes")
        .add({
          groupname: this.groupname,
          date: this.date,
        })
        .then(() => {
          this.error = true;
          this.type = "is-success";
          this.errorMessage = "Added";
        })
        .catch((error) => {
          this.error = true;
          this.type = "is-danger";
          this.errorMessage = `There was a problem with something. ${error.message}`;
        });
    },
  },
  beforeMount() {
    firebase
      .firestore()
      .collection("groups")
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) =>
          this.groups.push({
            id: doc.id,
            name: doc.data().name,
          })
        )
      );
  },
};
</script>

<style scoped>
</style>