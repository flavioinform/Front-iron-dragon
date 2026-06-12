<template>
  <div id="carouselExample" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="6000">
    <!-- Indicadores -->
    <div class="carousel-indicators-light">
      <button 
        type="button" 
        data-bs-target="#carouselExample" 
        data-bs-slide-to="0" 
        class="active" 
        aria-current="true" 
        aria-label="Slide 1"
      ></button>
      <button 
        type="button" 
        data-bs-target="#carouselExample" 
        data-bs-slide-to="1" 
        aria-label="Slide 2"
      ></button>
      <button 
        type="button" 
        data-bs-target="#carouselExample" 
        data-bs-slide-to="2" 
        aria-label="Slide 3"
      ></button>
      <button 
        type="button" 
        data-bs-target="#carouselExample" 
        data-bs-slide-to="3" 
        aria-label="Slide 4"
      ></button>
    </div>

    <!-- Slides -->
    <div class="carousel-inner">
      <!-- Slide 1: Pureza Absoluta (4.jpeg) -->
      <div class="carousel-item active">
        <div class="carousel-img-wrap">
          <div class="carousel-gradient-overlay"></div>
          <img src="@/assets/images2/4.jpeg" class="d-block w-100 carousel-img" alt="Pureza Absoluta">
        </div>
        <div class="carousel-caption-container">
          <div class="glass-caption-light">
            <span class="caption-badge-light"><i class="bi bi-shield-check-fill me-1"></i> Pureza Absoluta</span>
            <h1 class="caption-title-light">Agua Ultra <em>Purificada</em></h1>
            <p class="caption-desc-light">
              Fórmula de pureza excepcional procesada mediante ósmosis inversa multietapa. Libre de sodio, cloro y metales pesados para el bienestar de tu familia.
            </p>
            <div class="caption-actions-light">
              <router-link to="/productos" class="btn-primary-am btn-lg-light">
                <i class="bi bi-cart-fill me-2"></i> Explorar Catálogo
              </router-link>
              <a href="#contacto" class="btn-secondary-light ms-2">
                Zonas de Entrega
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Slide 2: Bidones de 20 Litros (3.jpeg) -->
      <div class="carousel-item">
        <div class="carousel-img-wrap">
          <div class="carousel-gradient-overlay"></div>
          <img src="@/assets/images2/3.jpeg" class="d-block w-100 carousel-img" alt="Bidones de 20 Litros">
        </div>
        <div class="carousel-caption-container">
          <div class="glass-caption-light">
            <span class="caption-badge-light"><i class="bi bi-droplet-fill me-1"></i> Formato Familiar</span>
            <h1 class="caption-title-light">Bidones de <em>20 Litros</em></h1>
            <p class="caption-desc-light">
              El tamaño ideal para el consumo diario en tu hogar u oficina. Envases retornables de policarbonato libre de BPA que cuidan tu salud y el planeta.
            </p>
            <div class="caption-actions-light">
              <router-link to="/productos" class="btn-primary-am btn-lg-light">
                <i class="bi bi-bag-plus-fill me-2"></i> Pedir Recarga
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Slide 3: Formatos Personales (1.jpeg) -->
      <div class="carousel-item">
        <div class="carousel-img-wrap">
          <div class="carousel-gradient-overlay"></div>
          <img src="@/assets/images2/1.jpeg" class="d-block w-100 carousel-img" alt="Formatos Personales">
        </div>
        <div class="carousel-caption-container">
          <div class="glass-caption-light">
            <span class="caption-badge-light"><i class="bi bi-activity me-1"></i> Hidratación Activa</span>
            <h1 class="caption-title-light">Formatos <em>Personales</em></h1>
            <p class="caption-desc-light">
              Lleva la pureza de Agua Moche contigo a donde vayas. Botellas individuales prácticas y seguras, perfectas para tu entrenamiento y oficina.
            </p>
            <div class="caption-actions-light">
              <router-link to="/productos" class="btn-primary-am btn-lg-light">
                <i class="bi bi-grid-3x3-gap-fill me-2"></i> Ver Formatos
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Slide 4: Despacho Express (2.jpeg) -->
      <div class="carousel-item">
        <div class="carousel-img-wrap">
          <div class="carousel-gradient-overlay"></div>
          <img src="@/assets/images2/2.jpeg" class="d-block w-100 carousel-img" alt="Despacho Express">
        </div>
        <div class="carousel-caption-container">
          <div class="glass-caption-light">
            <span class="caption-badge-light"><i class="bi bi-truck me-1"></i> Flota Propia</span>
            <h1 class="caption-title-light">Despacho Express <em>en Trujillo</em></h1>
            <p class="caption-desc-light">
              Llevamos agua purificada directamente a tu hogar o negocio con entregas rápidas y garantizadas en toda la ciudad. ¡Nunca te quedes sin frescura!
            </p>
            <div class="caption-actions-light">
              <a href="#contacto" class="btn-primary-am btn-lg-light">
                <i class="bi bi-map-fill me-2"></i> Ver Cobertura
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Controles -->
    <button class="carousel-control-prev-light" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
      <span class="control-circle-light" aria-hidden="true">
        <i class="bi bi-chevron-left"></i>
      </span>
      <span class="visually-hidden">Anterior</span>
    </button>
    <button class="carousel-control-next-light" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
      <span class="control-circle-light" aria-hidden="true">
        <i class="bi bi-chevron-right"></i>
      </span>
      <span class="visually-hidden">Siguiente</span>
    </button>
  </div>
</template>

<script setup>
</script>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.carousel-img-wrap {
  position: relative;
  width: 100%;
}

.carousel-img {
  height: 650px;
  object-fit: cover;
  object-position: center;
  transition: transform 8s ease-out;
}

.carousel-item.active .carousel-img {
  transform: scale(1.05);
}

/* Sutil degradado para que el texto de cristal se lea perfecto sobre fotos muy brillantes */
.carousel-gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0.1) 60%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 1;
}

/* Contenedor asimétrico estilo Dribbble */
.carousel-caption-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 8%;
}

/* Light Glassmorphism Box */
.glass-caption-light {
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(25px) saturate(120%);
  -webkit-backdrop-filter: blur(25px) saturate(120%);
  border: 1px solid rgba(255, 255, 255, 0.9);
  padding: 45px;
  border-radius: 30px;
  max-width: 600px;
  box-shadow: 0 25px 50px rgba(0, 170, 228, 0.08), inset 0 2px 10px rgba(255,255,255,0.5);
  animation: slideRightFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.caption-badge-light {
  display: inline-flex;
  align-items: center;
  background: rgba(0, 170, 228, 0.1);
  color: var(--am-primary);
  font-weight: 700;
  font-size: 0.8rem;
  padding: 8px 16px;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 20px;
  border: 1px solid rgba(0, 170, 228, 0.2);
}

.caption-title-light {
  font-family: var(--font-display) !important;
  font-size: clamp(2.8rem, 4vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 20px;
  color: var(--am-text-main);
  letter-spacing: -0.02em;
}

.caption-title-light em {
  font-style: normal;
  background: linear-gradient(135deg, var(--am-primary) 0%, var(--am-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.caption-desc-light {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--am-text-muted);
  margin-bottom: 30px;
}

.caption-actions-light {
  display: flex;
  gap: 15px;
}

.btn-lg-light {
  font-size: 1.05rem;
  padding: 14px 30px;
  border-radius: 50px;
  box-shadow: 0 8px 20px rgba(0, 170, 228, 0.25);
}
.btn-lg-light:hover {
  box-shadow: 0 10px 25px rgba(0, 170, 228, 0.35);
  transform: translateY(-2px);
}

.btn-secondary-light {
  background: #ffffff;
  color: var(--am-text-main);
  border: 1px solid var(--am-border);
  font-weight: 600;
  font-size: 1.05rem;
  padding: 14px 30px;
  border-radius: 50px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s;
}

.btn-secondary-light:hover {
  background: var(--am-bg-alt);
  border-color: #ccc;
  transform: translateY(-2px);
}

/* Indicadores Clean */
.carousel-indicators-light {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 15;
  display: flex;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.carousel-indicators-light button {
  width: 30px;
  height: 6px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0,0,0,0.1);
  transition: all 0.3s;
  cursor: pointer;
}

.carousel-indicators-light button.active {
  width: 45px;
  background-color: var(--am-primary);
  border-color: transparent;
  box-shadow: 0 0 10px rgba(0, 170, 228, 0.5);
}

/* Controles Clean Glass */
.carousel-control-prev-light,
.carousel-control-next-light {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 15;
  border: none;
  background: transparent;
  padding: 0 30px;
  cursor: pointer;
  height: 100px;
  display: flex;
  align-items: center;
}

.carousel-control-prev-light { left: 0; }
.carousel-control-next-light { right: 0; }

.control-circle-light {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--am-primary);
  font-size: 1.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  transition: all 0.3s;
}

.carousel-control-prev-light:hover .control-circle-light,
.carousel-control-next-light:hover .control-circle-light {
  background: #ffffff;
  color: var(--am-secondary);
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(0, 170, 228, 0.2);
}

@keyframes slideRightFade {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsivo */
@media (max-width: 991px) {
  .carousel-img {
    height: 600px;
  }
  .carousel-caption-container {
    padding: 0 5%;
    justify-content: center;
  }
  .glass-caption-light {
    padding: 30px;
    border-radius: 20px;
    max-width: 100%;
    margin-top: 40px;
  }
  .caption-title-light {
    font-size: 2.2rem;
  }
  .carousel-control-prev-light,
  .carousel-control-next-light {
    display: none;
  }
}

@media (max-width: 576px) {
  .carousel-img {
    height: 550px;
  }
  .glass-caption-light {
    padding: 20px;
    margin-top: 80px;
  }
  .caption-title-light {
    font-size: 1.8rem;
  }
  .caption-desc-light {
    font-size: 0.95rem;
    margin-bottom: 20px;
  }
  .caption-actions-light {
    flex-direction: column;
    gap: 10px;
  }
  .btn-lg-light, .btn-secondary-light {
    width: 100%;
    justify-content: center;
    margin-left: 0 !important;
  }
}
</style>