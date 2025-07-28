import { createRouter, createWebHashHistory } from "vue-router/auto";
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from "vue-router/auto-routes";
import type { Router } from "vue-router";

export const router: Router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes)
});
