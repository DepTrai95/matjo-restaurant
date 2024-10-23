<template>
   <Teleport to="#skip-links-home">
      <p id="skiplinks" class="skiplinks">
         <em class="sr-only">Springen Sie direkt:</em>
         <a href="#about-us">Zum Inhalt</a>
         <a href="#instagram">Zur Instagram-Galerie</a>
      </p>
   </Teleport>
</template>

<script>
   export default {
      
   }
</script>

<style lang="scss" scoped>
.skiplinks {
   inset-block-start: 0;
   inset-inline-end: 0;
   inset-inline-start: -999em;
   position: absolute;
   z-index: 1000;

   a {
      inset-inline-start: -999em;
      max-width: 0;
      position: absolute;
      text-indent: 0;
      transition: max-width .6s cubic-bezier(.07, .68, .56, .94);
      white-space: nowrap;

      &:focus {
         background-color: $color-primary;
         color: $color-white;
         font-weight: 500;
         inset-block-start: 0;
         inset-inline-start: 0;
         line-height: 2.7rem;
         max-width: 12em;
         outline: 0;
         padding: 1rem 1.5rem;
         position: fixed;
         text-align: center;
         text-decoration: none;
      }
   }
}
</style>