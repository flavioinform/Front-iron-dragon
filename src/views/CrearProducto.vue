<template>
  <div class="product-manager container">
    <h1 class="my-3">Productos</h1>
    <div class="d-flex justify-content-between mb-4">
      <!-- Buscador por categoría -->
      <div class="d-flex">
        <input 
          v-model="searchCategory" 
          type="text" 
          class="form-control me-2" 
          placeholder="Buscar por categoría..." 
        />
      </div>
      <button @click="newProduct" class="btn btn-danger mb-4">➕ Nuevo</button>
    </div>

    <div class="row g-3">
      <div v-for="p in filteredProducts" :key="p.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card h-100 p-2 shadow-sm">
          <div v-if="p.image" class="text-center">
            <img :src="p.image" alt="imagen"
                 class="card-img-top img-fluid rounded"
                 style="max-height:120px; object-fit:cover;" />
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ p.name }}</h5>
            <p class="card-text small">{{ p.description }}</p>
            <p class="mb-1"><strong>Precio:</strong> ${{ p.price }}</p>
            <p class="mb-0"><strong>Categoría:</strong> {{ p.category_name }}</p>
            <p class="mb-0"><strong>Stock:</strong> {{ p.stock }}</p> <!-- Cambio aquí de is_active a stock -->
          </div>
          <div class="card-footer d-flex justify-content-between">
            <button @click="editProduct(p)" class="btn btn-sm btn-outline-primary">✏️ Editar</button>
            <button @click="deleteProduct(p)" class="btn btn-sm btn-outline-danger">🗑️ Eliminar</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showForm" ref="formSection" class="form mt-4">
      <h2>{{ editing ? "Editar" : "Nuevo" }} Producto</h2>

      <input v-model="form.name" placeholder="Nombre" class="form-control my-2" />
      <textarea v-model="form.description" placeholder="Descripción" class="form-control my-2"></textarea>
      <input v-model="form.price" type="number" step="0.01" placeholder="Precio" class="form-control my-2" />

      <label class="form-label">Categoría:</label>
      <select v-model="form.category" class="form-control my-2">
        <option v-for="cat in categories" :value="cat.id" :key="cat.id">
          {{ cat.name }}
        </option>
      </select>

      <label class="form-label">Imagen:</label>
      <input type="file" class="form-control" @change="onFileChange" />
      <div v-if="form.image" class="mt-2">
        <img :src="form.image" alt="preview" class="preview rounded" />
      </div>

      <label class="form-label">Stock:</label>
      <input type="number" v-model.number="form.stock" min="1" placeholder="Cantidad en Stock" class="form-control my-2" />

      <div class="mt-3">
        <button @click="saveProduct" class="btn btn-success">💾 Guardar</button>
        <button @click="cancel" class="btn btn-secondary">Cancelar</button>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  data: () => ({
    products: [],
    categories: [],
    showForm: false,
    editing: false,
    editingId: null,
    form: { name: "", description: "", price: 0, category: null, stock: 1, image: null },
    imageFile: null,
    searchCategory: "",  // Aquí capturamos la búsqueda por categoría
    api: "http://localhost:8000/api/products/",
    apiCat: "http://localhost:8000/api/categories/",
  }),
  async mounted() {
    await Promise.all([this.load(), this.loadCategories()]);
  },
  computed: {
    // Computed para filtrar los productos por categoría
    filteredProducts() {
      if (this.searchCategory) {
        return this.products.filter(p => 
          this.removeAccents(p.name.toLowerCase()).includes(this.removeAccents(this.searchCategory.toLowerCase()))
        );
      }
      return this.products;
    }
  },

  methods: {
      removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
},

    // 🔑 Aquí sacamos el token guardado en localStorage después del login
    getAuthHeaders() {
      const token = localStorage.getItem("access"); // debe ser el ACCESS TOKEN de JWT
      if (!token) {
        console.warn("No hay token en localStorage. Redirige a login.");
        return {};
      }
      return { Authorization: `Bearer ${token}` };
    },

    async load() {
      const r = await fetch(this.api, { headers: this.getAuthHeaders() });
      if (!r.ok) {
        console.error("Error al cargar productos:", r.status, await r.text());
        return;
      }
      this.products = await r.json();
    },

    async loadCategories() {
      const r = await fetch(this.apiCat, { headers: this.getAuthHeaders() });
      if (!r.ok) {
        console.error("Error al cargar categorías:", r.status, await r.text());
        return;
      }
      this.categories = await r.json();
    },

    newProduct() {
      this.form = { name: "", description: "", price: 0, category: null, stock: 1, image: null }; // Cambié is_active a stock
      this.imageFile = null;
      this.editing = false;
      this.showForm = true;
      this.$nextTick(() => this.$refs.formSection.scrollIntoView({ behavior: "smooth" }));
    },

    editProduct(p) {
      this.form = { ...p };  // Copiar el producto para la edición
      this.imageFile = null;
      this.editingId = p.id;
      this.editing = true;
      this.showForm = true;
      this.$nextTick(() => this.$refs.formSection.scrollIntoView({ behavior: "smooth" }));
    },

    async saveProduct() {
      const formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("description", this.form.description);
      formData.append("price", this.form.price);
      formData.append("category", this.form.category);
      formData.append("stock", this.form.stock);  // Asegurarse de que el stock se envíe correctamente

      if (this.imageFile) formData.append("image", this.imageFile);

      const url = this.editing ? `${this.api}${this.editingId}/` : this.api;
      const method = this.editing ? "PATCH" : "POST";

      const resp = await fetch(url, {
        method,
        headers: this.getAuthHeaders(),
        body: formData,
      });

      if (!resp.ok) {
        const txt = await resp.text();
        console.error("Error al guardar:", resp.status, txt);
        alert("Error al guardar: " + txt);
        return;
      }

      this.showForm = false;
      await this.load();
    },

    async deleteProduct(p) {
      if (!confirm(`¿Eliminar ${p.name}?`)) return;
      const r = await fetch(`${this.api}${p.id}/`, {
        method: "DELETE",
        headers: this.getAuthHeaders(),
      });
      if (!r.ok) {
        console.error("Error al eliminar:", r.status, await r.text());
        return;
      }
      await this.load();
    },

    cancel() {
      this.showForm = false;
    },

    onFileChange(e) {
      const file = e.target.files[0];
      if (!file) return;
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = (evt) => (this.form.image = evt.target.result);
      reader.readAsDataURL(file);
    },
  },
  
};
</script>



<style scoped>
.preview {
  max-width: 100px;
  max-height: 100px;
  object-fit: contain;
  border-radius: 6px;
}
</style>
