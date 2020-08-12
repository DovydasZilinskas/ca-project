<template>
  <div class="students">
    <Search v-on:search="(query) => (filter = query)" />
    <table class="table">
      <tr>
        <th>Name</th>
        <th>Lecturer</th>
        <th>Student List</th>
      </tr>
      <tr v-for="group in groups" :key="group.id">
        <td>{{group.name}}</td>
        <td>{{group.lecturer}}</td>
        <td>
          <li v-for="item in group.studentListGroup" :key="item.id">{{item}}</li>
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
  name: "Groups",
  components: { Search },
  data() {
    return {
      groups: [],
      studentListGroup: [],
      filter: "",
    };
  },
  // computed: {
  //   filteredGroups() {
  //     return this.groups.filter((groups) => {
  //       return groups.name.toLowerCase().includes(this.filter.toLowerCase());
  //     });
  //   },
  // },
  beforeMount() {
    firebase
      .firestore()
      .collection("groups")
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) => {
          let students = [];
          doc.data().studentListGroup.forEach((studentId, index) => {
            firebase
              .firestore()
              .collection("students")
              .doc(studentId)
              .get()
              .then((student) => {
                students.push(student.data().name);
              })
              .then(() => {
                if (doc.data().studentListGroup.length - 1 === index) {
                  this.groups.push({
                    name: doc.data().name,
                    lecturer: doc.data().lecturer,
                    studentListGroup: students,
                  });
                }
              });
          });
        })
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
</style>
