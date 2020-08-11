<template>
  <div class="add-group">
    <Notification
      v-on:displaynot="error = false"
      v-if="error"
      type="is-link"
      :message="errorMessage"
    />
    <form v-on:submit.prevent="add()">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input v-model="name" class="input" type="text" placeholder="Program Name" />
        </div>
      </div>

      <div class="field">
        <label class="label">Lecturer</label>
        <div class="control">
          <input v-model="lecturer" class="input" type="text" placeholder="Lecturer" />
        </div>
      </div>

      <div class="field">
        <label class="label">Student List</label>
        <div class="control">
          <div class="select">
            <select>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
        </div>
      </div>

      <div class="buttons">
        <button type="submit" class="button is-info">Add Group</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import Notification from "../components/Notification";

export default {
  name: "AddGroup",
  components: { Notification },
  data() {
    return {
      name: "",
      studentName: "",
      lecturer: "",
      studentList: [],
      error: false,
      type: "",
      errorMessage: "",
    };
  },
  beforeMount() {
    firebase
      .firestore()
      .collection("students")
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) =>
          this.students.push({
            id: doc.id,
            studentName: doc.data().name,
          })
        )
      );
  },
  methods: {
    add() {
      firebase
        .firestore()
        .collection("groups")
        .add({
          name: this.name,
          lecturer: this.lecturer,
          studentList: this.studentList,
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
};
</script>

<style scoped>
</style>