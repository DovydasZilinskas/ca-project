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
          <input v-model="name" class="input" id="name" type="text" placeholder="Name" required />
        </div>
      </div>

      <div class="field">
        <label class="label" for="surname">Surname</label>
        <div class="control">
          <input
            v-model="surname"
            class="input"
            id="surname"
            type="text"
            placeholder="Surname"
            required
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Gender</label>
        <div class="control">
          <div class="select">
            <select v-model="gender">
              <option value disabled selected>Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
      </div>

      <label class="label">Date of Birth</label>
      <div class="field birth">
        <div class="control">
          <input
            v-model="year"
            max="2021"
            min="1920"
            class="input"
            id="year"
            type="number"
            placeholder="Birth Year"
            required
          />
        </div>
        <div class="control">
          <div class="select">
            <select v-model="month" required>
              <option value disabled selected>Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
        </div>
        <div class="control">
          <div class="select">
            <select v-model="day" required>
              <option value disabled selected>Day</option>
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
        <div class="field is-expanded">
          <div class="field has-addons">
            <p class="control">
              <a class="button is-static">+370</a>
            </p>
            <p class="control is-expanded">
              <input
                v-model="phone"
                class="input"
                id="phone"
                type="tel"
                placeholder="Phone Number"
                maxlength="8"
                minlength="8"
                required
              />
            </p>
          </div>
          <p class="help">Do not enter the first zero e.g. 69202294</p>
        </div>
      </div>

      <div class="field">
        <label class="label" for="email">Email</label>
        <div class="control">
          <input v-model="email" class="input" id="email" type="email" placeholder="Email" required />
        </div>
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
      gender: "",
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
          month: this.month,
          surname: this.surname,
          phone: this.phone,
          email: this.email,
          gender: this.gender,
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
      this.name = "";
      this.year = "";
      this.day = "";
      this.month = "";
      this.surname = "";
      this.phone = "";
      this.email = "";
      this.gender = "";
    },
  },
};
</script>

<style scoped>
.birth {
  display: flex;
}
#selected {
  color: black;
}
#year::placeholder {
  color: black;
}
#year {
  width: 120px;
}
</style>