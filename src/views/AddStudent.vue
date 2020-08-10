<template>
  <div class="add-student">
    <Notification
      v-on:displaynot="error = false"
      v-if="error"
      type="is-link"
      :message="errorMessage"
    />
    <form v-on:submit.prevent="add()">
      <div class="field">
        <label class="label" for="name">Name</label>
        <div class="control">
          <input v-model="name" class="input" id="name" type="text" placeholder="Name" />
        </div>
      </div>

      <div class="field">
        <label class="label" for="surname">Surname</label>
        <div class="control">
          <input v-model="surname" class="input" id="surname" type="text" placeholder="Surname" />
        </div>
      </div>

      <div class="field">
        <div class="control">
          <label class="radio">
            <input type="radio" v-model="male" name="gender" />
            Male
          </label>
          <label class="radio">
            <input type="radio" v-model="female" name="gender" />
            Female
          </label>
        </div>
      </div>

      <div class="field">
        <label class="label" for="birthdate">Date of Birth</label>
        <div class="control">
          <input v-model="year" class="input" id="year" type="number" placeholder="Birth Year" />
        </div>
        <div class="control">
          <div class="select">
            <select v-model="month">
              <option>Select Month</option>
              <option value="january">January</option>
              <option value="february">February</option>
              <option value="march">March</option>
              <option value="april">April</option>
              <option value="may">May</option>
              <option value="june">June</option>
              <option value="july">July</option>
              <option value="august">August</option>
              <option value="september">September</option>
              <option value="october">October</option>
              <option value="november">November</option>
              <option value="december">December</option>
            </select>
          </div>
        </div>
        <div class="control">
          <div class="select">
            <select v-model="day">
              <option>Select Day</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label" for="phone">Phone</label>
        <div class="control">
          <input v-model="phone" class="input" id="phone" type="number" placeholder="Phone" />
        </div>
      </div>

      <div class="field">
        <label class="label" for="email">Email</label>
        <div class="control">
          <input v-model="email" class="input" id="email" type="email" placeholder="Email" />
        </div>
        <!-- <p class="help is-danger">Provide as much details as you can</p> -->
      </div>
      <div class="buttons">
        <button type="submit" class="button is-info">Add Student</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import Notification from "../components/Notification";
export default {
  name: "AddStudent",
  components: { Notification },
  data() {
    return {
      name: "",
      surname: "",
      year: "",
      month: "",
      day: "",
      phone: "",
      email: "",
      male: true,
      female: true,
      error: false,
      type: "",
      errorMessage: "",
    };
  },
  methods: {
    add() {
      firebase
        .firestore()
        .collection("students")
        .add({
          name: this.name,
          year: Number(this.year),
          day: Number(this.day),
          month: Number(this.month),
          surname: this.surname,
          phone: this.phone,
          email: this.email,
          male: this.male,
          female: this.female,
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
    },
  },
  // methods: {
  //   add() {
  //     fetch("http://94.176.235.3/homes", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         image: this.image,
  //         price: this.price,
  //         description: this.description,
  //         city: this.city,
  //       }),
  //     })
  //       .then(() => {
  //         this.error = true;
  //         this.type = "is-success";
  //         this.errorMessage = "Added";
  //       })
  //       .catch((error) => {
  //         this.error = true;
  //         this.type = "is-danger";
  //         this.errorMessage = `There was a problem with something. ${error.message}`;
  //       });
  //   },
  // },
};
</script>