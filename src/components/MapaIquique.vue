<template>
  <h2 class="text-center mb-4 text-danger text-bold">Sitios de Deporte en Iquique</h2>
  <div class="map-container">
    <!-- Mapa centrado en Iquique -->
    <GMapMap
      :center="center"
      :zoom="13"
      style="width: 100%; height: 600px"
    >
      <!-- Marcadores de lugares -->
      <GMapMarker
        v-for="(place, index) in places"
        :key="index"
        :position="place.position"
        :clickable="true"
        :draggable="false"
      >
        <GMapInfoWindow>
          <div>
            <h6>{{ place.name }}</h6>
            <p>{{ place.type }}</p>
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
