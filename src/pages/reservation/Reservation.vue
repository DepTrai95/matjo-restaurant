<template>
   <section class="reservation" id="reservation-page">
      <div class="border-waves-before">
         <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
            y="0px" viewBox="0 0 38 28" width="19px" height="14px">
            <defs>
               <pattern id="wavePattern" width="38" height="28" patternUnits="userSpaceOnUse" fill="none">
                  <path
                     d="M-8.8817842e-16,-0.000266139407 L-8.8817842e-16,28 C9,28 13,16 19,16 C25,16 29,28 38,28 L38,-0.000266139407 C29,8.67361738e-19 25,12 19,12 C13,12 9,0 -8.8817842e-16,-0.000266139407 Z"
                     id="Path-3" fill="currentColor"></path>
               </pattern>
            </defs>
            <rect x="-10000" class="rect-anchor-50-50" width="20000" height="28" style="fill: url(#wavePattern);">
            </rect>
         </svg>
      </div>
      <div class="inner">
         <div class="reservation-info">
            <p class="center">{{ $t('reservation.reservationInfo.introHeader') }}</p>
            <p class="center">{{ $t('reservation.reservationInfo.intro') }}</p>
            <p class="center">{{ $t('reservation.reservationInfo.introSecondLine') }}</p>
            <div id="opentable-widget-container"></div>
            <p>{{ $t('reservation.reservationInfo.contactPhone') }} <a :href="`tel:` + phoneNumber">{{ phoneNumber }}</a>.</p>
            <p>
               {{ $t('reservation.reservationInfo.availableLineOne') }}
               {{ $t('reservation.reservationInfo.availableLineTwo') }}
            </p>
         </div>
      </div>
   </section>
</template>

<script>
import ReservationForm from "../../components/form/ReservationForm.vue";

export default {
   components: {
      ReservationForm,
   },
   data() {
      return {
         phoneNumber: "0351 81040272",
         mailTo: "info@matjo.de",
         opentableLoaded: false,
      };
   },
   mounted() {
      this.loadOpenTableScript();
   },
   methods: {
      loadOpenTableScript() {
         const script = document.createElement("script");
         const language = this.$i18n.locale === 'de' ? 'de-DE' : 'en-US';
         script.src = `https://www.opentable.de/widget/reservation/loader?rid=400416&type=standard&theme=wide&color=1&iframe=false&domain=de&lang=${language}&newtab=false&ot_source=Restaurant%20website`;
         script.async = true;

         script.onload = () => {
            this.opentableLoaded = true;
            this.initializeOpenTable();
         };

         const container = document.getElementById("opentable-widget-container");
         container.appendChild(script);
      },
      initializeOpenTable() {
         if (this.opentableLoaded) {
            console.log("OpenTable-Skript erfolgreich geladen.");
         }
      },
   }
};
</script>

<style lang="scss">
// Styling OpenTable
.ot-dtp-picker-form {
   display: flex;
   flex-direction: column !important;
   height: 100% !important;

   @include for-tablet-portrait-up {
      flex-direction: row !important;
      flex-wrap: wrap;
   }

   @include for-tablet-landscape-up {
      flex-direction: column !important;
      height: 50px !important;
   }
}

.ot-dtp-picker .ot-dtp-picker-button {
   background-color: $color-primary;
   border-color: $color-primary;
   box-shadow: 0px 5px 20px 5px rgba(80, 80, 80, 0.2);
   transition: background-color 0.2s ease-in, border-color 0.2s ease-in, box-shadow 0.3s ease-in;

   &:hover {
      background-color: $color-primary-dark;
      border-color: $color-primary-dark;
   }

   @include for-tablet-portrait-down {
      width: 100% !important;
   }
}

.picker__table {
   font-size: 1.6rem !important; 
   table-layout: auto !important;
}

.picker__day {
   align-items: center;
   display: flex;
   justify-content: center;
   height: 35px !important;
   width: 35px !important;
   line-height: 24px !important;
}

.picker__day--selected,
.picker__day--highlighted,
.picker__day--selected:hover,
.picker__day--infocus:hover,
.picker__day--outfocus:hover {
   background-color: $color-primary !important;
   border-color: $color-primary !important;
   color: $color-white !important;
}

.ot-dtp-picker.wide {
   @include for-tablet-portrait-down {
      width: 100% !important;
   }

   .picker .picker__holder {
      height: auto !important;
      width: auto !important;
   }
}

.ot-dtp-picker-selector {
   @include for-tablet-portrait-down {
      width: 100% !important;
   }
}

.picker__holder {
   left: calc(50% - 140px) !important;
}
</style>

<style lang="scss" scoped>
#reservation-page {
   position: relative;
}

.reservation {
   padding: 5rem 0;
}

.reservation-info {
   display: flex;
   flex-direction: column;
   flex-wrap: wrap;

   span {
      display: block;
      margin-block: .5rem;
   }
}

a {
   color: $color-primary;
}

p {
   margin-block: 0 2rem;
}

.border-waves-before {
   color: $color-white;
   height: 15px;
   left: 0;
   position: absolute;
   top: -8px;
   width: 100%;
   z-index: 10;

   svg {
      display: block;
      width: 100%;
   }
}
</style>