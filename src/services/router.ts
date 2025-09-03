import { createMemoryHistory, createRouter } from 'vue-router'

import Login from '@/components/Login.vue'
import Faq from '@/components/Faq.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/faq', component: Faq },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
  linkActiveClass: "border-indigo-500",
});