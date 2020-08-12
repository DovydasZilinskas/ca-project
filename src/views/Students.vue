<template>
  <div class="students">
    <Search v-on:search="(query) => (filter = query)" />
    <table class="table">
      <tr>
        <th>Name</th>
        <th>Surname</th>
        <th>Birthdate</th>
        <th>Gender</th>
        <th>Phone</th>
        <th>Email</th>
        <th></th>
      </tr>

      <tr v-for="student in filteredStudents" :key="student.id">
        <td>{{student.name}}</td>
        <td>{{student.surname}}</td>
        <td>{{student.year}} {{student.month}} {{student.day}}</td>
        <td>{{student.gender}}</td>
        <td>+370{{student.phone}}</td>
        <td>{{student.email}}</td>
        <td>
          <router-link class="tag is-light" :to="/editstudent/ + student.id">Edit</router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import Search from "../components/Search";

export default {
  name: "Students",
  components: { Search },
  data() {
    return {
      students: [],
      filter: "",
    };
  },
  methods: {
    activate: function (el) {
      this.active_el = el;
    },
  },
  computed: {
    filteredStudents() {
      return this.students.filter((students) => {
        return students.name.toLowerCase().includes(this.filter.toLowerCase());
      });
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
            year: doc.data().year,
            month: doc.data().month,
            day: doc.data().day,
            phone: doc.data().phone,
            email: doc.data().email,
            gender: doc.data().gender,
          })
        )
      );
  },
};
</script>

<style scoped>
.students {
  display: flex;
  flex-direction: column;
  align-items: center;
}
tr:not(:first-child):hover {
  background-color: rgba(238, 236, 236, 0.2);
}
</style>
