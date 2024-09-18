import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from "vue-router/auto-routes";
import { Router, RouteRecordRaw } from "vue-router";

export const router:Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  extendRoutes: (routes: RouteRecordRaw[]) =>  setupLayouts(routes)
});
