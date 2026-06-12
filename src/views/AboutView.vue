<template>
  <section class="about-premium-section">
    <!-- Banner de Presentación Premium -->
    <div class="about-hero text-center text-white d-flex align-items-center justify-content-center">
      <div class="hero-overlay"></div>
      <div class="hero-content-box animate-fade-up">
        <span class="sub-badge">NUESTRA HISTORIA</span>
        <h1 class="display-4 fw-bold mt-2">Quiénes Somos</h1>
        <p class="lead mt-3 mx-auto" style="max-width: 600px;">
          En Agua Moche, redefinimos la pureza. Llevamos vitalidad, frescura y salud a cada rincón de tu vida.
        </p>
      </div>
    </div>

    <!-- Sección de Narrativa y Misión -->
    <div class="container py-5">
      <div class="row align-items-center g-5 mb-5">
        <div class="col-12 col-lg-6">
          <span class="text-primary fw-bold text-uppercase tracking-wider"><i class="bi bi-water me-2"></i> PUREZA GARANTIZADA</span>
          <h2 class="fw-bold mt-2 mb-4">El Agua que tu cuerpo y familia necesitan</h2>
          <p class="text-muted leading-relaxed">
            Nacimos con un propósito claro: proveer un recurso vital en su estado más puro y saludable. En **Agua Moche**, procesamos cada gota de agua a través de un riguroso sistema de purificación multietapa, que incluye **Filtro de carbón activado**, **Suavizadores**, **Ósmosis Inversa**, **Esterilización por Luz Ultravioleta (UV)** y **Ozonización**.
          </p>
          <p class="text-muted leading-relaxed">
            El resultado es un agua ligera, de sabor excepcionalmente fresco y completamente libre de metales pesados, sales nocivas o microplásticos. Perfecta para la hidratación diaria de tu familia o las exigencias comerciales de tu negocio.
          </p>
        </div>
        <div class="col-12 col-lg-6">
          <!-- Tarjeta de Tecnología -->
          <div class="glass-ice p-4 rounded-4 shadow-sm border border-light">
            <h5 class="fw-bold text-primary mb-3"><i class="bi bi-check-circle-fill me-2"></i> Proceso Certificado de Agua Moche</h5>
            <ul class="process-list list-unstyled">
              <li class="d-flex align-items-start mb-3">
                <span class="list-bullet">1</span>
                <div>
                  <strong class="text-slate-800">Filtración de Arena y Carbón:</strong> Retiene partículas físicas, cloro y sabores orgánicos.
                </div>
              </li>
              <li class="d-flex align-items-start mb-3">
                <span class="list-bullet">2</span>
                <div>
                  <strong class="text-slate-800">Ósmosis Inversa (RO):</strong> Remueve minerales pesados y sólidos disueltos no deseados a nivel celular.
                </div>
              </li>
              <li class="d-flex align-items-start mb-3">
                <span class="list-bullet">3</span>
                <div>
                  <strong class="text-slate-800">Luz UV y Ozono:</strong> Desinfección de máxima seguridad, garantizando agua 100% estéril.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Sección de Valores en Grid -->
      <div class="row g-4 mt-4">
        <div class="col-12 col-md-4">
          <div class="card value-card-premium h-100 p-4 border-0">
            <div class="value-icon"><i class="bi bi-gem fs-3"></i></div>
            <h5 class="fw-bold mt-3 mb-2">Máxima Calidad</h5>
            <p class="text-muted mb-0 small">
              Implementamos los estándares de inocuidad alimentaria más estrictos. Todo nuestro hielo y agua cumple con regulaciones sanitarias de excelencia.
            </p>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card value-card-premium h-100 p-4 border-0">
            <div class="value-icon"><i class="bi bi-flower1 fs-3"></i></div>
            <h5 class="fw-bold mt-3 mb-2">Eco-Sostenible</h5>
            <p class="text-muted mb-0 small">
              Fomentamos activamente el uso de envases retornables. Cada garrafón reutilizado representa decenas de botellas plásticas de un solo uso menos en el planeta.
            </p>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card value-card-premium h-100 p-4 border-0">
            <div class="value-icon"><i class="bi bi-handshake fs-3"></i></div>
            <h5 class="fw-bold mt-3 mb-2">Servicio al Cliente</h5>
            <p class="text-muted mb-0 small">
              Estamos comprometidos con una entrega puntual y un trato amable. Entendemos que tu tiempo y el suministro de agua son prioritarios.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.about-premium-section {
  background-color: #f8fafc;
}

/* Hero Section */
.about-hero {
  position: relative;
  background-image: linear-gradient(rgba(3, 105, 161, 0.4), rgba(2, 132, 199, 0.8)), url('https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=1200&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  height: 380px;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(2, 132, 199, 0.1) 0%, rgba(3, 105, 161, 0.3) 100%);
}

.hero-content-box {
  position: relative;
  z-index: 2;
}

.sub-badge {
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 6px 16px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(4px);
}

/* Lista del proceso */
.process-list li {
  font-size: 0.92rem;
}

.list-bullet {
  background-color: #bae6fd;
  color: #0369a1;
  font-weight: 700;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
}

.text-slate-800 {
  color: #334155;
}

/* Tarjetas de Valores */
.value-card-premium {
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01);
  transition: all 0.3s;
  border: 1px solid #f1f5f9 !important;
}

.value-card-premium:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(2, 132, 199, 0.08);
  border-color: rgba(14, 165, 233, 0.2) !important;
}

.value-icon {
  font-size: 2.2rem;
  background-color: #f0f9ff;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  color: #0284c7;
}

.leading-relaxed {
  line-height: 1.75;
}

.tracking-wider {
  letter-spacing: 0.05em;
}

/* Animaciones */
.animate-fade-up {
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>