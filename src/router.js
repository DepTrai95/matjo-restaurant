import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";

import Home from "./pages/home/Home.vue";
import Menu from "./pages/menu/Menu.vue";
import BBQ from "./pages/bbq/BBQ.vue";
import Hotpot from "./pages/hotpot/Hotpot.vue";
import Career from "./pages/career/Career.vue";
import Contact from "./pages/contact/Contact.vue";
import Imprint from "./pages/imprint/Impressum.vue";
import Privacy from "./pages/privacy/Privacy.vue";
import Success from "./pages/success/Success.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", 
      component: Home,
      meta: {
        headerHeightMax: true,
        headline: 'BBQ & HOTPOT',
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
    { path: "/bbq", 
      component: BBQ, 
      meta: { 
        headline: 'routes.bbq.headline',
        showBackground: true,
      }
    },
    { path: "/hotpot", 
      component: Hotpot, 
      meta: { 
        headline: 'routes.hotpot.headline',
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
    { path: "/reservation", 
      component: Contact, 
      meta: { 
        headline: 'routes.contact.headline',
        showBackground: true,
      }
    },
    { path: "/impressum", 
      component: Imprint, 
      meta: { 
        headline: 'routes.imprint.headline',
      } 
    },
    { path: "/privacy", 
      component: Privacy, 
      meta: { 
        headline: 'routes.privacy.headline',
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
