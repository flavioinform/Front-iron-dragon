<template>
  <h3 class="text-center mb-3 text-danger fw-bold fs-2 pt-3">Sucursales Agua Moche</h3>
  <div class="map-container">
    <!-- Mapa centrado en Iquique -->
    <GMapMap
      :center="center"
      :zoom="13"
      style="width: 100%; height: 500px"
    >
      <!-- Marcadores de lugares -->
      <GMapMarker
        v-for="(place, index) in places"
        :key="index"
        :position="place.position"
        :clickable="true"
        :draggable="false"
      >
        <GMapInfoWindow :opened="true">
          <div class="p-1">
            <h6 class="fw-bold mb-1 text-dark">{{ place.name }}</h6>
            <p class="text-muted mb-0 small">{{ place.type }}</p>
          </div>
        </GMapInfoWindow>
      </GMapMarker>
    </GMapMap>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Centro de Iquique
const center = ref({ lat: -20.2133, lng: -70.1524 })

// Lugares (ejemplo, luego podemos hacerlo dinámico con Google Places API)
const places = ref([
  {
    name: 'Estadio Tierra de Campeones',
    type: 'Estadio',
    position: { lat: -20.2292, lng: -70.1356 },
  },
  {
    name: 'Parque Playa Brava',
    type: 'Parque',
    position: { lat: -20.2404, lng: -70.1388 },
  },
  {
    name: 'Gimnasio Municipal',
    type: 'Gimnasio',
    position: { lat: -20.2165, lng: -70.1412 },
  },
])
</script>

<style>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
