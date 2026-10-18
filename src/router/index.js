import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', component: () => import('../views/OverviewView.vue') },
    { path: '/suppliers', component: () => import('../views/SuppliersView.vue') },
    { path: '/records', component: () => import('../views/RecordsView.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})
