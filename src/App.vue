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
  <CookieConsent ref="cookieConsent" />
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
import CookieConsent from './components/dialog/CookieConsent.vue';
// stores
import { cookieConsentStore } from './store/cookieConsentStore';
// utils
import { enableTracking } from './utils/tracking';

export default {
  components: {
    SVGList,
    AppHeader,
    AppFooter,
    LogoScreen,
    SocialMedia,
    Toast,
    CookieConsent,
  },
  data() {
    return {
      cookieStore: null,
    };
  },
  mounted() {
    // Initialize cookie consent store
    this.cookieStore = cookieConsentStore();
    this.cookieStore.initialize();
    
    // Check if user has already given consent
    const consentStatus = this.cookieStore.getConsentStatus();
    
    if (consentStatus === 'accepted') {
      // User previously accepted - enable tracking
      enableTracking();
    } else if (consentStatus === null) {
      // No decision made yet - show cookie dialog
      // Small delay to let page load first
      setTimeout(() => {
        if (this.$refs.cookieConsent) {
          this.$refs.cookieConsent.showDialog();
        }
      }, 1500);
    }
    // If rejected, do nothing (tracking stays disabled)
    
    // Watch for dialog request from footer (cookie settings link)
    this.$watch(
      () => this.cookieStore.shouldShowDialog,
      (shouldShow) => {
        if (shouldShow && this.$refs.cookieConsent) {
          this.$refs.cookieConsent.showDialog();
          this.cookieStore.clearDialogRequest();
        }
      }
    );
    
    // Show discount dialog once when app loads
    setTimeout(() => {
      if (this.$refs.discountDialog) {
        this.$refs.discountDialog.showDialog();
      }
    }, 1000);
  }
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