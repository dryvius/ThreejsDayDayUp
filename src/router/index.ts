import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { LESSONS } from '@/constants/lessons'
import MainLayout from '@/layouts/MainLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    redirect: `/day/${LESSONS[0]?.day ?? 1}`,
    children: [
      {
        path: 'day/:day',
        name: 'day',
        component: () => import('@/views/DayView.vue'),
        props: true
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: `/day/${LESSONS[0]?.day ?? 1}`
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
