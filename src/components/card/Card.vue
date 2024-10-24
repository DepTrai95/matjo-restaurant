<template>
   <div :id="card.id" class="card">
      <div class="card-container">
         <div class="card__image">
            <picture>
               <source type="image/webp" :srcset="generateSrcset(card.imgSrc, 'webp')"
                  sizes="(max-width: 599px) 400px, (max-width: 899px) 600px, 1200px" />
               <img :src="generateImgSrc(card.imgSrc)" :width="card.width" loading="lazy" alt="" />
            </picture>
         </div>
         <div class="card__content">
            <div class="card__header">
               <h3>
                  <a :href="card.imgUrl"></a>
               </h3>
            </div>
            <div class="card__body">{{ card.body }}</div>
            <div class="card__footer">{{ card.footer }}</div>
         </div>
      </div>
   </div>
</template>

<script>
// How to use
// cardContent: {
//    id: 'test-card',
//    imgSrc: '/img/bbq/bbq.webp',
//    imgUrl: 'https://google.de',
//    body: 'Das ist ein Test-Body',
//    footer: 'Link'
// },
// <Card:card="cardContent"></Card>
export default {
   props: {
      card: {
         type: Object,
         required: true
      },
   },
   methods: {
      generateSrcset(imgSrc, format) {
         const smallSrc = imgSrc.replace(/\.(jpg|png|webp)/, `-small.${format}`);
         const mediumSrc = imgSrc.replace(/\.(jpg|png|webp)/, `-medium.${format}`);
         const largeSrc = imgSrc.replace(/\.(jpg|png|webp)/, `-large.${format}`);
         return `
            ${smallSrc} 400w,
            ${mediumSrc} 600w,
            ${largeSrc} 1200w
         `;
      },
      generateImgSrc(imgSrc) {
         const newSrc = imgSrc.replace(/\.(jpg|png|webp)/, `-large.webp`);
         return newSrc
      },
      observeElement(entries, observer) {
         entries.forEach((entry) => {
            if (entry.isIntersecting) {
               // Beispiel: Eine Klasse hinzufügen, um das Element zu animieren
               entry.target.classList.add('fade-in');
               observer.unobserve(entry.target);
            }
         });
      },
   },
   mounted() {
      const observer = new IntersectionObserver(this.observeElement, {
         threshold: [0.7],
      });

      const headline = this.$el.querySelector("hgroup");
      if (headline) {
         observer.observe(headline);
      }
   }
};
</script>

<style lang="scss" scoped>
.list {
   flex-wrap: wrap;

   .grid-item {
      display: flex;
   }
}

.card {
   --icon-wrapper-width: 45px;
   --content-padding-x: var(--content-padding);
   --content-padding-y: var(--content-padding);

   @include for-desktop-up {
      --icon-wrapper-width: 60px;
   }

   background-color: $color-white;
   border-radius: 8px;
   box-shadow: 0 20px 30px rgba(82, 82, 82, 0.05);
   display: flex;
   flex-direction: column;
   margin-bottom: var(--content-padding);
   overflow: hidden;
   position: relative;
   transform: translateY(0px);
   transition: background-color $transition-timing,
   transform $transition-timing,
   color $transition-timing,
   box-shadow $transition-timing;
}

.card__image {
   border: 1px solid #000;
   border: 1px solid rgba(0, 0, 0, 0.3);
   position: relative; // card__logo

   img {
      border-radius: 0;
      vertical-align: bottom;
   }
}

.card__content {
   border: 1px solid transparent;
   display: flex;
   flex-direction: column;
   flex: 1 1 auto;
   padding: var(--content-padding-y) var(--content-padding-x);

   .tag-list {
      margin-bottom: var(--content-padding-x);

      @include for-phone-only {
         margin-top: -1rem;
      }
   }
}

.card__logo {
   align-items: center;
   background-color: $color-white;
   border-radius: 50%;
   display: flex;
   height: var(--icon-wrapper-width);
   justify-content: center;
   padding: .75em;
   position: absolute; // .card__content
   top: 100%;
   inset-inline-end: var(--content-padding-x);
   transform: translateY(-50%);
   width: var(--icon-wrapper-width);

   @include for-tablet-landscape-down {
      padding: .5em;
   }
}

.card__header {
   .card--with-logo & {
      padding-inline-end: calc(5px + var(--icon-wrapper-width));
   }

   h3 {
      line-height: 1.3em;
      margin: 0;
      min-height: 2.6em; // 2 * line-height

      .grid-4--desktop-up & {
         @include for-desktop-up {
            min-height: 3.9em; // 3 * line-height
         }
      }
   }

   a {
      text-decoration: none;

      &::after {
         bottom: 0;
         content: "";
         left: 0;
         position: absolute; // card__content
         right: 0;
         top: 0;
         z-index: 1;
      }
   }
}

.card__body {
   @include responsive-font-size(1.6rem, 1.7rem);
   flex: 1 1 auto;
   line-height: 1.45;

   p {
      margin: 1.3em 0;
   }
}

.card__footer {
   @include responsive-font-size (1.4rem, 1.8rem);
   margin-block-end: 0.5em;

   .link {
      .icon {
         height: .75em;
         width: .75em;
      }
   }
}
</style>
