<template>
   <section>
      <div class="inner">
         <div class="text-center">
            <h2>Whooops</h2>
            <p>
               Diese Seite konnte leider nicht gefunden werden. Sie könnte gelöscht worden sein
               Zurück zur
            </p>
            <router-link to="/" class="btn--primary">← Zurück zur Homepage</router-link>
         </div>
      </div>
   </section>
</template>
 
<script>
export default {
   created() {
      let meta = document.createElement('meta');
      meta.name = "robots";
      meta.content = "noindex";
      document.getElementsByTagName('head')[0].appendChild(meta);
   }
}
</script>

<style lang="scss" scoped>
 section {
    margin-block: 7rem;
 }

 </style>