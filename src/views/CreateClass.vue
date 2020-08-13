<template>
  <div class="create-class">
    <Notification
      v-on:displaynot="error = false"
      v-if="error"
      type="is-link"
      :message="errorMessage"
    />
    <form v-on:submit.prevent="add()">
      <div class="field">
        <label class="label">Group</label>
        <div class="control">
          <div class="select">
            <select v-model="groupname">
              <option value disabled selected>Select Group</option>
              <option v-for="group in groups" :key="group.id" :value="group.id">{{group.name}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Select Class</label>
        <div class="control">
          <datepicker v-model="date" :value="date.toString()"></datepicker>
        </div>
      </div>
      <div class="buttons">
        <button type="submit" class="button is-info">Add Class</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import Datepicker from "vuejs-datepicker";
import Notification from "../components/Notification";

export default {
  name: "CreateClass",
  components: { Datepicker, Notification },
  data() {
    return {
      date: new Date(),
      name: "",
      groupname: "",
      groups: [],
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