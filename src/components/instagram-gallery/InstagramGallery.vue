<template>
   <div>
      <stage-separator class="stage__separator stage__separator--tinted"></stage-separator>
      <section class="content-area content-area--tinted">
         <h2 class="text-center">Folge uns auf Instagram</h2>
         <div class="grid-5--tablet-landscape-up">
            <div class="grid-item" v-for="img in images" :key="img.id">
               <a class="instagram-img__container" :href="img.permalink" target="_blank" rel="noopener noreferrer">
                  <img class="instagram-img" :src="img.media_url" :id="img.id" alt="Bild aus Instagram" height="260"
                     width="260">
               </a>
            </div>
         </div>
      </section>
   </div>
</template>

<script>
import { toastStore } from '../../store/store.js';
import StageSeparator from '../stage/StageSeparator.vue';

export default {
   components: {
      StageSeparator,
   },
   data() {
      return {
         images: [],
      }
   },
   methods: {
      async getUser () {
         const url = `https://graph.instagram.com/me?fields=id,username&access_token=${process.env.INSTAGRAM_API}`;
         const res = await fetch(url);
         const data = await res.json();
         return data;
      },
      async fetchInstagramImages () {
         const url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink&access_token=${process.env.INSTAGRAM_API}`;
         try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('Fehler beim Laden der Instagram Bilder');
            const data = await res.json();
            const images = data.data.slice(0, 10);
            this.images = images;
         } catch (error) {
            toastStore().showToast('error', 'Bilder konnten nicht geladen werden')
            console.error(error);
         }
      },
   },
   mounted() {
      this.fetchInstagramImages();
   }
}
</script>

<style lang="scss" scoped>
.instagram-img__container {
   align-items: center;
   display: flex;
   overflow: hidden;
}

.instagram-img {
   height: 280px;
   object-fit: cover;
   transition: filter .3s ease-in-out;

   &:hover {
      filter: brightness(1.2);
   }
}
</style>