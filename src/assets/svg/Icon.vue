<template>
   <span class="icon-container">
      <svg class="icon" :class="iconClass" aria-hidden="true" focusable="false">
         <use :href="`#icon-${icon}`"></use>
      </svg>
   </span>
</template>

<script>
export default {
   props: {
      icon: {
         type: String,
         required: true
      },
      iconClass: {
         type: String,
         required: false
      }
   },  
}
</script>

<style lang="scss">
.icon-container {
   display: inline-block;
   line-height: 1;
   vertical-align: top;

   .icon {
      color: currentColor;
      display: inline-block;
      fill: currentColor;
      height: 1.8rem;
      vertical-align: middle;
      width: 1.8rem;
   }
}
</style>