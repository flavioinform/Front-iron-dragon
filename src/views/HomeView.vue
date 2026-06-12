<template>
  <div class="home-page-light">

    <!-- ══════════ 2. ASYMMETRIC LIGHT PREMIUM HERO ══════════ -->
    <section class="intro-section-light-premium">
      <!-- Hyper-realistic splash background -->
      <div class="hero-splash-bg" aria-hidden="true">
        <img src="@/assets/images2/4.jpeg" alt="" style="object-position: center 30%;" />
        <div class="splash-overlay"></div>
      </div>

      <!-- Floating particles decoration -->
      <div class="particle-light p1" aria-hidden="true"></div>
      <div class="particle-light p2" aria-hidden="true"></div>
      <div class="particle-light p3" aria-hidden="true"></div>

      <div class="container hero-container">
        <div class="hero-grid">
          <!-- Text Content (Left) -->
          <div class="hero-text-col">
            <span class="badge-premium-light">
              <i class="bi bi-shield-check-fill"></i> Calidad Ultra-Premium
            </span>
            <h1 class="hero-title">
              La <em>Pureza</em><br>
              Elevada a su<br>Máxima Expresión.
            </h1>
            <p class="hero-desc">
              Descubre el agua purificada por ósmosis inversa de <strong>Agua Moche</strong>.
              Hidratación segura y cristalina con calidad de grado clínico.
            </p>
            <div class="hero-actions">
              <router-link to="/productos" class="btn-hero-primary-light">
                Hacer mi pedido <i class="bi bi-arrow-right"></i>
              </router-link>
              <a href="#contacto" class="btn-hero-secondary-light">
                <i class="bi bi-geo-alt"></i> Zonas de Reparto
              </a>
            </div>

            <!-- Stats -->
            <div class="hero-stats-light">
              <div class="hero-stat">
                <h3>100%</h3>
                <p>Purificada</p>
              </div>
              <div class="hero-stat-div"></div>
              <div class="hero-stat">
                <h3>0</h3>
                <p>Impurezas</p>
              </div>
              <div class="hero-stat-div"></div>
              <div class="hero-stat">
                <h3>24h</h3>
                <p>Express</p>
              </div>
            </div>
          </div>

          <div class="hero-visual-col d-flex justify-content-center align-items-center">
            <img src="@/assets/moche3d1.png" alt="Logo de Agua Moche" class="hero-floating-img-large" />
          </div>
        </div>
      </div>
      
      <!-- SVG Wave Divider with Relief Glow -->
      <div class="section-relief-divider" aria-hidden="true" style="bottom: 0;">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="glow-grad-hero" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--ei-primary)" stop-opacity="0.4" />
              <stop offset="100%" stop-color="var(--ei-secondary)" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,15 Q360,55 720,15 T1440,15 L1440,60 L0,60 Z" fill="url(#glow-grad-hero)" />
          <path d="M0,25 Q360,60 720,25 T1440,25 L1440,60 L0,60 Z" fill="var(--am-bg-main)" />
        </svg>
      </div>
    </section>

    <!-- ══════════ 2.5 TRUST SEALS (Aquandes Style) ══════════ -->
    <section class="trust-seals-section py-4 bg-white border-bottom shadow-sm">
      <div class="container">
        <div class="row text-center align-items-center g-3">
          <div class="col-6 col-md-3 d-flex flex-column align-items-center justify-content-center">
            <i class="bi bi-truck fs-2 text-primary mb-2"></i>
            <span class="fw-bold text-slate-800" style="font-size: 0.9rem;">Despacho en 24 hrs</span>
            <small class="text-muted" style="font-size: 0.75rem;">Envíos en Trujillo</small>
          </div>
          <div class="col-6 col-md-3 d-flex flex-column align-items-center justify-content-center border-start-md">
            <i class="bi bi-shield-check fs-2 text-primary mb-2"></i>
            <span class="fw-bold text-slate-800" style="font-size: 0.9rem;">Pureza Garantizada</span>
            <small class="text-muted" style="font-size: 0.75rem;">Ósmosis Inversa</small>
          </div>
          <div class="col-6 col-md-3 d-flex flex-column align-items-center justify-content-center border-start-md">
            <i class="bi bi-credit-card-2-front fs-2 text-primary mb-2"></i>
            <span class="fw-bold text-slate-800" style="font-size: 0.9rem;">Pago Seguro</span>
            <small class="text-muted" style="font-size: 0.75rem;">Todos los medios</small>
          </div>
          <div class="col-6 col-md-3 d-flex flex-column align-items-center justify-content-center border-start-md">
            <i class="bi bi-whatsapp fs-2 text-primary mb-2"></i>
            <span class="fw-bold text-slate-800" style="font-size: 0.9rem;">Soporte Directo</span>
            <small class="text-muted" style="font-size: 0.75rem;">Atención personalizada</small>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════ SUBTLE REFERRAL STRIP ══════════ -->
    <section v-if="!isAuthenticated" class="referral-strip py-2">
      <div class="container">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <div class="d-flex align-items-center gap-3">
            <span class="badge bg-warning text-dark px-2 py-1"><i class="bi bi-star-fill"></i> Programa de Referidos</span>
            <span class="text-white fw-semibold mb-0" style="font-size: 0.9rem;">
              ¡Obtén un 10% de descuento acumulable por cada 20 registros con tu link!
            </span>
          </div>
          <router-link to="/login" class="btn btn-outline-warning btn-sm rounded-pill fw-bold transition-scale">
            Iniciar Sesión <i class="bi bi-arrow-right-short"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ══════════ FLOATING REFERRAL BUBBLE ══════════ -->
    <router-link v-if="!isAuthenticated" to="/login" class="referral-bubble shadow-lg">
      <div class="bubble-icon">
        <i class="bi bi-gift-fill"></i>
      </div>
      <div class="bubble-text">
        <span class="fw-bold d-block" style="line-height: 1.2;">¡Gana 10% Dcto!</span>
        <span class="small opacity-75" style="font-size: 0.75rem;">Por cada 20 registros</span>
      </div>
    </router-link>

    <!-- ══════════ 3. CATALOG / NAVIGATION ══════════ -->
    <div id="catalogo">
      <NavigationComponent />
    </div>

    <!-- ══════════ 4. NOSOTROS / ABOUT BRAND SECTION ══════════ -->
    <section id="nosotros" class="about-brand-section">
      <div class="container">
        <!-- Part 1: Quiénes Somos & Concepto de Marca -->
        <div class="row align-items-center g-5 mb-5 pb-4">
          <div class="col-12 col-lg-7">
            <span class="badge-premium-light mb-3">
              <i class="bi bi-compass-fill"></i> Identidad y Orgullo Trujillano
            </span>
            <h2 class="about-title fw-bold mb-3 text-slate-800">
              Agua Moche: la esencia de Trujillo en cada gota
            </h2>
            <h5 class="text-primary fw-bold mb-4">Purificada de verdad</h5>
            <div class="about-paragraphs text-muted leading-relaxed">
              <p class="mb-3">
                <strong>Agua Moche</strong> es una empresa 100% trujillana dedicada a la purificación, envasado y distribución de agua de alta calidad, creada con el propósito de ofrecer un producto confiable, seguro y premium para hogares, oficinas, empresas y negocios del norte del Perú. Nacimos en el año 2020 con una visión clara: construir una marca que represente la pureza, la identidad y el orgullo de Trujillo, combinando tecnología de purificación avanzada con una imagen moderna, elegante y culturalmente auténtica.
              </p>
              <p class="mb-3">
                Nuestra inspiración nace del legado histórico de la cultura Moche y del emblemático caballito de totora, símbolo ancestral de esfuerzo, conexión con el agua y tradición marina del norte peruano. En Agua Moche creemos que el agua no solo debe ser purificada, sino también transmitir confianza, bienestar y tranquilidad.
              </p>
              <p class="mb-0">
                Por ello trabajamos bajo procesos controlados y estándares enfocados en la calidad, utilizando sistemas de purificación mediante <strong>ósmosis inversa</strong> para garantizar un producto limpio, ligero y agradable al consumo diario. Más que vender agua, buscamos construir una marca cercana, reconocida y respetada, capaz de competir al más alto nivel tanto en calidad como en presentación.
              </p>
            </div>
          </div>
          <div class="col-12 col-lg-5 text-center">
            <div class="about-visual-card position-relative">
              <div class="visual-card-inner border rounded-5 overflow-hidden shadow-sm bg-white p-3">
                <video 
                  src="@/assets/videos/videoMoche.mp4" 
                  autoplay 
                  loop 
                  muted 
                  controls
                  playsinline 
                  class="img-fluid rounded-4 transition-scale shadow-sm" 
                  style="max-height: 420px; width: 100%; object-fit: cover;">
                </video>
              </div>
            </div>
          </div>
        </div>

        <!-- Part 2: Misión y Visión -->
        <div class="row g-5 mb-5 pb-4">
          <!-- Misión -->
          <div class="col-12 col-md-6">
            <div class="pe-md-4">
              <h3 class="fw-bold mb-4 text-slate-800 border-bottom pb-3 d-inline-block border-primary">Nuestra Misión</h3>
              <div class="text-muted leading-relaxed">
                <p class="mb-3">
                  Brindar agua purificada de excelente calidad mediante procesos tecnológicos avanzados y controles permanentes que garanticen seguridad, pureza y confianza en cada presentación que llega a nuestros clientes.
                </p>
                <p class="mb-3">
                  Contribuir al bienestar y la salud de las personas, manteniendo altos estándares de calidad en cada etapa del proceso, desde la purificación hasta la distribución final, posicionándonos como una empresa responsable, cercana y comprometida que combina pureza, buen servicio e identidad regional.
                </p>
                <p class="mb-0">
                  Tenemos el compromiso de seguir innovando constantemente en nuestros procesos, imagen y servicio, adaptándonos a las nuevas necesidades del mercado y fortaleciendo una marca que represente con orgullo a Trujillo y al norte del Perú.
                </p>
              </div>
            </div>
          </div>

          <!-- Visión -->
          <div class="col-12 col-md-6">
            <div class="ps-md-4 border-start">
              <h3 class="fw-bold mb-4 text-slate-800 border-bottom pb-3 d-inline-block border-secondary">Nuestra Visión</h3>
              <div class="text-muted leading-relaxed">
                <p class="mb-3">
                  Convertirnos en una de las marcas de agua purificada más reconocidas, confiables y valoradas del norte del Perú, destacando por nuestra calidad, innovación, identidad cultural y excelencia en el servicio.
                </p>
                <p class="mb-3">
                  Aspiramos a consolidar una marca sólida y moderna, capaz de competir con las principales empresas del sector, ofreciendo productos que no solo cumplan altos estándares de purificación, sino que también transmitan elegancia, confianza y sentido de pertenencia.
                </p>
                <p class="mb-0">
                  Queremos que Agua Moche sea reconocida como una empresa que representa la esencia de Trujillo y la riqueza cultural del norte peruano, expandiendo nuestras líneas de productos, fortaleciendo nuestra presencia comercial y construyendo una marca con impacto nacional.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Part 3: Valores Section -->
        <div class="row mb-5 text-center">
          <div class="col-12">
            <span class="badge-premium-light mb-3">Principios Rectores</span>
            <h2 class="fw-bold text-slate-800">Nuestros Valores</h2>
            <p class="text-muted mx-auto" style="max-width: 600px;">
              Pilares fundamentales sobre los cuales construimos confianza, bienestar y calidad cada día.
            </p>
          </div>
        </div>

        <div class="row g-5 justify-content-center">
          <!-- Valor 1: Calidad garantizada -->
          <div class="col-12 col-md-4 text-center">
            <h5 class="fw-bold text-slate-800 mb-3 pb-2 d-inline-block border-bottom border-primary">Calidad Garantizada</h5>
            <p class="text-muted small mx-auto" style="max-width: 250px;">
              Sistemas avanzados de ósmosis inversa y controles permanentes de pureza.
            </p>
          </div>
          <!-- Valor 2: Compromiso con la salud -->
          <div class="col-12 col-md-4 text-center">
            <h5 class="fw-bold text-slate-800 mb-3 pb-2 d-inline-block border-bottom border-primary">Compromiso con la Salud</h5>
            <p class="text-muted small mx-auto" style="max-width: 250px;">
              Entregamos un producto puro y libre de impurezas para el bienestar de tu familia.
            </p>
          </div>
          <!-- Valor 3: Atención Cercana -->
          <div class="col-12 col-md-4 text-center">
            <h5 class="fw-bold text-slate-800 mb-3 pb-2 d-inline-block border-bottom border-primary">Atención Cercana</h5>
            <p class="text-muted small mx-auto" style="max-width: 250px;">
              Un servicio amable, responsable y con despacho rápido en todo Trujillo.
            </p>
          </div>
        </div>
      </div>
      <!-- SVG Wave Divider with Relief Glow -->
      <div class="section-relief-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="glow-grad-about" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--ei-primary)" stop-opacity="0.4" />
              <stop offset="100%" stop-color="var(--ei-secondary)" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,15 Q360,55 720,15 T1440,15 L1440,60 L0,60 Z" fill="url(#glow-grad-about)" />
          <path d="M0,25 Q360,60 720,25 T1440,25 L1440,60 L0,60 Z" fill="rgba(15, 45, 90, 0.4)" />
        </svg>
      </div>
    </section>

    <!-- ══════════ LLEVALA CONTIGO (1.jpeg) ══════════ -->
    <section class="py-5 bg-white position-relative overflow-hidden" style="position: relative; overflow: hidden; padding-bottom: 100px !important;">
      <div class="container py-5">
        <div class="row align-items-center g-5">
          <div class="col-12 col-lg-6 order-lg-2">
            <span class="badge-premium-light mb-3">
              <i class="bi bi-droplet-half"></i> Llévala Contigo
            </span>
            <h2 class="fw-bold text-slate-800 mb-4">Hidratación en Todo Momento</h2>
            <p class="text-muted leading-relaxed mb-4">
              Nuestras botellas individuales son ideales para la oficina, el deporte o tu rutina diaria. Agua pura de grado clínico en envases ergonómicos que mantienen intacta la frescura de Agua Moche.
            </p>
            <router-link to="/productos" class="btn-hero-primary-light d-inline-flex" style="width: fit-content; border: none; font-size: 1rem;">
              Ver Formatos Personales <i class="bi bi-arrow-right"></i>
            </router-link>
          </div>
          <div class="col-12 col-lg-6 order-lg-1 text-center">
            <div class="position-relative d-inline-block w-100">
              <div class="visual-card-inner border rounded-5 overflow-hidden shadow-sm bg-white p-3">
                <img src="@/assets/images2/1.jpeg" class="img-fluid rounded-4 shadow-sm" alt="Botellas Individuales Agua Moche" style="height: 420px; width: 100%; object-fit: cover;">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- SVG Wave Divider with Relief Glow -->
      <div class="section-relief-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="glow-grad-llevala" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--ei-primary)" stop-opacity="0.4" />
              <stop offset="100%" stop-color="var(--ei-secondary)" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,15 Q360,55 720,15 T1440,15 L1440,60 L0,60 Z" fill="url(#glow-grad-llevala)" />
          <path d="M0,25 Q360,60 720,25 T1440,25 L1440,60 L0,60 Z" fill="rgba(16, 36, 84, 0.25)" />
        </svg>
      </div>
    </section>

    <!-- ══════════ 5. CONTACT / GET IN TOUCH SECTION ══════════ -->
    <section id="contacto" class="contact-section pt-0">
      
      <!-- Banner Despacho (2.jpeg) -->
      <div class="container-fluid px-0 mb-5 pb-3">
        <div class="row g-0">
           <div class="col-12 position-relative d-flex align-items-center justify-content-center" style="height: 350px;">
              <img src="@/assets/images2/2.jpeg" class="position-absolute w-100 h-100" style="object-fit: cover; z-index: 0;" alt="Flota de reparto Agua Moche">
              <div class="position-absolute top-0 start-0 w-100 h-100 bg-primary" style="opacity: 0.65; z-index: 1;"></div>
              <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark" style="opacity: 0.3; z-index: 1;"></div>
              <div class="text-center position-relative px-4" style="z-index: 2;">
                 <span class="badge bg-white text-primary px-4 py-2 rounded-pill mb-3 fw-bold" style="font-size: 0.9rem;"><i class="bi bi-truck me-2"></i>Despacho Express</span>
                 <h2 class="text-white fw-bold display-5 mb-3" style="font-family: var(--font-display);">Llevamos Salud Directo a tu Puerta</h2>
                 <p class="text-white mx-auto fs-5" style="max-width: 600px; opacity: 0.95;">Nuestra flota propia recorre Trujillo diariamente para asegurar que nunca te falte la mejor hidratación.</p>
              </div>
           </div>
        </div>
      </div>

      <div class="container">
        <!-- Row 1: Title and Info Cards -->
        <div class="row align-items-start g-4 mb-5">
          <div class="col-12 col-lg-7">
            <h2 class="contact-title text-start fw-bold mb-3 text-slate-800">Contáctanos</h2>
            <p class="contact-subtitle text-muted leading-relaxed" style="max-width: 600px;">
              Nos encantaría saber de ti. Si tienes alguna pregunta sobre nuestros procesos de purificación, necesitas soporte con tu despacho o quieres realizar una cotización corporativa, nuestro equipo está aquí para ayudarte.
            </p>
          </div>
          <div class="col-12 col-lg-5">
            <div class="d-flex flex-column gap-3">
              <!-- Address Card -->
              <div class="info-card-premium d-flex align-items-center p-3 rounded-4 shadow-sm border">
                <div class="info-icon-wrapper me-3">
                  <i class="bi bi-geo-alt-fill fs-4 text-primary"></i>
                </div>
                <div>
                  <h6 class="fw-bold mb-1 text-slate-800">Nuestra Dirección</h6>
                  <p class="text-muted mb-0 small">Girón independencia 830</p>
                </div>
              </div>
              <!-- Phone/Email Card -->
              <div class="info-card-premium d-flex align-items-center p-3 rounded-4 shadow-sm border">
                <div class="info-icon-wrapper me-3">
                  <i class="bi bi-telephone-fill fs-4 text-primary"></i>
                </div>
                <div>
                  <h6 class="fw-bold mb-1 text-slate-800">Datos de Contacto</h6>
                  <p class="text-muted mb-0 small">+51 961 745 295 | Contactoaguamoche@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 2: Full Width Map -->
        <div class="row mb-5">
          <div class="col-12">
            <div class="map-card-premium-light border shadow-sm rounded-4 overflow-hidden position-relative">
              <div class="contact-map-embed">
                <!-- Google Map centered in Trujillo/Moche, Peru -->
                <GMapMap
                  :center="contactMapCenter"
                  :zoom="14"
                  style="width: 100%; height: 400px"
                >
                  <GMapMarker
                    :position="contactMapCenter"
                    :clickable="true"
                  >
                    <GMapInfoWindow :opened="true">
                      <div class="p-1">
                        <h6 class="fw-bold mb-1 text-dark">Planta Principal Agua Moche</h6>
                        <p class="text-muted mb-0 small">El agua más pura de Trujillo</p>
                      </div>
                    </GMapInfoWindow>
                  </GMapMarker>
                </GMapMap>
              </div>
              <!-- Floating 'Cómo Llegar' Button -->
              <a 
                href="https://maps.google.com/?q=-8.1706,-79.0094" 
                target="_blank" 
                class="btn-directions position-absolute d-flex align-items-center gap-2"
              >
                <span>Cómo llegar</span>
                <i class="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Row 3: Contact Form -->
        <div class="row justify-content-center">
          <div class="col-12 col-md-10 col-lg-8">
            <div class="contact-form-card p-4 p-md-5 rounded-4 shadow-sm border bg-white">
              <h4 class="fw-bold text-center mb-4 text-slate-800">Envíanos un Mensaje</h4>
              <form @submit.prevent="handleSubmitContact">
                <div class="row g-4">
                  <!-- Name Input -->
                  <div class="col-12 col-md-6">
                    <label class="form-label-custom fw-semibold mb-2">Nombre Completo <span class="text-danger">*</span></label>
                    <div class="input-icon-group position-relative">
                      <i class="bi bi-person input-icon-inner position-absolute"></i>
                      <input 
                        type="text" 
                        class="form-control-custom w-100" 
                        placeholder="Ej. Juan Pérez" 
                        v-model="contactForm.name"
                        required
                      />
                    </div>
                  </div>
                  <!-- Email Input -->
                  <div class="col-12 col-md-6">
                    <label class="form-label-custom fw-semibold mb-2">Correo Electrónico <span class="text-danger">*</span></label>
                    <div class="input-icon-group position-relative">
                      <i class="bi bi-envelope input-icon-inner position-absolute"></i>
                      <input 
                        type="email" 
                        class="form-control-custom w-100" 
                        placeholder="Ej. juan@correo.com" 
                        v-model="contactForm.email"
                        required
                      />
                    </div>
                  </div>
                  <!-- Subject / Position Input -->
                  <div class="col-12">
                    <label class="form-label-custom fw-semibold mb-2">Asunto / Cargo <span class="text-danger">*</span></label>
                    <div class="input-icon-group position-relative">
                      <i class="bi bi-briefcase input-icon-inner position-absolute"></i>
                      <input 
                        type="text" 
                        class="form-control-custom w-100" 
                        placeholder="Ej. Cotización para Empresa / Soporte" 
                        v-model="contactForm.subject"
                        required
                      />
                    </div>
                  </div>
                  <!-- Message Input -->
                  <div class="col-12">
                    <label class="form-label-custom fw-semibold mb-2">Mensaje <span class="text-danger">*</span></label>
                    <div class="input-icon-group position-relative">
                      <i class="bi bi-chat-left-text input-icon-inner position-absolute" style="top: 15px;"></i>
                      <textarea 
                        class="form-control-custom w-100" 
                        rows="5" 
                        placeholder="Escribe tu mensaje aquí..." 
                        v-model="contactForm.message"
                        required
                      ></textarea>
                    </div>
                  </div>
                  <!-- Submit Button -->
                  <div class="col-12 text-center mt-4">
                    <button 
                      type="submit" 
                      class="btn-send-message px-5 py-3 d-inline-flex align-items-center gap-2"
                      :disabled="isSubmitting"
                    >
                      <span v-if="!isSubmitting">Enviar Mensaje</span>
                      <span v-else>Enviando...</span>
                      <i v-if="!isSubmitting" class="bi bi-send-fill"></i>
                      <span v-else class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- SVG Wave Divider with Relief Glow to Footer -->
      <div class="section-relief-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="glow-grad-footer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--ei-primary)" stop-opacity="0.5" />
              <stop offset="100%" stop-color="var(--ei-secondary)" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,15 Q360,55 720,15 T1440,15 L1440,60 L0,60 Z" fill="url(#glow-grad-footer)" />
          <path d="M0,25 Q360,60 720,25 T1440,25 L1440,60 L0,60 Z" fill="#0b1c3f" />
        </svg>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavigationComponent from '@/components/Navigation.vue'

const contactMapCenter = ref({ lat: -8.1706, lng: -79.0094 }) // Trujillo/Moche, Peru
const isAuthenticated = ref(false)

onMounted(() => {
  isAuthenticated.value = !!localStorage.getItem('access')
})

const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const handleSubmitContact = () => {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.')
    contactForm.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  }, 1500)
}
</script>

<style scoped>
.home-page-light {
  background: var(--ei-bg-radial);
  overflow-x: hidden;
}

/* ── Hero Section ─────────────────────────────── */
.intro-section-light-premium {
  position: relative;
  background: var(--am-bg-alt);
  padding: 120px 0 140px;
  overflow: hidden;
}

.hero-splash-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 0;
  overflow: hidden;
}

.hero-splash-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.15; /* Soft blend */
  mix-blend-mode: overlay;
}

.splash-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, rgba(30, 75, 133, 0.6) 0%, rgba(10, 31, 56, 0.8) 100%);
}

.hero-container {
  position: relative;
  z-index: 2;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 60px;
  align-items: center;
}

/* Text Col */
.badge-premium-light {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: rgba(0, 170, 228, 0.1);
  border: 1px solid rgba(0, 170, 228, 0.2);
  border-radius: 50px;
  color: var(--am-primary);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 24px;
}

.hero-title {
  font-family: var(--font-display) !important;
  font-size: clamp(3rem, 5vw, 4.5rem);
  font-weight: 800;
  line-height: 1.05;
  color: var(--am-text-main);
  margin-bottom: 24px;
  letter-spacing: -0.03em;
}

.hero-title em {
  font-style: normal;
  background: linear-gradient(135deg, var(--am-primary) 0%, var(--am-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 1.15rem;
  color: var(--am-text-muted);
  line-height: 1.7;
  max-width: 500px;
  margin-bottom: 40px;
}

.hero-desc strong {
  color: var(--am-secondary);
}

/* Actions */
.hero-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 50px;
}

.btn-hero-primary-light {
  padding: 16px 32px;
  background: var(--am-primary);
  color: #fff !important;
  font-weight: 700;
  border-radius: 50px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 8px 25px rgba(0, 170, 228, 0.3);
}

.btn-hero-primary-light:hover {
  transform: translateY(-4px);
  background: var(--am-secondary);
  box-shadow: 0 12px 35px rgba(0, 170, 228, 0.4);
}

.btn-hero-secondary-light {
  padding: 16px 32px;
  background: #ffffff;
  border: 1px solid var(--am-border);
  color: var(--am-text-main) !important;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.4s ease;
}

.btn-hero-secondary-light:hover {
  background: var(--am-bg-alt);
  border-color: #ccc;
}

/* Stats */
.hero-stats-light {
  display: flex;
  align-items: center;
  gap: 30px;
  border-top: 1px solid var(--am-border);
  padding-top: 30px;
}

.hero-stat h3 {
  font-family: var(--font-display) !important;
  color: var(--am-text-main);
  font-size: 2rem;
  margin: 0 0 5px 0;
}

.hero-stat p {
  color: var(--am-text-muted);
  font-size: 0.85rem;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero-stat-div {
  width: 1px;
  height: 40px;
  background: var(--am-border);
}

.hero-floating-img-large {
  width: 100%;
  max-width: 550px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 25px 35px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 40px rgba(106, 176, 255, 0.2));
  animation: floatHeavy 6s ease-in-out infinite;
}

@keyframes floatHeavy {
  0% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-20px) scale(1.02); }
  100% { transform: translateY(0px) scale(1); }
}

/* ── Delivery Section ──────────────────────────── */
.delivery-section {
  background: var(--am-bg-main);
  padding: 100px 0;
}

/* ── Referral Strip & Bubble ───────────────────── */
.referral-strip {
  background: linear-gradient(90deg, #0a1f38 0%, var(--ei-primary) 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.referral-bubble {
  position: fixed;
  bottom: 30px;
  left: 30px;
  background: linear-gradient(135deg, var(--ei-primary) 0%, var(--ei-secondary) 100%);
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding: 6px 18px 6px 6px;
  color: white;
  text-decoration: none;
  box-shadow: 0 10px 25px rgba(0, 170, 228, 0.4);
  z-index: 1050;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.referral-bubble:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 15px 30px rgba(0, 170, 228, 0.6);
  color: white;
}
.bubble-icon {
  background: white;
  color: var(--ei-primary);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  margin-right: 10px;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.1);
  animation: pulseGift 2s infinite;
}
@keyframes pulseGift {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}
.transition-scale {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.transition-scale:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 10px 20px rgba(255, 193, 7, 0.4) !important;
}

.section-title {
  font-family: var(--font-display) !important;
  font-size: clamp(2.2rem, 3vw, 3rem);
  font-weight: 700;
  color: var(--am-text-main);
  margin-bottom: 10px;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--am-text-muted);
}

.map-card-premium-light {
  background: rgba(10, 31, 56, 0.5);
  border: 1px solid rgba(106, 176, 255, 0.3);
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.05);
  margin-top: 40px;
}

.map-card-header-light {
  padding: 20px 30px;
  background: var(--am-bg-alt);
  border-bottom: 1px solid var(--am-border);
  font-weight: 600;
  color: var(--am-text-main);
  display: flex;
  align-items: center;
  gap: 10px;
}

.map-embed {
  height: 580px;
}

/* ── Contact Section ───────────────────────────── */
.contact-section {
  background: var(--am-bg-alt);
  padding: 100px 0 160px;
  border-top: 1px solid var(--am-border);
  position: relative;
  overflow: hidden;
}

.contact-title {
  font-family: var(--font-display) !important;
  font-size: clamp(2.2rem, 3vw, 3rem);
  color: var(--am-text-main);
}

.info-card-premium {
  background: #ffffff;
  border: 1px solid var(--am-border);
  transition: all 0.3s ease;
}

.info-card-premium:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 170, 228, 0.05) !important;
  border-color: rgba(0, 170, 228, 0.3);
}

.info-icon-wrapper {
  width: 50px;
  height: 50px;
  background-color: rgba(0, 170, 228, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-icon-wrapper i {
  color: var(--am-primary) !important;
}

.btn-directions {
  bottom: 20px;
  left: 20px;
  background-color: var(--am-primary);
  color: #ffffff !important;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 8px 25px rgba(0, 170, 228, 0.3);
  transition: all 0.3s ease;
  z-index: 10;
}

.btn-directions:hover {
  background-color: var(--am-secondary);
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(0, 170, 228, 0.4);
}

/* Contact Form */
.contact-form-card {
  border: 1px solid var(--am-border);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.03);
}

.form-label-custom {
  font-size: 0.85rem;
  color: var(--am-text-main);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.input-icon-group .input-icon-inner {
  top: 18px;
  left: 20px;
  color: var(--am-text-muted);
  font-size: 1.1rem;
}

.form-control-custom {
  border: 1px solid var(--am-border);
  border-radius: 12px;
  padding: 15px 20px 15px 50px;
  font-size: 0.95rem;
  color: var(--am-text-main);
  background-color: #ffffff;
  outline: none;
  transition: all 0.3s ease;
}

.form-control-custom:focus {
  border-color: var(--am-primary);
  box-shadow: 0 0 0 4px rgba(0, 170, 228, 0.1);
  background-color: #ffffff;
}

.btn-send-message {
  background-color: var(--am-primary);
  color: #ffffff;
  border: none;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 8px 25px rgba(0, 170, 228, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-send-message:hover:not(:disabled) {
  background-color: var(--am-secondary);
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(0, 170, 228, 0.3);
}

.btn-send-message:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Particles */
.particle-light { position: absolute; background: var(--am-primary); border-radius: 50%; opacity: 0.15; }
.p1 { width: 12px; height: 12px; top: 20%; left: 10%; }
.p2 { width: 8px; height: 8px; top: 60%; right: 5%; }
.p3 { width: 20px; height: 20px; bottom: 10%; left: 40%; opacity: 0.05; }

/* Responsive */
@media (max-width: 1024px) {
  .hero-grid { grid-template-columns: 1fr; }
  .glass-hero-card-light { margin-top: 40px; }
}

/* ── About Brand Section ──────────────────────── */
.about-brand-section {
  background: var(--am-bg-main);
  padding: 120px 0 160px;
  border-top: 1px solid var(--am-border);
  position: relative;
  overflow: hidden;
}

.about-title {
  font-family: var(--font-display) !important;
  font-size: clamp(2.2rem, 3.5vw, 3.2rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.about-paragraphs p {
  font-size: 1.05rem;
  line-height: 1.75;
}

.about-visual-card {
  max-width: 440px;
  margin: 0 auto;
}

.visual-card-inner {
  background: #ffffff;
  border-color: var(--am-border) !important;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.04) !important;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-visual-card:hover .visual-card-inner {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0, 170, 228, 0.1) !important;
  border-color: rgba(0, 170, 228, 0.3) !important;
}

.transition-scale {
  transition: transform 0.5s ease;
}

/* Mission & Vision Cards */
.mission-vision-card {
  background: #ffffff;
  border-color: var(--am-border) !important;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.mission-vision-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.06) !important;
  border-color: rgba(0, 170, 228, 0.25) !important;
}

.icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.bg-primary-light {
  background-color: rgba(0, 170, 228, 0.08);
}

.bg-secondary-light {
  background-color: rgba(0, 98, 204, 0.08);
}

.card-glow-bg {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.15;
  pointer-events: none;
  z-index: 0;
}

.card-content p {
  font-size: 0.95rem;
  line-height: 1.65;
}

/* Value Cards */
.value-card {
  border-color: var(--am-border) !important;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 170, 228, 0.06) !important;
  border-color: rgba(0, 170, 228, 0.25) !important;
}

.value-icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(112, 195, 212, 0.08);
  border: 1px solid rgba(112, 195, 212, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: inset 0 0 10px rgba(112, 195, 212, 0.05);
}

.value-svg-icon {
  width: 28px;
  height: 28px;
  stroke: var(--ei-primary);
  filter: drop-shadow(0 2px 8px rgba(112, 195, 212, 0.3));
  transition: transform 0.3s ease;
}

.value-card:hover .value-svg-icon {
  transform: scale(1.1) rotate(5deg);
}

.text-primary-dark {
  color: #0b1c3f !important;
}

/* Gallery Styles */
.brand-gallery-section {
  background-color: var(--am-bg-main);
  border-top: 1px solid var(--am-border);
  position: relative;
  padding: 80px 0;
}

.gallery-card {
  border-color: var(--am-border) !important;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.gallery-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 170, 228, 0.08) !important;
  border-color: rgba(0, 170, 228, 0.3) !important;
}

.gallery-img-wrap {
  height: 240px;
  background-color: var(--am-bg-alt);
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-img-wrap img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.gallery-card:hover .gallery-img-wrap img {
  transform: scale(1.08);
}

.gallery-badge-floating {
  position: absolute;
  top: 15px;
  right: 15px;
  background: var(--am-primary);
  color: #ffffff;
  padding: 5px 12px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(0, 170, 228, 0.25);
  z-index: 2;
}

/* Relief Dividers */
.section-relief-divider {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  line-height: 0;
  height: 60px;
  pointer-events: none;
  z-index: 5;
}

.section-relief-divider svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>