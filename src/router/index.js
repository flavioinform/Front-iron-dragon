import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/politica',
    name: 'politica',
    component: () => import('../views/Politic.vue')
  },
  {
    path: '/productos',
    name: 'productos',
    component: () => import('../views/Productos.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/categorias/crear',
    name: 'crearCategoria',
    component: () => import('../views/CrearCategoria.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/productos/crear',
    name: 'crearProducto',
    component: () => import('../views/CrearProducto.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/productos/:id',
    name: 'productDetail',
    component: () => import('../views/ProductoDetail.vue')
  },
  {
    path:'/carrito',
    name: 'carrito',
    component: () => import('../views/Carrito.vue')
  },
  {
    path:'/register',
    name: 'register',
    component:() => import('../views/Register.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Desplazamiento suave al principio de la página en todos los casos
    return { top: 0, behavior: 'smooth' };
  }
});

export default router;
