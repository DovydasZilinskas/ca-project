<template>
  <div class="edit-group">
    <Notification
      v-on:displaynot="error = false"
      v-if="error"
      type="is-link"
      :message="errorMessage"
    />
    <form v-on:submit.prevent="update()">
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

      <div class="teiblas">
        <label class="label">Student List</label>
        <table class="table is-hoverable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th class="center">Add</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in students" :key="student.id">
              <td>{{student.name}}</td>
              <td>{{student.surname}}</td>
              <td class="center">
                <input type="checkbox" :value="`${student.id}`" v-model="studentListGroup" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="buttons">
        <button type="submit" class="button is-info">Update Group</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import Notification from "../components/Notification";

export default {
  name: "EditGroup",
  components: { Notification },
  data() {
    return {
      studentListGroup: [],
      students: [],
      groupName: "",
      name: "",
      student: "",
      lecturer: "",
      loading: false,
      error: false,
      errorType: "",
      errorMessage: "",
    };
  },
  methods: {
    update() {
      this.loading = true;
      firebase
        .firestore()
        .collection("groups")
        .doc(this.$route.params.id)
        .set({
          name: this.groupName,
          lecturer: this.lecturer,
          studentListGroup: this.studentListGroup,
        })
        .then(
          () => {
            this.error = true;
            this.errorType = "is-light";
            this.errorMessage = "Succesfully updated";
            this.loading = false;
          },
          (error) => {
            this.error = true;
            this.errorType = "is-danger";
            this.errorMessage = error.message;
            this.loading = false;
          }
        );
    },
  },
  beforeMount() {
    firebase
      .firestore()
      .collection("groups")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        if (doc) {
          this.groupName = doc.data().name;
          this.lecturer = doc.data().lecturer;
          this.studentListGroup = doc.data().studentListGroup;
        }
      });
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