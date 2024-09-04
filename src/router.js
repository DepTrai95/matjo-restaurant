import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";

import Home from "./pages/home/Home.vue";
import Menu from "./pages/menu/Menu.vue";
import Career from "./pages/career/Career.vue";
import Contact from "./pages/contact/Contact.vue";
import Impress from "./pages/impress/Impressum.vue";
import Success from "./pages/success/Success.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", 
      component: Home,
      meta: {
        headerHeightMax: true,
        headline: 'BBQ & HotPot',
        showSubHeader: true,
        showBackground: true,
      }
    },
    { path: "/menu", 
      component: Menu, 
      meta: { 
        headline: 'routes.menu.headline',
        showBackground: true,
      } 
    },
    { path: "/career", 
      component: Career, 
      meta: { 
        headline: 'routes.career.headline',
        showBackground: true,
      } 
    },
    { path: "/contact", 
      component: Contact, 
      meta: { 
        headline: 'routes.contact.headline',
        showBackground: true,
      } 
    },
    { path: "/impressum", 
      component: Impress, 
      meta: { 
        headline: 'routes.impress.headline',
      } 
    },
    { path: "/success", 
      component: Success, 
      meta: { 
        headline: 'routes.success.headline',
      } 
    },
    { path: "/:notFound(.*)", 
      component: NotFound, 
      meta: { 
        headline: '404 - Page not found',
        showBackground: false,
      }
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
});

export default router;
