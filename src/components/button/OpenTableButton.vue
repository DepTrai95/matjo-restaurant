<template>
   <div :id="id"></div>
</template>

<script>
export default {
   props: {
      id: {
         type: String,
         default: 'opentable-widget-container',
         required: true,
      },
   },
   mounted() {
      this.loadOpenTableScript();
   },
   methods: {
      loadOpenTableScript() {
         const script = document.createElement("script");
         const language = this.$i18n?.locale === "de" ? "de-DE" : "en-US";

         script.src = `https://www.opentable.de/widget/reservation/loader?rid=400416&type=button&theme=wide&color=1&iframe=iframe&domain=de&lang=${language}&newtab=false&ot_source=Restaurant%20website`;
         script.async = true;
         script.id = this.id;

         script.onload = () => console.log("OpenTable-Skript erfolgreich geladen.");
         document.getElementById(this.id).appendChild(script);
      }
   }
};
</script>

<style lang="scss">
dialog:-internal-dialog-in-top-layer {
   max-height: 100% ;
   max-width: 100%;
}

#ot-reservation-widget {
   padding: 0 !important; 
}

// OpenTable
.ot-button {
   background-color: $color-primary !important;
   border-color: $color-primary !important;
   border-radius: 50px !important;
   box-shadow: 0px 5px 20px 5px rgba(80, 80, 80, 0.2) !important;
   // font-family: 'Roboto' !important;
   // font-weight: 400 !important;
   transition: background-color 0.2s ease-in, border-color 0.2s ease-in, box-shadow 0.3s ease-in;

   &:hover,
   &:focus {
      background-color: $color-primary-dark !important;
      border-color: $color-primary-dark !important;
   }

   @include for-tablet-portrait-down {
      width: 100% !important;
   }
}

.ot-powered-by {
   display: none;
}
</style>