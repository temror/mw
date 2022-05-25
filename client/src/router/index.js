import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import RandomView from "../views/RandomView";
import InfoView from "../views/InfoView";
import PlacesView from "../views/PlacesView";
import GoView from "../views/GoView";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/main",
    },
    {
      path: "/main",
      name: "main",
      component: () => import("@/layout/default"),
      children: [
        {
          path: "",
          component: MainView,
        },
        {
          path: "random",
          component: RandomView,
        },
        {
          path: "info",
          component: InfoView,
        },
        {
          path: "places",
          component: PlacesView,
        },
      ],
    },
    {
      path: "/go",
      name: "go",
      component: () => import("@/layout/default"),
      children: [
        {
          path: "",
          component: GoView,
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/layout/default"),
      children: [
        {
          path: "",
          component: () => import("@/views/AboutView"),
        },
      ],
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../views/AuthView.vue"),
    },
  ],
});

export default router;
