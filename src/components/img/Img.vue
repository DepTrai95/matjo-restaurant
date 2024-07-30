<template>
   <div :id="img.id" class="img">
      <div class="img-container">
         <div class="img__image">
            <picture>
               <source type="image/webp" :srcset="generateSrcset(img.imgSrc, 'webp')"
                  sizes="(max-width: 599px) 400px, (max-width: 899px) 600px, 1200px" />
               <img :src="generateImgSrc(img.imgSrc)" height :width="img.width" loading="lazy" alt="" />
            </picture>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   props: {
      img: {
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

      const image = this.$el;
      if (image) {
         observer.observe(image);
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

.img {
   --icon-wrapper-width: 45px;
   --content-padding-x: var(--content-padding);
   --content-padding-y: var(--content-padding);

   @include for-desktop-up {
      --icon-wrapper-width: 60px;
   }

   background-color: $color-white;
   border-radius: 30px;
   box-shadow: 0 20px 30px rgba(82, 82, 82, 0.05);
   display: flex;
   flex-direction: column;
   margin-bottom: var(--content-padding);
   overflow: hidden;
   position: relative;
   transform: translateY(0px);
   transition: background-color $transition-timing, transform $transition-timing, color $transition-timing, box-shadow $transition-timing;
   
   opacity: 0;
   transform: translateY(30px);
   transition: opacity 0.25s ease-in, transform 0.25s ease-in;

   &.fade-in {
      opacity: 1;
      transform: translateY(0);
   }
}

.img__image {
   border: 1px solid #000;
   border: 1px solid rgba(0, 0, 0, 0.3);
   position: relative; // img__logo
   
   picture {
      transition: transform $transition-timing;

      &:hover {
         transform: scale(1.1);
      }
   }

   img {
      border-radius: 0;
      vertical-align: bottom;
   }
}

.img__content {
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

.img__header {
   .img--with-logo & {
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
         position: absolute; // img__content
         right: 0;
         top: 0;
         z-index: 1;
      }
   }
}

.img__body {
   @include responsive-font-size(1.7rem, 1.8rem);
   flex: 1 1 auto;
   line-height: 1.45;

   p {
      margin: 1.3em 0;
   }
}

.img__footer {
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
