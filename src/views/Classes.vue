<template>
  <div class="classes">
    <table class="table is-hoverable">
      <thead>
        <tr>
          <th>Group Name</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in classes" :key="item.id">
          <td>{{item.groupName}}</td>
          <td>{{item.date}}</td>
          <td>
            edit
            <!-- <router-link class="tag is-light" :to="/editgroup/ + group.id">Edit</router-link> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import moment from "moment";
export default {
  name: "Classes",
  data() {
    return {
      classes: [],
    };
  },
  beforeMount() {
    firebase
      .firestore()
      .collection("classes")
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) =>
          this.classes.push({
            id: doc.id,
            groupName: doc.data().groupName,
            date: moment(doc.data().date.toDate())
              .subtract(10, "days")
              .calendar(),
          })
        )
      );
  },
};
</script>

<style scoped>
</style>