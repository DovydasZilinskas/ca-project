<template>
  <div class="students">
    <Search v-on:search="(query) => (filter = query)" />
    <table class="table">
      <tr>
        <th>Name</th>
        <th>Lecturer</th>
        <th>Student List</th>
      </tr>
      <tr v-for="group in filteredGroups" :key="group.id">
        <td>{{group.name}}</td>
        <td>{{group.lecturer}}</td>
        <td>{{group.studentListGroup.join(', ')}}</td>
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
      filter: "",
    };
  },
  computed: {
    filteredGroups() {
      return this.groups.filter((groups) => {
        return groups.name.toLowerCase().includes(this.filter.toLowerCase());
      });
    },
  },
  // methods: {
  //   update() {
  //     this.loading = true;
  //     firebase
  //       .firestore()
  //       .collection("students")
  //       .doc()
  //       .set({
  //         name: this.name,
  //         surname: this.surname,
  //       })
  //       .then(
  //         () => {
  //           this.error = true;
  //           this.errorType = "is-light";
  //           this.errorMessage = "Succesfully updated";
  //           this.loading = false;
  //         },
  //         (error) => {
  //           this.error = true;
  //           this.errorType = "is-danger";
  //           this.errorMessage = error.message;
  //           this.loading = false;
  //         }
  //       );
  //   },
  // },
  beforeMount() {
    firebase
      .firestore()
      .collection("groups")
      .get(this.$route.params.id)
      .then((snapshot) =>
        snapshot.docs.forEach((doc) =>
          this.groups.push({
            id: doc.id,
            name: doc.data().name,
            lecturer: doc.data().lecturer,
            studentListGroup: doc.data().studentListGroup,
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
</style>
