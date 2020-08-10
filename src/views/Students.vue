<template>
  <div class="students">
    <table>
      <tr>
        <th>Name</th>
        <th>Surname</th>
        <th>Birthdate</th>
        <th>Gender</th>
        <th>Phone</th>
        <th>Email</th>
      </tr>
      <tr v-for="student in students" :key="student.id">
        <td>{{student.name}}</td>
        <td>{{student.surname}}</td>
        <td>{{student.year}} {{student.month}} {{student.day}}</td>
        <td>{{student.gender}}</td>
        <td>{{student.phone}}</td>
        <td>{{student.email}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  name: "Students",
  data() {
    return {
      students: [],
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
table,
tr,
td,
th {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 5px;
}
th {
  background-color: rgb(111, 43, 175, 0.5);
}
</style>
