import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      component: () => import('../components/Register.vue')
    },
    
    {
      path: '/login',
      component: () => import('../components/Login.vue')
    },

    {
      path: '/home',
      component: () => import('../components/Home.vue')
    },
    
    // Agregar una ruta de comodín para redirigir rutas no encontradas
    {
      path: '/:catchAll(.*)',
      redirect: '/home' // Redirige a la página de inicio en caso de rutas no encontradas
    }
  ]
})

export default router
