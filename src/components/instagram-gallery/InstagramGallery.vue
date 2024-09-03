<template>
   <section class="content-area">
      <h2 class="text-center">{{ $t('instagram') }}</h2>
      <div class="grid-instagram grid-2 grid-3--tablet-portrait-up grid-5--tablet-landscape-up">
         <div class="grid-item" v-for="img in images" :key="img.id">
            <a class="instagram-img__container" :href="img.permalink" target="_blank" rel="noopener noreferrer">
               <img class="instagram-img" :src="img.media_url" :id="img.id" alt="Bild aus Instagram" height="260" width="260">
            </a>
         </div>
      </div>
   </section>
</template>

<script>
import { toastStore } from '../../store/store.js';
import debounce from '../../utils.js';
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
            toastStore().showToast('error', 'Fehler beim Laden der Instagram Bilder')
            console.error(error);
            throw error;
         }
      },
      handleResize: debounce(function() {
         this.calculateImageHeight();
      }, 250),
      calculateImageHeight() {
         const gridItemWidth = document.querySelector('.instagram-img').offsetWidth;
         const instagramImages = document.querySelectorAll('.instagram-img');
         instagramImages.forEach(img => {
            img.style.height = `${gridItemWidth}px`;
         });
      }
   },
   mounted() {
      this.fetchInstagramImages();
      window.addEventListener('resize', this.handleResize);
   },
}
</script>

<style lang="scss" scoped>
.grid-instagram {
   @include for-tablet-portrait-only {
      .grid-item:nth-child(10) {
         display: none;
      }
   }
}

.instagram-img__container {
   align-items: center;
   display: flex;
   overflow: hidden;

}

.instagram-img {
   min-height: 190px;
   object-fit: cover;
   transition: filter .3s ease-in-out;

   @include for-tablet-portrait-up {
      height: 250px;
   }

   @include for-tablet-landscape-up {
      height: 200px;
   }

   @include for-desktop-up {
      height: 285px;
   }

   &:hover {
      filter: brightness(1.2);
   }
}
</style>