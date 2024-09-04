<template>
  <form @submit.prevent="submitForm" class="form">
    <!-- NAME -->
    <div class="form-group" :class="{ invalid: !name.isValid }">
      <label for="name"> Name <abbr title="Pflichtfeld">*</abbr> </label>
      <input class="form-control" type="text" id="name" v-model.trim="name.val" @blur="clearValidity('name')"
        placeholder="Name" />
      <p v-if="!name.isValid" :class="{ invalid: !message.isValid }">
        {{ $t('contact.contactFormValidation.name') }}
      </p>
    </div>
    <!-- EMAIL -->
    <div class="form-group" :class="{ invalid: !email.isValid }">
      <label for="email"> E-Mail <abbr title="Pflichtfeld">*</abbr> </label>
      <input class="form-control" type="email" id="email" v-model.trim="email.val" @blur="clearValidity('email')"
        placeholder="E-Mail" />
      <p v-if="!email.isValid" :class="{ invalid: !message.isValid }">
        {{ $t('contact.contactFormValidation.mail') }}
      </p>
    </div>
    <!-- SUBJECT -->
    <div class="form-group" :class="{ invalid: !subject.isValid }">
      <label for="subject">
        {{ $t('contact.contactForm.subject') }} <abbr title="Pflichtfeld">*</abbr>
      </label>
      <input class="form-control" type="text" id="subject" v-model.trim="subject.val" @blur="clearValidity('subject')"
        :placeholder="$t('contact.contactForm.subject')" />
      <p v-if="!subject.isValid" :class="{ invalid: !subject.isValid }">
        {{ $t('contact.contactFormValidation.subject') }}
      </p>
    </div>
    <div v-if="1 === 2" class="form-group form-select">
      <!-- this one just kept for future purposes -->
      <label class="form-label" for="language">Sprache</label>
      <select class="form-control" id="language" name="select-restaurant" v-model="$i18n.locale" required>
        <option value="de">Deutsch</option>
        <option value="en">English</option>
      </select>
    </div>
    <!-- MESSAGE -->
    <div class="form-group" :class="{ invalid: !message.isValid }">
      <label for="message">
        {{ $t('contact.contactForm.message') }} <abbr title="Pflichtfeld">*</abbr>
      </label>
      <textarea class="form-control" id="message" rows="7" v-model.trim="message.val" @blur="clearValidity('message')"
        :placeholder="$t('contact.contactForm.message') "></textarea>
      <p v-if="!message.isValid" :class="{ invalid: !message.isValid }">
        {{ $t('contact.contactFormValidation.message') }}
      </p>
    </div>
    <!-- RECHENAUFGABE -->
    <div class="form-group" :class="{ invalid: !mathProblem.isValid }">
      <label for="mathProblem">{{ $t('contact.contactForm.calc') }}: {{ mathProblem.example }} <abbr
          title="Pflichtfeld">*</abbr></label>
      <input class="form-control" type="number" id="mathProblem" v-model.trim="mathProblem.val"
        @blur="clearValidity('mathProblem')" :placeholder="$t('contact.contactForm.calcPlaceholder') " />
      <p v-if="!mathProblem.isValid" :class="{ invalid: !mathProblem.isValid }">
        {{ $t('contact.contactFormValidation.calc') }}
      </p>
    </div>
    <p v-if="!formIsValid">{{ $t('contact.contactFormValidation.check') }}</p>
    <base-button mode="btn--primary">{{ $t('contact.contactForm.submit') }}</base-button>
  </form>
</template>
  
<script>
  import BaseButton from '../button/BaseButton.vue';
  import Icon from '../../assets/svg/Icon.vue';
  
  export default {
    components: {
      BaseButton,
      Icon,
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
        subject: {
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
  
        if (this.subject.val === "") {
          this.subject.isValid = false;
          this.formIsValid = false;
        }
        // const correctAnswer = eval(this.mathProblem.example);
        const correctAnswer = calculate(this.mathProblem.example);
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
          subject: this.subject.val,
          message: this.message.val,
          // date: this.formatDate(this.subject.val),
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
              subject: formData.subject,
              text: formData.message,
              // date: formData.date,
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

  function calculate(expression) {
    const parts = expression.split(' '); // Split by spaces

    // Basic error handling
    if (parts.length < 3) {
      return NaN; // Or handle the error differently
    }

    let result = parseFloat(parts[0]);
    for (let i = 1; i < parts.length; i += 2) {
      const operator = parts[i];
      const number = parseFloat(parts[i + 1]);

      switch (operator) {
        case '+':
          result += number;
          break;
        case '-':
          result -= number;
          break;
        case '*':
          result *= number;
          break;
        case '/':
          if (number === 0) {
            // Handle division by zero
            return NaN; // Or handle the error differently
          }
          result /= number;
          break;
        default:
          // Handle unknown operator
          return NaN; // Or handle the error differently
      }
    }

    return result;
  }
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

  .form-select {
    position: relative;

    select {
      appearance: none;
    }

    &::after {
      background-image: url("../../assets/svg/icon-arrow-down.svg");
      background-position: center;
      background-repeat: no-repeat;
      background-size: 20px 20px;
      bottom: 0;
      content: "";
      display: block;
      height: 5rem;
      inset-inline-end: 0;
      position: absolute;
      pointer-events: none;
      width: 5rem;
    }
  }

  .form-control {
    @include responsive-font-size(1.7rem, 1.8rem);
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
    @include responsive-font-size(1.7rem, 1.8rem);
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
      @include responsive-font-size(1.7rem, 1.8rem);
      color: $color-error;
      margin-block-start: 0.5rem;
      margin-inline-start: 1rem;
    }

    input,
    textarea {
      border: 1px solid $color-error;
    }
  }
</style>
  