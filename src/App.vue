<template>
  <SVGList></SVGList>
  <div id="skip-links-home"></div>
  <LogoScreen></LogoScreen>
  <AppHeader></AppHeader>
  <main class="main">
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </main>
  <SocialMedia></SocialMedia>
  <AppFooter></AppFooter>
  <Toast></Toast>
</template>

<script>
// layout
import AppHeader from './layout/header/AppHeader.vue';
import AppFooter from './layout/footer/AppFooter.vue';
// components
import SVGList from './assets/svg/SVGList.vue';
import LogoScreen from './components/logoscreen/LogoScreen.vue';
import SocialMedia from './components/socialmedia/SocialMedia.vue';
import Toast from './components/toast/Toast.vue';

export default {
  components: {
    SVGList,
    AppHeader,
    AppFooter,
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