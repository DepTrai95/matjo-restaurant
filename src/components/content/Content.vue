<template>
   <div>
      <stage-separator class="stage__separator"></stage-separator>
      <article class="content" :id="content.id">
         <section class="content-area">
            <div class="inner">
               <h2 class="text-center">{{ content.title }}</h2>
               <div class="grid-2--tablet-landscape-up">
                  <div class="grid-item">
                     <div class="content__heading">
                        <h3>{{ content.subTitle }}</h3>
                     </div>
                     <div class="content__text">
                        <p v-for="text in content.textContent" :key="text.id">{{ text }}</p>
                        <router-link class="btn--primary" :to="content.callToAction.to">{{ content.callToAction.text }}</router-link>
                     </div>
                  </div>
                  <div class="grid-item">
                     <div class="grid-2--tablet-landscape-up content__images">
                        <Img v-for="img in content.images" :key="img.id" :img="img"></Img>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </article>
   </div>
</template>
 
<script>
import LinkRouter from '../link/LinkRouter.vue';
import StageSeparator from '../stage/StageSeparator.vue';
import Img from '../../components/img/Img.vue';

export default {
   components: {
      LinkRouter,
      StageSeparator,
      Img,
   },
   props: {
      content: {
         type: Object,
         required: true
      },
   },
};
</script>
 
<style lang="scss">
.content {

&.reverse {
   .grid-2--tablet-landscape-up {
      display: flex;
      flex-direction: column-reverse;

      @include for-tablet-landscape-up {
         flex-direction: row-reverse;
      }
   }
}
}
 

.content__heading {
   h3 {
      @include responsive-font-size(3.5rem, 4rem);
      margin-block-start: 0;
   }
}

.content__text {

}

.content__images {
   height: 500px;
   padding: 1rem;
   position: relative;

   .img:first-child {
      position: absolute;
      left: 0;
      top: 0;
      transform: translate(25%, 0%);

      img {
         height: 400px;
      }
   }

   .img:last-child {
      position: absolute;
      right: 0;
      bottom: 0;

      img {
         height: 400px;
      }
   }
}
</style>
 