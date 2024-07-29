<template>
   <div class="career__container">
      <div class="career__header">
         <h3>{{ career.title }}</h3>
      </div>
      <div class="career__body">
         {{ career.description }}
      </div>
      <div class="career__info">
         <div class="career__info__location">
            <Icon :icon="'location'"></Icon>
            <span>Dresden</span>
         </div>
         <div class="career__info__time">
            <Icon :icon="'time'"></Icon>
            <span>{{ career.workingTime }}</span>
         </div>
      </div>
      <a class="career__button btn--primary" :href="mailSubject">Jetzt bewerben</a>
   </div>
</template>

<script>
import Icon from '../../assets/svg/Icon.vue';

export default {
   components: {
      Icon,
   },
   props: {
      career: {
         type: Object,
         required: true
      },
      subject: {
         type: String,
         default: 'Bewerbung'
      }
   },
   computed: {
      mailSubject() {
         const encodedSubject = encodeURIComponent(this.subject);
         return `mailto:info@matjo.de?subject=${encodedSubject}`;
      }
   }
}
</script>

<style lang="scss" scoped>
.career__container {
   // background-color: $color-white;
   background-color: #fffdf2;
   border: 2px solid $color-primary;
   border-radius: 30px;
   display: flex;
   flex-direction: column;
   height: 100%;
   padding: 2rem;
}

.career__header {
   margin-block-end: 1rem;

   h3 {
      color: $color-header;
      margin: 0;
   }
}

.career__body {
   flex-grow: 1;
   margin-block-end: 2rem;
}

.career__info {
   display: flex;
   gap: 1.5rem;
   margin-block-end: 2rem;

   &__location,
   &__time {
      .icon-container {
         margin-inline-end: 0.5rem;
      }
   }
}

.career__button {
   width: 100%;
}
</style>