<template>
  <section class="politic-premium-section">
    <!-- Banner de Política y Privacidad -->
    <div class="politic-hero text-center text-white d-flex align-items-center justify-content-center">
      <div class="hero-overlay"></div>
      <div class="hero-content-box animate-fade-up">
        <span class="sub-badge">LEGAL</span>
        <h1 class="display-4 fw-bold mt-2">Términos y Condiciones</h1>
        <p class="lead mt-3 mx-auto" style="max-width: 600px;">
          Términos de servicio y políticas de privacidad aplicables al uso de nuestro sitio web.
        </p>
      </div>
    </div>

    <!-- Contenido Legal -->
    <div class="container py-5 text-slate-800">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10">
          <div class="legal-card p-5 bg-white shadow-sm rounded-4 border border-light">
            <h3 class="fw-bold mb-4 text-primary">Política de Privacidad de Agua Moche</h3>
            <p class="legal-paragraph mb-4">
              Lea detenidamente estos Términos y Condiciones antes de utilizar este sitio web y cualquier contenido de <strong>Agua Moche</strong> en sitios de redes sociales (incluyendo sin limitación alguna Facebook, Instagram y WhatsApp) (conjuntamente: el Sitio). Estos Términos y Condiciones serán de aplicación a todas las visitas y uso del Sitio, así como al Contenido (como se define más adelante), información, recomendaciones, productos y/o servicios ofrecidos a usted en o a través del Sitio. Al acceder y utilizar el Sitio, usted acepta estos Términos y Condiciones en su totalidad, además de cualquier otra ley o reglamento que sea aplicable al Sitio y a Internet. Si no acepta estos Términos y Condiciones en su totalidad, por favor, abandone el Sitio.
            </p>

            <h4 class="fw-bold mt-5 mb-3 text-slate-900">Contenido del Sitio</h4>
            <p class="legal-paragraph mb-4">
              Todo el contenido que aparece en el Sitio, incluyendo, aunque sin limitarse a ellos, logos, iconos, marcas comerciales, texto, gráficos, fotografías, imágenes, imágenes en movimiento, sonido, ilustraciones y software (Contenido), es propiedad de <strong>Agua Moche</strong>, sus licenciatarios y/o sus proveedores de contenidos. Todos los elementos del Sitio, incluyendo el diseño general y el Contenido, están protegidos por el derecho de autor, derechos morales, derechos sobre bases de datos, normativas sobre marcas comerciales y otras leyes relativas al derecho de propiedad intelectual industrial.
            </p>
            <p class="legal-paragraph mb-4">
              Salvo en los casos expresamente permitidos bajo este u otro acuerdo escrito con <strong>Agua Moche</strong>, ninguna parte o elemento del Sitio o su Contenido puede ser copiado o retransmitido por ningún medio. El Sitio, su Contenido y todos los derechos relacionados continuarán siendo propiedad exclusiva de <strong>Agua Moche</strong>, o sus licenciatarios, salvo que se acuerde expresamente otra cosa. Todas las imágenes o fotos publicadas en representación de los productos a la venta o en promoción de esta página o las redes publicitarias de <strong>Agua Moche</strong> son consideradas como referenciales y no están sujetas a la descripción exacta del producto en cuestión. Todos los derechos están reservados.
            </p>

            <h4 class="fw-bold mt-5 mb-3 text-slate-900">Despachos y Retiros</h4>
            <p class="legal-paragraph mb-4">
              El servicio de entrega a domicilio se rige por las zonas de cobertura informadas en nuestra página principal. <strong>Agua Moche</strong> se reserva el derecho de rechazar entregas en ubicaciones fuera del límite de cobertura o que comprometan la seguridad de nuestros repartidores. Las cancelaciones de pedidos deben realizarse con un mínimo de 2 horas de anticipación a la ventana horaria elegida.
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
.politic-premium-section {
  background-color: #f8fafc;
}

/* Hero Section */
.politic-hero {
  position: relative;
  background-image: linear-gradient(rgba(3, 105, 161, 0.4), rgba(2, 132, 199, 0.8)), url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  height: 300px;
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

.legal-card {
  border-radius: 20px;
  background-color: #ffffff;
  border: 1px solid #f1f5f9;
}

.legal-paragraph {
  font-size: 0.95rem;
  line-height: 1.8;
  color: #475569;
}

.text-slate-800 {
  color: #334155;
}

.text-slate-900 {
  color: #0f172a;
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