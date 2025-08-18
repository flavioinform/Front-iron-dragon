<template>
 

  <section class="about-section">
    <div class="container-fluid px-0">
      <div class="about-banner text-center text-white d-flex align-items-center justify-content-center">
        <h1 class="fw-bold">Quienes Somos</h1>
      </div>
    </div>
    <div class="container py-5">
      <p class="text-center">
        En <strong>Iron Dragon</strong>, somos apasionados por tu bienestar. Somos una tienda comprometida con la calidad, respaldada por expertos en nutrición y fitness. Nuestra misión es ayudarte a alcanzar tus metas de salud y rendimiento.
      </p>
      <p class="text-center">
        Ofrecemos productos de primera calidad y un servicio excepcional para guiarte en tu viaje hacia una vida más saludable y activa. Elige <strong>BN Suplementos</strong> para impulsar tu transformación hacia una versión mejor de ti mismo.
      </p>
    </div>
  </section>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Navbar from '@/components/Navbar.vue'
</script>

<style>
.about-section {
  font-family: Arial, sans-serif;
}

.about-banner {
  background-color: #000; /* Fondo negro */
  height: 300px; /* Altura del banner */
}

.about-banner h1 {
  font-size: 2.5rem;
  color: #fff; /* Texto blanco */
}

.container p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #333; /* Texto gris oscuro */
}
</style>