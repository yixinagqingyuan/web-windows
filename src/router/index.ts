import { createRouter, createWebHistory } from 'vue-router'
import Component1 from "../components/HelloWorld.vue"
import Component2 from "../components/HelloWorld1.vue"
const routes = [
  { path: '/Component1', component: Component1 },
  { path: '/Component2', component: Component2 },
  { path: '/', component: Component1 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,//定义的路由
});

export default router;