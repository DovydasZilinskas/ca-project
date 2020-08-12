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
          <input v-model="groupName" class="input" type="text" placeholder="Program Name" />
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
        <ul class="list-group">
          <li class="list-group-item" v-for="student in students" :key="student.id">
            <label>
              <input type="checkbox" :value="`${student.id}`" v-model="studentListGroup" />
              {{`${student.name} ${student.surname}`}}
            </label>
          </li>
        </ul>
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
      studentListGroup: [],
      students: [],
      groupName: "",
      name: "",
      student: "",
      lecturer: "",
      error: false,
      type: "",
      errorMessage: "",
    };
  },

  methods: {
    add() {
      firebase
        .firestore()
        .collection("groups")
        .add({
          name: this.groupName,
          lecturer: this.lecturer,
          studentListGroup: this.studentListGroup,
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
      this.groupName = "";
      this.lecturer = "";
      this.studentListGroup = "";
    },
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
            name: doc.data().name,
            surname: doc.data().surname,
          })
        )
      );
  },
};
</script>

<style scoped>
</style>