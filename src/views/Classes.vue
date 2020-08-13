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
          <td>{{item.grupesName.toString()}}</td>
          <td>{{item.date}}</td>
          <td>
            <router-link class="tag is-light" :to="/editclass/ + item.id">Edit</router-link>
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
        snapshot.docs.forEach((doc) => {
          doc.data().groupname.forEach((groupId, index) => {
            let grupe = [];
            firebase
              .firestore()
              .collection("groups")
              .doc(groupId)
              .get()
              .then((groups) => {
                grupe.push(groups.data().name);
              })
              .then(() => {
                if (doc.data().groupname.length - 1 === index) {
                  this.classes.push({
                    id: doc.id,
                    groupName: doc.data().groupname,
                    date: moment(doc.data().date.toDate()).format(
                      "DD MMM YYYY"
                    ),
                    grupesName: grupe,
                  });
                }
              });
          });
        })
      );
  },
  // beforeMount() {
  //   firebase
  //     .firestore()
  //     .collection("classes")
  //     .get()
  //     .then((snapshot) =>
  //       snapshot.docs.forEach((doc) =>
  //         this.classes.push({
  //           id: doc.id,
  //           name: doc.data().groupname,
  //           date: moment(doc.data().date.toDate()).format("DD MMM YYYY"),
  //         })
  //       )
  //     );
};
</script>

<style scoped>
</style>