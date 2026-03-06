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
import debounce from '../../utils/utils.js';
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
            const url = `https://graph.instagram.com/v25.0/me?fields=id,username&access_token=${process.env.INSTAGRAM_API}`;
            const res = await fetch(url);

            if (!res.ok) {
            console.error('Fehler beim Laden des Instagram Users', await res.text());
            throw new Error('Fehler beim Laden des Instagram Users');
            }

            const data = await res.json();
            return data; // { id, username }
        },
        async fetchInstagramImages () {
            const baseUrl = 'https://graph.instagram.com/v25.0';
            const userId = process.env.INSTAGRAM_ACCOUNT_ID; // IG_USER_ID (Business/Creator)
            const token = process.env.INSTAGRAM_API;         // Instagram User Access Token

            const url = `${baseUrl}/${userId}/media` +
            `?fields=id,media_type,media_url,permalink,thumbnail_url,timestamp` +
            `&access_token=${token}`;

            try {
            const res = await fetch(url);
            if (!res.ok) {
                console.error('Instagram API Fehler (media)', await res.text());
                throw new Error('Fehler beim Laden der Instagram Bilder');
            }

            const data = await res.json();

            // Optional: Nur bestimmte Medientypen (z.B. Bilder + Reels) zulassen
            const details = (data.data || [])
                // z.B. nur IMAGE & VIDEO (oder REELS) nehmen:
                // .filter(item => ['IMAGE', 'VIDEO', 'CAROUSEL_ALBUM'].includes(item.media_type))
                .slice(0, 10); // nur die ersten 10

            this.images = details;
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