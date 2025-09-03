import { createMemoryHistory, createRouter } from 'vue-router'

import Login from '@/components/Login.vue'
import Faq from '@/components/Faq.vue'
import Logged from '../components/Logged.vue'

import { LoginResult } from '@/types/loginResult'

const routes = [
  { name: 'login', path: '/login', component: Login },
  { name: 'faq', path: '/faq', component: Faq },
  {
    name: 'logged-in',
    path: '/logged-in',
    component: Logged,
  },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
  linkActiveClass: "border-indigo-500",
});