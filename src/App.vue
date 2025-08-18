<template>
  <div id="app">
    <Header  />
    <Navbar />
    <Carrousel  v-if="route.name !=='productos' && route.name!== 'about' && route.name!== 'login' && route.name!=='register' && route.name!== 'politica' "   />

    <Navigation  v-if="route.name !=='productos' && route.name!== 'about' && route.name!== 'login'  && route.name!== 'productDetail'   && route.name!== 'carrito' && route.name!== 'crearCategoria' && route.name!=='crearProducto' && route.name!=='register' && route.name!== 'politica'"   @category-selected="categoryID" />
    
    <MapaIquique v-if="route.name !=='productos' && route.name!== 'about' && route.name!== 'login'  && route.name!== 'productDetail'   && route.name!== 'carrito'  && route.name!== 'crearCategoria' && route.name!=='crearProducto' && route.name!=='register' && route.name!== 'politica'" />
    <main>
      <router-view />
    </main>
    <Footer />
        <!-- <Chatbot /> -->

  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Navbar from '@/components/Navbar.vue'
import Carrousel from './components/Carrousel.vue';
import Navigation from './components/Navigation.vue';
import MapaIquique from './components/MapaIquique.vue';
import Footer from './components/Footer.vue';
// import Chatbot from './components/Chatbot.vue';
import { useRoute } from 'vue-router';






const route=useRoute()  
</script>
