import { createRouter, createWebHistory } from 'vue-router'
import authGuard from '../guards/authGuard';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      component: () => import('../components/Register.vue'),
      
    },
    
    {
      path: '/login',
      component: () => import('../components/Login.vue')
    },

    {
      path: '/home',
      component: () => import('../components/Home.vue')
    },

    /**Dashboard */
    {
      path: '/dashboard/category-games',
      name: 'CategoryGames',
      component: () => import('../components/Dashboard/CategoryGames.vue'),
      beforeEnter: authGuard,
    },

    {
      path: '/dashboard/consolas',
      name: 'Consolas',
      component: () => import('../components/Dashboard/Consolas/IndexConsola.vue'),
      beforeEnter: authGuard,
    },

    {
      path: '/dashboard/consolas/create',
      name: 'ConsolasCreate',
      component: () => import('../components/Dashboard/Consolas/CreateConsola.vue'),
      beforeEnter: authGuard,
    },

    {
      path: '/dashboard/consolas/:id',
      name: 'ConsolasById',
      component: () => import('../components/Dashboard/Consolas/ShowConsola.vue'),
      beforeEnter: authGuard,
    },


    
    {
      path: '/dashboard/consolas/:id',
      name: 'UpdateConsolaById',
      component: () => import('../components/Dashboard/Consolas/UpdateConsola.vue'),
      beforeEnter: authGuard,
    },


  

    {
      path: '/dashboard/juegos',
      name: 'Juegos',
      component: () => import('../components/Dashboard/VideoJuegos/IndexJuego.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/dashboard/juegos/create',
      name: 'JuegosCreate',
      component: () => import('../components/Dashboard/VideoJuegos/CreateJuego.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/dashboard/juegos/:id',
      name: 'JuegosById',
      component: () => import('../components/Dashboard/VideoJuegos/ShowJuego.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/dashboard/juegos/edit/:id',
      name: 'UpdateJuegoById',
      component: () => import('../components/Dashboard/VideoJuegos/UpdateJuego.vue'),
      beforeEnter: authGuard,
    },


     {
      path: '/tienda/consolas',
      name: 'TiendaConsolas',
      component: () => import('../components/Tienda/Consolas/IndexConsola.vue')
    },

    

    {
      path: '/tienda/videojuegos',
      name: 'TiendaVideoJuegos',
      component: () => import('../components/Tienda/VideoJuegos/IndexVideoJuegos.vue')
    },



    
    // Agregar una ruta de comodín para redirigir rutas no encontradas
    {
      path: '/:catchAll(.*)',
      redirect: '/home' // Redirige a la página de inicio en caso de rutas no encontradas
    }
  ]
})


export default router
