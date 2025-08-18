<template>
  <div class="category-manager container">
    <h1 class="my-3">🏷️ Categorías</h1>
    <button @click="newCategory" class="btn btn-primary mb-4">➕ Nueva</button>

    <!-- Lista de categorías -->
    <div class="row g-3">
      <div v-for="cat in categories" :key="cat.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card h-100 p-2 shadow-sm">
          <div v-if="cat.image" class="text-center">
            <img 
              :src="cat.image" 
              alt="imagen" 
              class="card-img-top img-fluid rounded" 
              style="max-height:120px; object-fit:cover;" 
            />
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ cat.name }}</h5>
            <p class="card-text small">{{ cat.description }}</p>
            <small class="text-muted">{{ cat.slug }}</small>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <button @click="editCategory(cat)" class="btn btn-sm btn-outline-primary">✏️ Editar</button>
            <button @click="deleteCategory(cat)" class="btn btn-sm btn-outline-danger">🗑️ Eliminar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Formulario -->
    <div v-if="showForm" ref="formSection" class="form mt-4">
      <h2>{{ editing ? "Editar" : "Nueva" }} Categoría</h2>

      <input v-model="form.name" placeholder="Nombre" class="form-control my-2" />
      <input v-model="form.slug" placeholder="Slug" class="form-control my-2" />
      <textarea v-model="form.description" placeholder="Descripción" class="form-control my-2"></textarea>

      <!-- Subida de imagen -->
      <label class="form-label">Imagen:</label>
      <input type="file" class="form-control" @change="onFileChange" />
      <div v-if="form.image" class="mt-2">
        <img :src="form.image" alt="preview" class="preview rounded" />
      </div>

      <div class="form-check my-2">
        <input type="checkbox" class="form-check-input" v-model="form.is_active" id="activeCheck" />
        <label for="activeCheck" class="form-check-label">Activa</label>
      </div>

      <div class="mt-3">
        <button @click="saveCategory" class="btn btn-success">💾 Guardar</button>
        <button @click="cancel" class="btn btn-secondary">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    categories: [],
    showForm: false,
    editing: false,
    editingId: null,
    form: { name: "", slug: "", description: "", is_active: true, image: null },
    imageFile: null,
    api: "http://localhost:8000/api/categories/"
  }),
  async mounted() {
    this.load()
  },
  methods: {
    async load() {
      const r = await fetch(this.api)
      this.categories = await r.json()
    },
    newCategory() {
      this.form = { name: "", slug: "", description: "", is_active: true, image: null }
      this.imageFile = null
      this.editing = false
      this.showForm = true
      this.$nextTick(() => {
        this.$refs.formSection.scrollIntoView({ behavior: "smooth" })
      })
    },
    editCategory(cat) {
      this.form = { ...cat }
      this.imageFile = null
      this.editingId = cat.id
      this.editing = true
      this.showForm = true
      this.$nextTick(() => {
        this.$refs.formSection.scrollIntoView({ behavior: "smooth" })
      })
    },
    async saveCategory() {
      const formData = new FormData()
      formData.append("name", this.form.name)
      formData.append("slug", this.form.slug)
      formData.append("description", this.form.description)
      formData.append("is_active", this.form.is_active)

      if (this.imageFile) {
        formData.append("image", this.imageFile)
      }

      const opts = {
        method: this.editing ? "PUT" : "POST",
        body: formData
      }
      const url = this.editing ? this.api + this.editingId + "/" : this.api
      await fetch(url, opts)

      this.showForm = false
      this.load()
    },
    async deleteCategory(cat) {
      if (confirm(`¿Eliminar ${cat.name}?`)) {
        await fetch(this.api + cat.id + "/", { method: "DELETE" })
        this.load()
      }
    },
    cancel() {
      this.showForm = false
    },
    onFileChange(e) {
      const file = e.target.files[0]
      if (!file) return
      this.imageFile = file
      const reader = new FileReader()
      reader.onload = (evt) => {
        this.form.image = evt.target.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>

<style scoped>
.preview {
  max-width: 100px;
  max-height: 100px;
  object-fit: contain;
  border-radius: 6px;
}
</style>
