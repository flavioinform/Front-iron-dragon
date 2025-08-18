<template>
  <section>
    <div class="container-fluid bg-light px-0">
      <div class="row g-0">
        <!-- Tarjeta fija de "Categorías" -->
        <div class="col-6 col-md-3">
          <div
            class="card category-card h-100 shadow-sm text-center d-flex align-items-center justify-content-center bg-dark text-white"
          >
            <h3 class="fw-bold mb-0">CATEGORÍAS</h3>
          </div>
        </div>

        <!-- Tarjetas dinámicas de categorías -->
        <div
          class="col-6 col-md-3"
          v-for="category in categories"
          :key="category.id"
        >
          <!-- Ahora redirige usando query param -->
          <div
            class="card category-card h-100 shadow-sm text-center p-3"
            @click="goToCategory(category.id)"
            style="cursor: pointer;"
          >
            <img
              :src="category.image"
              class="card-img-top img-fluid mx-auto d-block"
              :alt="'imagen de ' + category.name"
              style="max-height: 150px; object-fit: contain;"
            >
            <div class="card-body">
              <h6 class="card-title fw-bold text-danger">{{ category.name}}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
      <img class="d-block w-100" src="../assets/videos/bannerdra.gif" alt="GIF Banner">


      </div>
      <div class="carousel-item">
        <img src="../assets/images/Irondr.png" class="d-block w-100" alt="imagen random">
      </div>
      <div class="carousel-item">
        <img src="../assets/images/supl.png" class="d-block w-100" alt="imagen random">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
   <div class="container mt-5">
  <div v-for="category in categories" :key="category.id" class="mb-5 ">
    <!-- Título de la categoría -->
   <div class="red">
  <h3 class="fw-bold text-danger text-center mb-2 color-">{{ category.name }}</h3>
</div>


    <!-- Productos de esa categoría -->
    <div class="row">
      <div 
        class="col-6 col-md-3 mb-4" 
        v-for="product in category.products" 
        :key="product.id"
      >
        <div class="card category-card  h-100 shadow-sm text-center p-3" @click="goToProduct(product.id)"
          style="cursor: pointer;">
          <img 
            :src="product.image" 
            class="card-img-top img-fluid mx-auto d-block" 
            :alt="'imagen de ' + product.name"
            style="max-height: 150px; object-fit: contain;"
          >
          <div class="card-body">
            <h6 class="card-title fw-bold">{{ product.name }}</h6>
            <p class="text-danger fw-bold">${{ product.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
 <section class="brands-section">
        <div class="container">
            <div class="section-title">
                <h2>Nuestras Marcas</h2>
            </div>

            <div id="brandsCarousel" class="carousel slide brand-carousel" data-bs-ride="carousel" data-bs-interval="5000">
                <div class="carousel-inner">
                    <!-- Primer slide -->
                    <div class="carousel-item active">
                        <div class="brand-container">
                            <div class="brand-item">
                                <img src="../assets/images/nike.png" alt="Nike">
                            </div>
                            <div class="brand-item">
                                <img src="../assets/images/bio.png" alt="SunVit">
                            </div>
                            <div class="brand-item">
                                <img src="../assets/images/bpi.png" alt="Greathlete">
                            </div>
                            <div class="brand-item">
                                <img src="../assets/images/umbro.png" alt="Ronnie Coleman">
                            </div>
                            <div class="brand-item">
                                <img src="../assets/images/nutrex.png" alt="Dymatize">
                            </div>
                            <div class="brand-item">
                                <img src="../assets/images/unss.png" alt="Ultimate Nutrition">
                            </div>
                            <div class="brand-item">
                                <img src="../assets/images/naba.png" alt="Optimum Nutrition">
                            </div>
                            <div class="brand-item">
                                <img src="../assets/images/herb.png" alt="BSN">
                            </div>
                        </div>
                    </div>

                    <!-- Segundo slide -->
                    <div class="carousel-item">
                        <div class="brand-container">
                            <div class="brand-item">
                                <img src="../assets/images/logodr.png" alt="Marca 9">
                            </div>
                            <div class="brand-item">
                                <img src="../assets/images/logodr.png" alt="Marca 10">
                            </div>
                            <div class="brand-item">
                                <img src="../assets/images/nike.png" alt="Marca 11">
                            </div>
                            <div class="brand-item">
                                <img src="../assets/images/rc.png" alt="Marca 12">
                            </div>
                            <div class="brand-item">
                                <img src="../assets/images/muscle.png" alt="Marca 13">
                            </div>
                            <div class="brand-item">
                                <img src="../assets/images/bio.png" alt="Marca 14">
                            </div>
                            <div class="brand-item">
                                <img src="../assets/images/gat.png" alt="Marca 15">
                            </div>
                            <div class="brand-item">
                                <img src="../assets/images/usn.png" alt="Marca 16">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Controles de navegación -->
                <button class="carousel-control-prev" type="button" data-bs-target="#brandsCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Anterior</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#brandsCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Siguiente</span>
                </button>

                <!-- Indicadores -->
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#brandsCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#brandsCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                </div>
            </div>
        </div>
    </section>



  </section>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const categories = ref([])
const router = useRouter()

const goToCategory = (id) => {
  router.push({ name: 'productos', query: { category: id } })
} 
const goToProduct = (id) => {
  router.push({ name: 'productDetail', params: { id } })
}


const products = ref([])

onMounted(async () => {
  try {
    const [catRes, prodRes] = await Promise.all([
      axios.get('http://127.0.0.1:8000/api/categories/'),
      axios.get('http://127.0.0.1:8000/api/products/')
    ])

    const cats = catRes.data
    const prods = prodRes.data

    // unir productos a su categoría
    cats.forEach(cat => {
      cat.products = prods.filter(p => p.category === cat.id)
    })

    categories.value = cats
  } catch (err) {
    console.error('Error cargando datos:', err)
  }
})

</script>

<style scoped>
.category-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.category-card:hover {
  transform: scale(1.05);
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15) !important;
}
.red {
  background-image: white;
  padding: 2%;
  width: 80vw; /* Asegura que cubra todo el ancho de la ventana */
  margin-left: 40px; /* Elimina cualquier margen izquierdo que impida que ocupe todo el ancho */
  margin-right: 1000px; /* Elimina cualquier margen derecho */
  box-sizing: border-box;
  margin-bottom: 30px;
  
  /* Asegura que el padding no afecte el ancho total */
}

        .brands-section {
            background: linear-gradient(135deg,white, white 100%);
            padding: 80px 0;
            position: relative;
            overflow: hidden;
        }

        .brands-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23ffffff" stroke-width="0.5" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.3;
        }

        .section-title {
            text-align: center;
            margin-bottom: 60px;
            position: relative;
            z-index: 2;
        }

        .section-title h2 {
            font-size: 2.5rem;
            font-weight: 700;
            color: #0a0a0a;
            margin-bottom: 20px;
            position: relative;
            display: inline-block;
        }

        .section-title h2::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 4px;
            background: linear-gradient(45deg, black, black);
            border-radius: 2px;
        }

        .brand-carousel {
            position: relative;
            z-index: 2;
        }

        .carousel-inner {
            padding: 40px 0;
        }

        .brand-container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 40px;
            flex-wrap: nowrap;
            overflow-x: auto;
            padding: 0 20px;
        }

        .brand-item {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px white;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 150px;
            height: 90px;
            position: relative;
            overflow: hidden;
            flex-shrink: 0;
        }

        .brand-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, white, transparent);
            transition: left 0.5s;
        }

        .brand-item:hover::before {
            left: 100%;
        }

        .brand-item:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .brand-item img {
            max-width: 100%;
            max-height: 60px;
            object-fit: contain;
            transition: all 0.3s ease;
            filter: grayscale(30%);
        }

        .brand-item:hover img {
            filter: grayscale(0%);
            transform: scale(1.1);
        }

        .carousel-control-prev,
        .carousel-control-next {
            width: 60px;
            height: 60px;
            background: linear-gradient(45deg, red, red);
            border-radius: 50%;
            top: 50%;
            transform: translateY(-50%);
            opacity: 1;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px red;
        }

        .carousel-control-prev:hover,
        .carousel-control-next:hover {
            background: linear-gradient(45deg, red, red);
            transform: translateY(-50%) scale(1.1);
            box-shadow: 0 8px 25px red;
        }

        .carousel-control-prev {
            left: -30px;
        }

        .carousel-control-next {
            right: -30px;
        }

        .carousel-control-prev-icon,
        .carousel-control-next-icon {
            width: 24px;
            height: 24px;
            background-size: 100%, 100%;
        }

        .carousel-control-prev-icon::before {
            content: '\f053';
            font-family: 'Font Awesome 6 Free';
            font-weight: 900;
            color: white;
            font-size: 18px;
        }

        .carousel-control-next-icon::before {
            content: '\f054';
            font-family: 'Font Awesome 6 Free';
            font-weight: 900;
            color: white;
            font-size: 18px;
        }

        .carousel-control-prev-icon,
        .carousel-control-next-icon {
            background-image: none !important;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .brand-container {
                gap: 15px;
                padding: 0 10px;
            }
            
            .brand-item {
                min-width: 120px;
                height: 70px;
                padding: 15px;
            }
            
            .section-title h2 {
                font-size: 2rem;
            }
            
            .carousel-control-prev,
            .carousel-control-next {
                width: 50px;
                height: 50px;
            }
            
            .carousel-control-prev {
                left: -15px;
            }
            
            .carousel-control-next {
                right: -15px;
            }
        }

        @media (max-width: 1200px) {
            .brand-container {
                gap: 25px;
            }
            
            .brand-item {
                min-width: 130px;
            }
        }

        /* Indicadores personalizados */
        .carousel-indicators {
            bottom: -50px;
        }

        .carousel-indicators button {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid red;
            background-color: transparent;
            opacity: 0.5;
            margin: 0 8px;
            transition: all 0.3s ease;
        }

        .carousel-indicators button.active {
            background-color: red;
            opacity: 1;
            transform: scale(1.2);
        }
    
</style>