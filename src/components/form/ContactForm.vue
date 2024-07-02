<template>
    <form @submit.prevent="submitForm" class="form">
      <!-- NAME -->
      <div class="form-group" :class="{ invalid: !name.isValid }">
        <label for="name"> Name <abbr title="Pflichtfeld">*</abbr> </label>
        <input class="form-control" type="text" id="name" v-model.trim="name.val" @blur="clearValidity('name')"
          placeholder="Name" />
        <p v-if="!name.isValid" :class="{ invalid: !message.isValid }">
          Bitte geben Sie Ihren Namen an.
        </p>
      </div>
      <!-- EMAIL -->
      <div class="form-group" :class="{ invalid: !email.isValid }">
        <label for="email"> E-Mail <abbr title="Pflichtfeld">*</abbr> </label>
        <input class="form-control" type="email" id="email" v-model.trim="email.val" @blur="clearValidity('email')"
          placeholder="E-Mail" />
        <p v-if="!email.isValid" :class="{ invalid: !message.isValid }">
          Das E-Mail Feld darf nicht leer sein!
        </p>
      </div>
      <!-- DATEPICKER -->
      <div class="form-group" :class="{ invalid: !selectedDate.isValid }">
        <label for="selectedDate">
          Datum und Zeit <abbr title="Pflichtfeld">*</abbr>
        </label>
        <VueDatePicker 
          v-model="selectedDate.val"
          class="customCalendarStyle"
          :minDate="minDate" 
          :maxDate="maxDate"
          @blur="clearValidity('selectedDate')" placeholder="DD/MM/YYYY - HH:MM"
        >
        </VueDatePicker>
        <p v-if="!selectedDate.isValid" :class="{ invalid: !selectedDate.isValid }">
          Es muss ein Datum ausgewählt sein
        </p>
      </div>
      <!-- MESSAGE -->
      <div class="form-group" :class="{ invalid: !message.isValid }">
        <label for="message">
          Ihre Nachricht <abbr title="Pflichtfeld">*</abbr>
        </label>
        <textarea class="form-control" id="message" rows="7" v-model.trim="message.val" @blur="clearValidity('message')"
          placeholder="Ihre Nachricht"></textarea>
        <p v-if="!message.isValid" :class="{ invalid: !message.isValid }">
          Nachricht darf nicht leer sein
        </p>
      </div>
      <!-- RECHENAUFGABE -->
      <div class="form-group" :class="{ invalid: !mathProblem.isValid }">
        <label for="mathProblem">Rechenaufgabe: {{ mathProblem.example }} <abbr title="Pflichtfeld">*</abbr></label>
        <input class="form-control" type="number" id="mathProblem" v-model.trim="mathProblem.val"
          @blur="clearValidity('mathProblem')" placeholder="Lösen Sie die Rechenaufgabe" />
        <p v-if="!mathProblem.isValid" :class="{ invalid: !mathProblem.isValid }">
          Bitte lösen Sie die Rechenaufgabe korrekt.
        </p>
      </div>
      <p v-if="!formIsValid">Bitte überprüfen Sie noch einmal ihre Angaben.</p>
      <base-button mode="btn--primary">Nachricht abschicken</base-button>
    </form>
  </template>
  
  <script>
  import BaseButton from '../button/BaseButton.vue';
  
  export default {
    components: {
      BaseButton,
    },
    data() {
      return {
        name: {
          val: "",
          isValid: true,
        },
        email: {
          val: "",
          isValid: true,
        },
        message: {
          val: "",
          isValid: true,
        },
        selectedDate: {
          val: "",
          isValid: true,
        },
        mathProblem: { val: '', isValid: true, example: generateRandomMathProblem() },
        formIsValid: true,
        minDate: null,
        maxDate: null,
      };
    },
    methods: {
      clearValidity(input) {
        this[input].isValid = true;
      },
      validateForm() {
        this.formIsValid = true;
        if (this.name.val === "") {
          this.name.isValid = false;
          this.formIsValid = false;
        }
        if (
          this.email.val === "" ||
          !this.email.val.includes("@") ||
          this.email.val < 8
        ) {
          this.email.isValid = false;
          this.formIsValid = false;
        }
  
        if (this.selectedDate.val === "") {
          this.selectedDate.isValid = false;
          this.formIsValid = false;
        }
        const correctAnswer = eval(this.mathProblem.example);
        if (parseInt(this.mathProblem.val, 10) !== correctAnswer) {
          this.mathProblem.isValid = false;
          this.formIsValid = false;
        }
        if (this.message.val === "") {
          this.message.isValid = false;
          this.formIsValid = false;
        }
      },
      formatDate(string) {
        const curDateString = string.toString().substring(4, 21).split(" ");
  
        const monthNames = {
          Jan: "01",
          Feb: "02",
          Mar: "03",
          Apr: "04",
          May: "05",
          Jun: "06",
          Jul: "07",
          Aug: "08",
          Sep: "09",
          Oct: "10",
          Nov: "11",
          Dec: "12",
        };
  
        const day = curDateString[1];
        const month = monthNames[curDateString[0]];
        const year = curDateString[2];
        const time = curDateString[3];
  
        const formattedDate = `${day}.${month}.${year} - ${time} Uhr`;
        return formattedDate;
      },
      async submitForm() {
        this.validateForm();
  
        if (!this.formIsValid) return; 
  
        const formData = {
          name: this.name.val,
          email: this.email.val,
          message: this.message.val,
          date: this.formatDate(this.selectedDate.val),
        };
  
        try {
          const response = await fetch("/.netlify/functions/sendEmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: "info@matjo.de", // set email of receiver
              name: formData.name,
              email: formData.email,
              text: formData.message,
              date: formData.date,
            }),
          });
  
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          this.$router.push("/success");
        } catch (error) {
          console.error("Fehler beim Abschicken des Kontaktformulars:", error);
        }
  
      },
    },
    mounted() {
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 1);
      const maxDate = new Date();
      maxDate.setMonth(maxDate.getMonth() + 12);
  
      this.minDate = currentDate;
      this.maxDate = maxDate;
    },
  };
  
  function generateRandomMathProblem() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = '+';
    return `${num1} ${operator} ${num2}`;
  }
  </script>
  
  <script setup>
  import { ref } from 'vue';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  
  const date = ref(null);
  </script>
  
  <style lang="scss" scoped>
  .form {
    padding-top: 3rem;
  
    @include for-tablet-portrait-up {
      padding: 3.5rem;
    }
  
    @include for-tablet-landscape-up {
      margin: -3rem;
    }
  }
  
  .form-group {
    margin-bottom: 2rem;
  }
  
  .form-control {
    @include responsive-font-size(1.8rem, 1.9rem);
    border: 2px solid #51515137;
    border-radius: 30px;
    display: block;
    color: $color-body;
    font-family: inherit;
    line-height: 1.3;
    min-height: 5rem;
    outline: none;
    padding: 1rem 2rem;
    transition: border 0.3s;
    width: 100%;
  
    &:hover,
    &:focus,
    &:focus-visible {
      border: 2px solid $color-primary;
    }
  }
  
  label {
    @include responsive-font-size(1.8rem, 1.9rem);
    color: $color-body;
    display: block;
    font-weight: 500;
    margin-bottom: 1rem;
    margin-inline-start: 1rem;
  }
  
  textarea {
    resize: vertical;
  }
  
  .invalid {
    label,
    p {
      @include responsive-font-size(1.8rem, 1.9rem);
      color: $color-error;
      margin-top: 0.5rem;
    }
  
    input,
    textarea {
      border: 1px solid $color-error;
    }
  }
  </style>
  
  <!-- Styling for Datepicker Component -->
  <style lang="scss">
  .customCalendarStyle input {
    @include responsive-font-size(1.6rem, 1.8rem);
    border: 2px solid #51515137;
    border-radius: 30px;
    display: block;
    color: $color-body;
    font-family: inherit;
    min-height: 5rem;
    outline: none;
    padding: 1rem 3.5rem;
    transition: border 0.3s;
    width: 100%;
  
    &:hover,
    &:focus,
    &:focus-visible {
      border: 2px solid $color-primary !important;
    }
  }
  
  .dp__menu {
    min-width: 300px;
  }
  
  .dp__menu_inner,
  .dp__selection_preview {
    @include responsive-font-size(1.6rem, 1.8rem);
    max-width: unset !important;
  }
  
  .dp__action_button {
    @include responsive-font-size(1.8rem, 1.9rem);
    height: unset;
    margin-inline-start: 1rem;
    padding: 0.5rem 1rem;
  
    &:hover {
      border-color: $color-primary !important;
    }
  }
  
  .dp__action_select {
    background: $color-header !important;
  
    &:hover {
      background: $color-primary !important;
    }
  }
  
  .dp__input_icons {
    @include responsive-font-size(1.8rem, 1.9rem);
    height: 1.6rem;
    width: 1.6rem;
    padding-inline-end: 3rem;
  }
  
  .dp--tp-wrap { //for clock-icon
    max-width: unset;
  }
  </style>
  