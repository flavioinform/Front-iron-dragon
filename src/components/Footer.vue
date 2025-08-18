<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Sección 1: Logo y descripción -->
      <div class="footer-section">
        <img src="@/assets/images/logodr.png" alt="Logo" class="footer-logo" />
        <p class="footer-description">Somos la tienda especialista en Producto Deportivos</p>
      </div>

      <!-- Sección 2: Servicio al Cliente -->
      <div class="footer-section">
        <h5>Servicio al Cliente</h5>
        <ul>
          <li><router-link to="/politica">Política de privacidad</router-link></li>
          <li><router-link to="/about">Quiene Somos</router-link></li>
          <li><router-link to="/">Inicio</router-link></li>
         
        </ul>
      </div>

     

      <!-- Sección 4: Formas de Pago -->
      <div class="footer-section">
        <h5>Formas de Pago</h5>
        <p>Tarjetas de Crédito / Débito. Transferencia Bancaria. Retiro en Local.</p>
        <img src="https://www.webpay.cl/path-to-webpay-logo.png" alt="Webpay" class="payment-logo" />
      </div>

      
    </div>
    <hr>
    <div class="text-center py-3">
      <p>&copy; 2024 Iron Dragon. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>
<script setup>
import { ref } from 'vue'
</script>
<style scoped>
.footer {
  background-color: #0f0f0f;
  color: white;
  padding: 40px 0;
  font-family: Arial, sans-serif;
  margin-top: 50px;
}

.footer-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}

.footer-section h5 {
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: 600;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin: 5px 0;
}

.footer-section ul li a {
  color: #ddd;
  text-decoration: none;
}

.footer-section ul li a:hover {
  color: #dc2626;
}

.footer-logo {
  width: 150px;
  margin-bottom: 15px;
}

.footer-description {
  font-size: 14px;
  color: #ccc;
}

.payment-logo,
.starken-logo {
  width: 120px;
  margin-top: 10px;
}

.footer-section p {
  font-size: 14px;
  color: #ccc;
}
</style>
