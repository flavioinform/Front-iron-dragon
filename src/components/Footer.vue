<template>
  <footer class="aguamoche-footer">
    
    <!-- ── Trust Seals Row ── -->
    <div class="footer-trust-seals">
      <div class="container">
        <div class="row text-center seals-row">
          <div class="col-md-3 seal-item">
            <i class="bi bi-truck"></i>
            <span>Envío a todo Trujillo</span>
          </div>
          <div class="col-md-3 seal-item">
            <i class="bi bi-credit-card"></i>
            <span>Todo medio de pago</span>
          </div>
          <div class="col-md-3 seal-item">
            <i class="bi bi-box-seam"></i>
            <span>Stock disponible</span>
          </div>
          <div class="col-md-3 seal-item">
            <i class="bi bi-shield-check"></i>
            <span>Pago seguro</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Main Columns ── -->
    <div class="footer-main">
      <div class="container">
        <div class="row">
          
          <!-- Col 1: Nosotros -->
          <div class="col-lg-3 col-md-6 footer-col">
            <h5 class="footer-heading color-white">NOSOTROS</h5>
            <p class="footer-text">
              Somos Agua Moche, empresa dedicada a la elaboración, venta y distribución de agua purificada de alta calidad.
            </p>
            <div class="social-icons">
              <a href="#"><i class="bi bi-facebook"></i></a>
              <a href="#"><i class="bi bi-instagram"></i></a>
              <a href="#"><i class="bi bi-whatsapp"></i></a>
            </div>
          </div>

          <!-- Col 2: Categorías -->
          <div class="col-lg-2 col-md-6 footer-col">
            <h5 class="footer-heading">CATEGORÍAS</h5>
            <ul class="footer-links">
              <li><router-link to="/productos">Accesorios</router-link></li>
              <li><router-link to="/productos">Aguas</router-link></li>
              <li><router-link to="/productos">Envases</router-link></li>
              <li><router-link to="/productos">Ver todos</router-link></li>
            </ul>
          </div>

          <!-- Col 3: Empresa -->
          <div class="col-lg-2 col-md-6 footer-col">
            <h5 class="footer-heading">EMPRESA</h5>
            <ul class="footer-links">
              <li><router-link to="/home">Inicio</router-link></li>
              <li><a href="#nosotros">Quiénes somos</a></li>
              <li><router-link to="/productos">Tienda virtual</router-link></li>
              <li><a href="#contacto">Contáctenos</a></li>
            </ul>
          </div>

          <!-- Col 4: Medios de Pago & Contacto -->
          <div class="col-lg-5 col-md-6 footer-col payment-contact-col">
            <div class="row">
              <div class="col-md-6">
                <h5 class="footer-heading">MEDIOS DE PAGO</h5>
                <ul class="footer-links mb-3">
                  <li>Tarjetas Crédito / Débito</li>
                  <li>Transferencia Bancaria</li>
                  <li>Yape / Plin</li>
                </ul>
                <div class="payment-logos">
                  <!-- Logos genéricos de pago -->
                  <i class="bi bi-credit-card-2-front-fill fs-3 text-white"></i>
                </div>
              </div>
              <div class="col-md-6">
                <h5 class="footer-heading">CONTACTO</h5>
                <div class="contact-item">
                  <i class="bi bi-geo-alt"></i>
                  <div>
                    <strong>Dirección</strong><br>
                    Girón independencia 830
                  </div>
                </div>
                <div class="contact-item mt-3">
                  <i class="bi bi-phone"></i>
                  <div>
                    <strong>Teléfono</strong><br>
                    +51 961 745 295
                  </div>
                </div>
                <div class="contact-item mt-3">
                  <i class="bi bi-envelope"></i>
                  <div>
                    <strong>Email</strong><br>
                    Contactoaguamoche@gmail.com
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- ── Copyright ── -->
    <div class="footer-bottom">
      <div class="container text-center">
        <p>&copy; Todos los derechos reservados - Creado para Agua Moche.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.aguamoche-footer {
  background-color: #0b1c3f; /* Azul oscuro estilo Aguapurisima */
  color: #ffffff;
  font-family: var(--font-body);
}

/* ── Trust Seals ── */
.footer-trust-seals {
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding: 30px 0;
}

.seal-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.seal-item i {
  font-size: 2rem;
  color: #fff;
}

.seal-item span {
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
}

/* ── Main Footer ── */
.footer-main {
  padding: 60px 0;
}

.footer-col {
  margin-bottom: 30px;
}

.footer-heading {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 25px;
  letter-spacing: 0.05em;
}

.footer-text {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.7);
  line-height: 1.6;
  margin-bottom: 20px;
}

/* Links */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a, .footer-links li {
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: #ffffff;
}

/* Social */
.social-icons {
  display: flex;
  gap: 10px;
}

.social-icons a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.3);
  color: #fff;
  transition: all 0.2s;
}

.social-icons a:hover {
  background: #fff;
  color: #0b1c3f;
}

/* Contact */
.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  font-size: 0.85rem;
}

.contact-item i {
  font-size: 1.5rem;
  line-height: 1;
}

/* ── Copyright ── */
.footer-bottom {
  background-color: #06122c; /* Tono más oscuro */
  padding: 20px 0;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.5);
}

.footer-bottom p {
  margin: 0;
}

@media (max-width: 768px) {
  .seal-item {
    justify-content: flex-start;
    margin-bottom: 20px;
  }
}
</style>
