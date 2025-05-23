<template>
   <section class="content-area">
      <h2 class="text-center">{{ $t('instagram') }}</h2>
      <div class="grid-instagram grid-2 grid-3--tablet-portrait-up grid-5--tablet-landscape-up">
         <div class="grid-item" v-for="img in images" :key="img.id">
            <a class="instagram-img__container" :href="img.permalink" target="_blank" rel="noopener noreferrer">
               <img 
                  class="instagram-img"
                  :src="img.media_type === 'IMAGE' ? img.media_url : img.thumbnail_url" 
                  :id="img.id" 
                  alt="Bild aus Instagram" 
                  height="260" 
                  width="260"
               >
               <Icon v-if="img.media_type === 'VIDEO'" class="instagram-video" :icon="'play'"></Icon>
            </a>
         </div>
      </div>
   </section>
</template>

<script>
import { toastStore } from '../../store/store.js';
import debounce from '../../utils.js';
import StageSeparator from '../stage/StageSeparator.vue';
import Icon from '../../assets/svg/Icon.vue';

export default {
   components: {
      StageSeparator,
      Icon,
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
         const url = `https://graph.instagram.com/v21.0/${process.env.INSTAGRAM_ACCOUNT_ID}/media?access_token=${process.env.INSTAGRAM_API}`;
         try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('Fehler beim Laden der Instagram Bilder');
            const data = await res.json();
            const details = await Promise.all(
               data.data.map(async (item) => {
                  const detailUrl = `https://graph.instagram.com/v21.0/${item.id}?fields=media_url,media_type,permalink,thumbnail_url&access_token=${process.env.INSTAGRAM_API}`;
                  const detailRes = await fetch(detailUrl);
                  if (!detailRes.ok) throw new Error("Fehler beim Laden der Bilddetails");
                  return detailRes.json();
               })
            );
            // const images = details.filter(image => image.media_type === 'IMAGE').slice(0, 10);
            const images = details.slice(0, 10);
            this.images = images;
         } catch (error) {
            toastStore().showToast('error', 'Fehler beim Laden der Instagram Bilder');
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
   color: $color-white;
   display: flex;
   overflow: hidden;
   position: relative;
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

.instagram-video {
   position: absolute;
   left: 50%;
   top: 50%;
   transform: translate(-50%, -50%);

   :first-child {
      height: 7.5rem;
      width: 7.5rem;
   }
} 
</style>