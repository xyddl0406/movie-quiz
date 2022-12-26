import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "WelcomeMain",
    component: () => import("../view/WelcomeMain.vue"), //../ -> 상위 폴더로 가야함.
  },
  {
    path: "/solveMain",
    name: "SolveMain",
    component: () => import("../view/SolveMain.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
