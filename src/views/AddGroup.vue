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

      <label class="label">Student List</label>
      <table class="table is-hoverable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th class="center">Add</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td>{{student.name}}</td>
            <td>{{student.surname}}</td>
            <td class="center">
              <input type="checkbox" :value="`${student.id}`" v-model="studentListGroup" />
            </td>
            <td>
              <router-link class="tag is-light" :to="/editstudent/ + student.id">Edit</router-link>
            </td>
          </tr>
        </tbody>
      </table>

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
.center {
  text-align: center;
}
</style>