<template>
  <div class="edit-class">
    <Notification
      v-on:displaynot="error = false"
      v-if="error"
      type="is-link"
      :message="errorMessage"
    />
    <form v-on:submit.prevent="update()">
      <div class="field">
        <label class="label">Group</label>
        <div class="control">
          <div class="select">
            <select v-model="groupname">
              <option value disabled selected>Select Group</option>
              <option v-for="group in groups" :key="group.id" :value="group.id">{{group.name}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Select Class</label>
        <div class="control">
          <datepicker v-model="date" :value="date"></datepicker>
        </div>
      </div>
      <div class="buttons">
        <button type="submit" class="button is-info">Update Class</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import Datepicker from "vuejs-datepicker";
import Notification from "../components/Notification";

export default {
  name: "EditClass",
  components: { Notification, Datepicker },
  data() {
    return {
      date: "",
      name: "",
      groupname: "",
      groups: [],
      error: false,
      type: "",
      errorMessage: "",
    };
  },
  methods: {
    update() {
      this.loading = true;
      firebase
        .firestore()
        .collection("classes")
        .doc(this.$route.params.id)
        .set({
          groupname: this.groupname,
          date: this.date.toDate(),
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
      .collection("classes")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        if (doc) {
          this.groupname = doc.data().groupname;
          this.date = doc.data().date.toDate();
        }
      });
    firebase
      .firestore()
      .collection("groups")
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) =>
          this.groups.push({
            id: doc.id,
            name: doc.data().name,
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