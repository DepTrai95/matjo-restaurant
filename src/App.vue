<template>
  <SVGList></SVGList>
  <div id="skip-links-home"></div>
  <LogoScreen></LogoScreen>
  <Header></Header>
  <main class="main">
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </main>
  <SocialMedia></SocialMedia>
  <Footer></Footer>
  <Toast></Toast>
</template>

<script>
import SVGList from './assets/svg/SVGList.vue';
import LogoScreen from './components/logoscreen/LogoScreen.vue';
import Header from './components/header/Header.vue';
import Footer from './components/footer/Footer.vue';
import SocialMedia from './components/socialmedia/SocialMedia.vue';
import Toast from './components/toast/Toast.vue';

export default {
  components: {
    SVGList,
    Header,
    Footer,
    LogoScreen,
    SocialMedia,
    Toast,
  },
};
</script>

<style lang="scss">
.route-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: opacity 0.15s ease-out, transform 0.15s ease-out;
}

.route-leave-active {
  transition: opacity 0.15s ease-in, transform 0.15s ease-out;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>