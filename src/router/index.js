import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
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
  },
  {
    path: '/referidos',
    name: 'referidos',
    component: () => import('../views/Referidos.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin-dashboard',
    name: 'admin-dashboard',
    component: () => import('../views/AdminDashboard.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../views/Checkout.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/pago-exitoso',
    name: 'pago-exitoso',
    component: () => import('../views/PagoExitoso.vue')
  },
  {
    path: '/pago-fallido',
    name: 'pago-fallido',
    component: () => import('../views/PagoFallido.vue')
  },
  {
    path: '/pago-pendiente',
    name: 'pago-pendiente',
    component: () => import('../views/PagoPendiente.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' };
  }
});

router.beforeEach((to, from, next) => {
  // 1. Capturar código de referido en cualquier URL de entrada
  if (to.query.ref) {
    localStorage.setItem('referral_code', to.query.ref);
    localStorage.setItem('referral_timestamp', Date.now().toString());
  }

  // 2. Comprobar estado de autenticación y admin
  const isAuthenticated = !!localStorage.getItem('access');
  const userIsAdmin = localStorage.getItem('isAdmin') === 'true';

  // 3. Proteger rutas que requieren autenticación
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      return next('/login');
    }
  }

  // 4. Proteger rutas que requieren permisos de administrador
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (!userIsAdmin) {
      return next('/home');
    }
  }

  next();
});

export default router;
