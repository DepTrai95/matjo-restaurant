import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";

import Home from "./pages/home/Home.vue";
import Menu from "./pages/menu/Menu.vue";
import Contact from "./pages/contact/Contact.vue";
import Impress from "./pages/impress/Impressum.vue";
import Success from "./pages/success/Success.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", 
      component: Home,
    },
    { path: "/menu", 
      component: Menu, 
    },
    { path: "/contact", 
      component: Contact, 
    },
    { path: "/impressum", 
      component: Impress, 
    },
    { path: "/success", 
      component: Success, 
    },
    { path: "/:notFound(.*)", 
      component: NotFound, 
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
});

export default router;
