<template>
  <div class="admin-dashboard-layout d-flex">
    <!-- ── Sidebar ── -->
    <aside class="admin-sidebar d-flex flex-column text-white shadow">
      <div class="sidebar-brand d-flex align-items-center justify-content-center py-4 border-bottom border-secondary">
        <i class="bi bi-droplet-fill text-primary fs-3 me-2"></i>
        <h4 class="fw-bold mb-0 text-white">Agua Moche <span class="text-primary" style="font-size: 0.7rem; vertical-align: top;">Admin</span></h4>
      </div>
      <div class="sidebar-nav flex-grow-1 py-4 px-3">
        <ul class="nav flex-column gap-2">
          <li class="nav-item">
            <button class="nav-link admin-nav-link text-white w-100 text-start" :class="{ active: currentTab === 'dashboard' }" @click="currentTab = 'dashboard'">
              <i class="bi bi-speedometer2 me-3 fs-5"></i> Dashboard
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link admin-nav-link text-white w-100 text-start" :class="{ active: currentTab === 'orders' }" @click="currentTab = 'orders'">
              <i class="bi bi-cart3 me-3 fs-5"></i> Órdenes
              <span v-if="orders.filter(o => o.status === 'pending').length > 0" class="badge bg-danger ms-auto rounded-pill">{{ orders.filter(o => o.status === 'pending').length }}</span>
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link admin-nav-link text-white w-100 text-start" :class="{ active: currentTab === 'products' }" @click="currentTab = 'products'">
              <i class="bi bi-box-seam me-3 fs-5"></i> Productos
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link admin-nav-link text-white w-100 text-start" :class="{ active: currentTab === 'categories' }" @click="currentTab = 'categories'">
              <i class="bi bi-tags me-3 fs-5"></i> Categorías
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link admin-nav-link text-white w-100 text-start" :class="{ active: currentTab === 'referrals' }" @click="currentTab = 'referrals'">
              <i class="bi bi-people me-3 fs-5"></i> Referidos
            </button>
          </li>
        </ul>
      </div>
      <div class="sidebar-footer p-3 border-top border-secondary">
        <router-link to="/home" class="btn btn-outline-light w-100 text-start border-0 fw-bold">
          <i class="bi bi-arrow-left-circle me-2"></i> Volver a la tienda
        </router-link>
      </div>
    </aside>

    <!-- ── Main Content Area ── -->
    <div class="admin-main-wrapper flex-grow-1 d-flex flex-column ei-bg-dark">
      
      <!-- ── Topbar ── -->
      <header class="admin-topbar px-4 py-3 shadow-sm d-flex justify-content-between align-items-center">
        <h4 class="fw-bold mb-0 text-white">
          {{ tabTitles[currentTab] }}
        </h4>
        <div class="d-flex align-items-center gap-3">
          <div class="position-relative">
            <i class="bi bi-bell fs-5 text-muted"></i>
            <span v-if="orders.filter(o => o.status === 'pending').length > 0" class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
              <span class="visually-hidden">Nuevas órdenes</span>
            </span>
          </div>
          <div class="d-flex align-items-center ps-3 border-start">
            <div class="ei-bg-primary text-dark rounded-circle d-flex align-items-center justify-content-center me-2 fw-bold" style="width: 36px; height: 36px;">
              A
            </div>
            <div>
              <div class="fw-bold text-white lh-1" style="font-size: 0.9rem;">Admin</div>
              <div class="ei-text-muted" style="font-size: 0.75rem;">Administrador</div>
            </div>
          </div>
        </div>
      </header>

      <!-- ── Dynamic Content ── -->
      <div class="admin-content-inner p-4 p-lg-5 overflow-auto flex-grow-1">
        
        <!-- DASHBOARD KPIs -->
        <div v-if="currentTab === 'dashboard'" class="tab-pane-fade">
          <div class="row g-4 mb-4">
            <div class="col-sm-6 col-xl-3">
              <div class="kpi-card ei-glass-card p-4 h-100">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <span class="ei-text-muted text-uppercase fw-bold small tracking-wider">Ventas Totales</span>
                    <h3 class="fw-bold text-white mt-2 mb-0">S/ {{ kpis.totalSales.toFixed(2) }}</h3>
                  </div>
                  <div class="kpi-icon ei-bg-primary bg-opacity-10 ei-text-primary rounded-circle d-flex align-items-center justify-content-center" style="width: 48px; height: 48px; font-size: 1.5rem;"><i class="bi bi-currency-dollar"></i></div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="kpi-card ei-glass-card p-4 h-100">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <span class="ei-text-muted text-uppercase fw-bold small tracking-wider">Total Órdenes</span>
                    <h3 class="fw-bold text-white mt-2 mb-0">{{ kpis.totalOrders }}</h3>
                  </div>
                  <div class="kpi-icon ei-bg-secondary bg-opacity-10 ei-text-secondary rounded-circle d-flex align-items-center justify-content-center" style="width: 48px; height: 48px; font-size: 1.5rem;"><i class="bi bi-bag-check"></i></div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="kpi-card ei-glass-card p-4 h-100">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <span class="ei-text-muted text-uppercase fw-bold small tracking-wider">Conv. Referidos</span>
                    <h3 class="fw-bold text-white mt-2 mb-0">{{ kpis.referralConversion }}%</h3>
                  </div>
                  <div class="kpi-icon ei-bg-secondary bg-opacity-10 ei-text-secondary rounded-circle d-flex align-items-center justify-content-center" style="width: 48px; height: 48px; font-size: 1.5rem;"><i class="bi bi-people"></i></div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="kpi-card ei-glass-card p-4 position-relative h-100">
                <span v-if="kpis.lowStockProducts > 0" class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                  <span class="visually-hidden">Stock bajo</span>
                </span>
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <span class="ei-text-muted text-uppercase fw-bold small tracking-wider">Stock Bajo (< 10)</span>
                    <h3 class="fw-bold mt-2 mb-0" :class="kpis.lowStockProducts > 0 ? 'text-danger' : 'text-white'">{{ kpis.lowStockProducts }}</h3>
                  </div>
                  <div class="kpi-icon rounded-circle d-flex align-items-center justify-content-center" :class="kpis.lowStockProducts > 0 ? 'bg-danger bg-opacity-10 text-danger' : 'ei-bg-muted bg-opacity-10 ei-text-muted'" style="width: 48px; height: 48px; font-size: 1.5rem;"><i class="bi bi-exclamation-triangle"></i></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="row g-4">
            <div class="col-12 col-xl-6">
              <div class="ei-glass-card rounded-3">
                <div class="card-body p-4">
                  <h5 class="fw-bold text-white mb-3">Accesos Rápidos</h5>
                  <div class="d-flex flex-wrap gap-2">
                    <button @click="currentTab = 'orders'" class="btn btn-outline-ei"><i class="bi bi-cart3 me-1"></i> Ver Órdenes</button>
                    <button @click="currentTab = 'products'" class="btn btn-outline-ei"><i class="bi bi-box-seam me-1"></i> Ver Productos</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      <!-- ÓRDENES -->
      <div v-if="currentTab === 'orders'" class="tab-pane-fade">
        <div class="ei-glass-card border-0">
          <div class="card-header bg-transparent border-ei-bottom pt-4 pb-3 d-flex justify-content-between align-items-center">
            <h5 class="fw-bold text-white mb-0">Gestión de Órdenes</h5>
            <select v-model="orderFilter" class="form-select ei-input w-auto form-select-sm">
              <option value="all">Todas</option>
              <option value="pending">Pendiente</option>
              <option value="paid">Pagado</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table ei-table align-middle text-nowrap mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente / Entrega</th>
                    <th>Total</th>
                    <th>Fecha</th>
                    <th>Estado Actual</th>
                    <th class="text-end">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in filteredOrders" :key="order.id" :class="{'table-success': recentlyUpdatedOrder === order.id}">
                    <td class="fw-bold text-white">#{{ order.id }}</td>
                    <td>
                      <div class="fw-bold text-white">{{ order.shipping_name }}</div>
                      <div class="ei-text-muted small mb-1">User ID: {{ order.user }}</div>
                      <div>
                        <span v-if="order.delivery_method === 'pickup'" class="badge bg-info text-dark border border-info px-2 py-1"><i class="bi bi-shop me-1"></i> Retiro en Local</span>
                        <span v-else class="badge bg-dark text-white border border-secondary px-2 py-1"><i class="bi bi-truck me-1"></i> Domicilio</span>
                      </div>
                    </td>
                    <td class="fw-bold ei-text-primary">S/ {{ order.total_amount }}</td>
                    <td class="ei-text-muted small">{{ formatDate(order.created_at) }}</td>
                    <td>
                      <select v-model="order.status" class="form-select ei-input form-select-sm" style="min-width: 130px;">
                        <option value="pending">Pendiente</option>
                        <option value="paid">Pagado</option>
                        <option value="shipped">Enviado</option>
                        <option value="delivered">Entregado</option>
                        <option value="cancelled">Cancelado</option>
                      </select>
                    </td>
                    <td class="text-end">
                      <button class="btn btn-sm btn-primary-ei btn-save" @click="updateOrderStatus(order)">
                        <i class="bi bi-check2"></i> Guardar
                      </button>
                    </td>
                  </tr>
                  <tr v-if="filteredOrders.length === 0">
                    <td colspan="6" class="text-center py-4 text-muted">No hay órdenes para mostrar.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- PRODUCTOS -->
      <div v-if="currentTab === 'products'" class="tab-pane-fade">
        <div class="ei-glass-card border-0">
          <div class="card-header bg-transparent border-ei-bottom pt-4 pb-3 d-flex justify-content-between align-items-center">
            <h5 class="fw-bold text-white mb-0">Inventario de Productos</h5>
            <button @click="openProductModal()" class="btn btn-sm btn-primary-ei fw-bold">
              <i class="bi bi-plus-lg"></i> Nuevo Producto
            </button>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table ei-table align-middle text-nowrap mb-0">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Estado</th>
                    <th class="text-end" v-if="isAdmin">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in products" :key="product.id">
                    <td>
                      <div class="d-flex align-items-center">
                        <img v-if="product.primary_image" :src="product.primary_image.image" class="rounded me-3 border border-secondary" style="width: 40px; height: 40px; object-fit: cover;" />
                        <div v-else class="rounded me-3 ei-bg-dark d-flex align-items-center justify-content-center border border-secondary" style="width: 40px; height: 40px;"><i class="bi bi-image ei-text-muted"></i></div>
                        <span class="fw-bold text-white">{{ product.name }}</span>
                      </div>
                    </td>
                    <td class="ei-text-muted">{{ product.category_name || getCategoryName(product.category) || 'Sin Categoría' }}</td>
                    <td class="fw-bold ei-text-primary">S/ {{ product.base_price }}</td>
                    <td>
                      <span class="fw-bold" :class="product.stock < 10 ? 'text-danger' : 'text-white'">{{ product.stock }}</span>
                    </td>
                    <td>
                      <span class="badge" :class="product.is_active ? 'bg-success' : 'bg-secondary'">{{ product.is_active ? 'Activo' : 'Inactivo' }}</span>
                    </td>
                    <td class="text-end" v-if="isAdmin">
                      <button @click="openProductModal(product)" class="btn btn-sm btn-outline-ei me-2" title="Editar"><i class="bi bi-pencil"></i></button>
                      <button @click="confirmDelete('product', product)" class="btn btn-sm btn-outline-danger" title="Eliminar"><i class="bi bi-trash"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- CATEGORÍAS -->
      <div v-if="currentTab === 'categories'" class="tab-pane-fade">
        <div class="ei-glass-card border-0">
          <div class="card-header bg-transparent border-ei-bottom pt-4 pb-3 d-flex justify-content-between align-items-center">
            <h5 class="fw-bold text-white mb-0">Administración de Categorías</h5>
            <button @click="openCategoryModal()" class="btn btn-sm btn-primary-ei fw-bold">
              <i class="bi bi-plus-lg"></i> Nueva Categoría
            </button>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table ei-table align-middle text-nowrap mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Slug</th>
                    <th>Estado</th>
                    <th class="text-end" v-if="isAdmin">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cat in categories" :key="cat.id">
                    <td class="fw-bold text-white">#{{ cat.id }}</td>
                    <td class="fw-bold text-white">{{ cat.name }}</td>
                    <td class="ei-text-muted">{{ cat.slug }}</td>
                    <td>
                      <span class="badge" :class="cat.is_active ? 'bg-success' : 'bg-secondary'">{{ cat.is_active ? 'Activa' : 'Inactiva' }}</span>
                    </td>
                    <td class="text-end" v-if="isAdmin">
                      <button @click="openCategoryModal(cat)" class="btn btn-sm btn-outline-ei me-2" title="Editar"><i class="bi bi-pencil"></i></button>
                      <button @click="confirmDelete('category', cat)" class="btn btn-sm btn-outline-danger" title="Eliminar"><i class="bi bi-trash"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- REFERIDOS -->
      <div v-if="currentTab === 'referrals'" class="tab-pane-fade">
        <div class="ei-glass-card border-0">
          <div class="card-header bg-transparent border-ei-bottom pt-4 pb-3 d-flex justify-content-between align-items-center">
            <h5 class="fw-bold text-white mb-0">Usuarios con Referidos Compartidos</h5>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table ei-table align-middle text-nowrap mb-0">
                <thead>
                  <tr>
                    <th>Usuario / Email</th>
                    <th>Código Único</th>
                    <th class="text-center">Total Referidos</th>
                    <th>Ganancia Total Acumulada</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="stat in adminReferralStats" :key="stat.code">
                    <td class="fw-bold text-white"><i class="bi bi-person-check-fill ei-text-primary me-2"></i>{{ stat.user_email }}</td>
                    <td><span class="badge bg-secondary font-monospace">{{ stat.code }}</span></td>
                    <td class="text-center"><span class="badge bg-info rounded-pill px-3">{{ stat.total_referrals }}</span></td>
                    <td class="text-success fw-bold">S/ {{ stat.total_earned }}</td>
                  </tr>
                  <tr v-if="adminReferralStats.length === 0">
                    <td colspan="4" class="text-center py-4 ei-text-muted">Aún no hay usuarios que hayan compartido su enlace de referido.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- ── MODAL PRODUCTO ── -->
    <div class="modal-overlay" v-if="showProductModal" @click.self="closeModals">
      <div class="modal-dialog-custom slide-down">
        <div class="modal-header-custom border-ei-bottom">
          <h5 class="fw-bold text-white mb-0">{{ editingProduct ? 'Editar Producto' : 'Crear Producto' }}</h5>
          <button @click="closeModals" class="btn-close-custom text-white"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="modal-body-custom">
          <form @submit.prevent="saveProduct">
            <div class="mb-3">
              <label class="form-label ei-text-muted small fw-bold">Nombre del Producto</label>
              <input v-model="productForm.name" type="text" class="form-control ei-input" required>
            </div>
            <div class="mb-3">
              <label class="form-label ei-text-muted small fw-bold">Descripción</label>
              <textarea v-model="productForm.description" class="form-control ei-input" rows="3" required></textarea>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label ei-text-muted small fw-bold">Precio (S/)</label>
                <input v-model.number="productForm.base_price" type="number" step="0.01" min="0" class="form-control ei-input" required>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label ei-text-muted small fw-bold">Stock</label>
                <input v-model.number="productForm.stock" type="number" min="0" class="form-control ei-input" required>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label ei-text-muted small fw-bold">Categoría</label>
              <select v-model="productForm.category" class="form-select ei-input" required>
                <option value="" disabled>Seleccionar categoría...</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id" class="text-dark">{{ cat.name }}</option>
              </select>
            </div>

            <!-- Imágenes -->
            <div class="mb-3 mt-4">
              <label class="form-label ei-text-muted small fw-bold">Imágenes del Producto</label>
              
              <div 
                class="dropzone-area ei-input" 
                @dragover.prevent="dragover = true" 
                @dragleave.prevent="dragover = false" 
                @drop.prevent="handleDrop"
                :class="{ 'dropzone-active': dragover }"
                @click="$refs.fileInput.click()"
              >
                <div class="text-center">
                  <i class="bi bi-cloud-arrow-up text-primary fs-2"></i>
                  <p class="mb-0 fw-bold mt-2 text-white">Arrastra imágenes aquí o haz clic para seleccionar</p>
                  <small class="ei-text-muted">Max 5 imágenes, formatos JPEG/PNG/WEBP (hasta 2MB c/u)</small>
                </div>
                <input 
                  type="file" 
                  ref="fileInput" 
                  class="d-none" 
                  multiple 
                  accept="image/jpeg, image/png, image/webp" 
                  @change="handleFileSelect"
                />
              </div>

              <!-- Error -->
              <div v-if="imageError" class="text-danger small mt-2 fw-bold"><i class="bi bi-exclamation-circle"></i> {{ imageError }}</div>

              <!-- Preview Grid -->
              <div class="preview-grid mt-3" v-if="existingImages.length > 0 || newImages.length > 0">
                <!-- Existing -->
                <div class="preview-item" v-for="img in existingImages" :key="'ex-'+img.id">
                  <img :src="img.image" alt="preview" />
                  <button type="button" class="btn-remove" @click.stop="removeExistingImage(img.id)">
                    <i class="bi bi-x"></i>
                  </button>
                </div>
                <!-- New -->
                <div class="preview-item" v-for="(fileObj, idx) in newImages" :key="'new-'+idx">
                  <img :src="fileObj.preview" alt="preview" />
                  <button type="button" class="btn-remove" @click.stop="removeNewImage(idx)">
                    <i class="bi bi-x"></i>
                  </button>
                </div>
              </div>
            </div>

            <div class="form-check form-switch mt-3">
              <input v-model="productForm.is_active" class="form-check-input" type="checkbox" id="productActive">
              <label class="form-check-label text-white fw-bold" for="productActive">Producto Activo</label>
            </div>
            <div class="d-flex justify-content-end mt-4">
              <button type="button" @click="closeModals" class="btn btn-outline-ei me-2">Cancelar</button>
              <button type="submit" class="btn btn-primary-ei" :disabled="loadingForm">
                <span v-if="loadingForm" class="spinner-border spinner-border-sm me-2"></span>
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- ── MODAL CATEGORÍA ── -->
    <div class="modal-overlay" v-if="showCategoryModal" @click.self="closeModals">
      <div class="modal-dialog-custom slide-down">
        <div class="modal-header-custom border-ei-bottom">
          <h5 class="fw-bold text-white mb-0">{{ editingCategory ? 'Editar Categoría' : 'Crear Categoría' }}</h5>
          <button @click="closeModals" class="btn-close-custom text-white"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="modal-body-custom">
          <form @submit.prevent="saveCategory">
            <div class="mb-3">
              <label class="form-label ei-text-muted small fw-bold">Nombre</label>
              <input v-model="categoryForm.name" @input="autoGenerateSlug" type="text" class="form-control ei-input" required>
            </div>
            <div class="mb-3">
              <label class="form-label ei-text-muted small fw-bold">Slug (URL amigable)</label>
              <input v-model="categoryForm.slug" type="text" class="form-control ei-input" required>
              <div class="form-text ei-text-muted">Ejemplo: aguas-purificadas</div>
            </div>
            <div class="mb-3">
              <label class="form-label ei-text-muted small fw-bold">Descripción (Opcional)</label>
              <textarea v-model="categoryForm.description" class="form-control ei-input" rows="2"></textarea>
            </div>
            <div class="form-check form-switch mt-3">
              <input v-model="categoryForm.is_active" class="form-check-input" type="checkbox" id="catActive">
              <label class="form-check-label text-white fw-bold" for="catActive">Categoría Activa</label>
            </div>
            <div class="d-flex justify-content-end mt-4">
              <button type="button" @click="closeModals" class="btn btn-outline-ei me-2">Cancelar</button>
              <button type="submit" class="btn btn-primary-ei" :disabled="loadingForm">
                <span v-if="loadingForm" class="spinner-border spinner-border-sm me-2"></span>
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- ── MODAL ELIMINAR ── -->
    <div class="modal-overlay" v-if="showDeleteModal" @click.self="closeModals">
      <div class="modal-dialog-custom slide-down" style="max-width: 400px;">
        <div class="modal-body-custom text-center py-4">
          <div class="text-danger mb-3" style="font-size: 3rem;"><i class="bi bi-exclamation-triangle"></i></div>
          <h4 class="fw-bold mb-3 text-white">¿Estás seguro?</h4>
          
          <!-- Mensaje para Producto -->
          <p v-if="itemToDelete.type === 'product'" class="ei-text-muted">
            ¿Deseas eliminar el producto <strong class="text-white">"{{ itemToDelete.data.name }}"</strong>?<br>Esta acción no se puede deshacer.
          </p>

          <!-- Mensaje para Categoría -->
          <p v-if="itemToDelete.type === 'category'" class="ei-text-muted">
            ¿Deseas eliminar la categoría <strong class="text-white">"{{ itemToDelete.data.name }}"</strong>?<br>
            <span v-if="itemToDelete.productsCount > 0" class="text-danger fw-bold d-block mt-2">
              ⚠️ ¡Atención! Esta categoría tiene {{ itemToDelete.productsCount }} producto(s) asignado(s). Podrían quedar huérfanos.
            </span>
            <span class="d-block mt-2">Esta acción no se puede deshacer.</span>
          </p>

          <div class="d-flex justify-content-center gap-2 mt-4">
            <button type="button" @click="closeModals" class="btn btn-outline-ei w-50">Cancelar</button>
            <button type="button" @click="executeDelete" class="btn btn-danger w-50" :disabled="loadingForm">
              <span v-if="loadingForm" class="spinner-border spinner-border-sm me-2"></span>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
        </div>
      </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/composables/api.js'

const isAdmin = ref(true) // En producción vendría de user.isAdmin
const currentTab = ref('dashboard')
const orders = ref([])
const products = ref([])
const categories = ref([])
const orderFilter = ref('all')

const tabTitles = {
  'dashboard': 'Dashboard Principal',
  'orders': 'Gestión de Órdenes',
  'products': 'Inventario de Productos',
  'categories': 'Administración de Categorías',
  'referrals': 'Usuarios con Referidos Compartidos'
}
const recentlyUpdatedOrder = ref(null)
const loadingForm = ref(false)
const adminReferralStats = ref([])

const kpis = ref({
  totalSales: 0,
  totalOrders: 0,
  referralConversion: 0,
  lowStockProducts: 0
})

// --- MODALS STATE ---
const showProductModal = ref(false)
const showCategoryModal = ref(false)
const showDeleteModal = ref(false)

const editingProduct = ref(null)
const editingCategory = ref(null)
const itemToDelete = ref({ type: null, data: null, productsCount: 0 })

// Imágenes State
const dragover = ref(false)
const imageError = ref('')
const existingImages = ref([])
const newImages = ref([])
const imagesToDelete = ref([])
const fileInput = ref(null)

// Forms
const defaultProductForm = { name: '', description: '', base_price: 0, stock: 0, category: '', is_active: true }
const defaultCategoryForm = { name: '', slug: '', description: '', is_active: true }
const productForm = ref({ ...defaultProductForm })
const categoryForm = ref({ ...defaultCategoryForm })

const fetchData = async () => {
  try {
    const [ordersRes, productsRes, categoriesRes, statsRes] = await Promise.all([
      api.get('/orders/'),
      api.get('/products/'),
      api.get('/categories/'),
      api.get('/referrals/admin/stats/').catch(() => ({ data: [] }))
    ])

    orders.value = ordersRes.data.results || ordersRes.data
    products.value = productsRes.data.results || productsRes.data
    categories.value = categoriesRes.data.results || categoriesRes.data
    adminReferralStats.value = statsRes.data.results || statsRes.data

    calculateKPIs()
  } catch (err) {
    console.error('Error cargando datos del dashboard admin:', err)
  }
}

onMounted(fetchData)

// --- HELPERS ---
const getCategoryName = (id) => {
  const cat = categories.value.find(c => c.id === id)
  return cat ? cat.name : null
}

const autoGenerateSlug = () => {
  if (!editingCategory.value) { // Solo autogenerar si estamos creando
    categoryForm.value.slug = categoryForm.value.name
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-') // replace spaces and non-word chars with dash
  }
}

// --- IMÁGENES CONTROLS ---
const handleDrop = (e) => {
  dragover.value = false
  processFiles(e.dataTransfer.files)
}

const handleFileSelect = (e) => {
  processFiles(e.target.files)
}

const processFiles = (files) => {
  imageError.value = ''
  const currentTotal = existingImages.value.length + newImages.value.length
  
  let filesArray = Array.from(files)
  
  if (currentTotal + filesArray.length > 5) {
    imageError.value = 'Máximo 5 imágenes permitidas en total.'
    filesArray = filesArray.slice(0, 5 - currentTotal)
  }

  filesArray.forEach(file => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      imageError.value = 'Formato inválido. Solo JPEG, PNG o WEBP.'
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      imageError.value = `La imagen ${file.name} supera los 2MB.`
      return
    }

    newImages.value.push({
      file: file,
      preview: URL.createObjectURL(file)
    })
  })
}

const removeExistingImage = (id) => {
  imagesToDelete.value.push(id)
  existingImages.value = existingImages.value.filter(img => img.id !== id)
}

const removeNewImage = (idx) => {
  const fileObj = newImages.value[idx]
  URL.revokeObjectURL(fileObj.preview)
  newImages.value.splice(idx, 1)
}

// --- MODAL CONTROLS ---
const closeModals = () => {
  showProductModal.value = false
  showCategoryModal.value = false
  showDeleteModal.value = false
}

const openProductModal = (product = null) => {
  imageError.value = ''
  newImages.value.forEach(obj => URL.revokeObjectURL(obj.preview))
  newImages.value = []
  imagesToDelete.value = []
  existingImages.value = []

  if (product) {
    editingProduct.value = product
    productForm.value = { ...product }
    if (typeof product.category === 'object' && product.category !== null) {
      productForm.value.category = product.category.id
    }
    if (product.images) {
      existingImages.value = [...product.images]
    }
  } else {
    editingProduct.value = null
    productForm.value = { ...defaultProductForm }
  }
  showProductModal.value = true
}

const openCategoryModal = (cat = null) => {
  if (cat) {
    editingCategory.value = cat
    categoryForm.value = { ...cat }
  } else {
    editingCategory.value = null
    categoryForm.value = { ...defaultCategoryForm }
  }
  showCategoryModal.value = true
}

const confirmDelete = (type, item) => {
  itemToDelete.value = { type, data: item, productsCount: 0 }
  
  if (type === 'category') {
    // Calcular productos afectados
    const affected = products.value.filter(p => p.category === item.id || p.category?.id === item.id)
    itemToDelete.value.productsCount = affected.length
  }
  
  showDeleteModal.value = true
}

// --- CRUD API CALLS ---
const saveProduct = async () => {
  imageError.value = ''
  if (!editingProduct.value && newImages.value.length === 0) {
    imageError.value = 'Debes incluir al menos una imagen al crear un producto.'
    return
  }

  loadingForm.value = true
  try {
    const formData = new FormData()
    formData.append('name', productForm.value.name)
    formData.append('description', productForm.value.description)
    formData.append('base_price', productForm.value.base_price)
    formData.append('category', productForm.value.category)
    formData.append('is_active', productForm.value.is_active)
    formData.append('stock', productForm.value.stock)

    newImages.value.forEach(imgObj => {
      formData.append('images', imgObj.file)
    })

    imagesToDelete.value.forEach(id => {
      formData.append('images_to_delete', id)
    })

    if (editingProduct.value) {
      await api.patch(`/products/${editingProduct.value.id}/`, formData)
    } else {
      await api.post('/products/', formData)
    }
    await fetchData()
    closeModals()
  } catch (err) {
    if (err.response && err.response.data) {
      if (err.response.data.images) {
          imageError.value = err.response.data.images[0]
      } else if (err.response.data.non_field_errors) {
          imageError.value = err.response.data.non_field_errors[0]
      } else {
          // Extraer el primer error de validación disponible
          const firstKey = Object.keys(err.response.data)[0];
          if (firstKey) {
             const errorMsg = Array.isArray(err.response.data[firstKey]) ? err.response.data[firstKey][0] : err.response.data[firstKey];
             imageError.value = `Error en ${firstKey}: ${errorMsg}`;
          } else {
             imageError.value = 'Error al guardar. Verifica los datos.';
          }
      }
    } else {
      alert('Error al guardar el producto. Verifica tu conexión.')
    }
    console.error(err)
  } finally {
    loadingForm.value = false
  }
}

const saveCategory = async () => {
  loadingForm.value = true
  try {
    if (editingCategory.value) {
      await api.patch(`/categories/${editingCategory.value.id}/`, categoryForm.value)
    } else {
      await api.post('/categories/', categoryForm.value)
    }
    await fetchData()
    closeModals()
  } catch (err) {
    alert('Error al guardar la categoría. Verifica el slug o tus permisos.')
    console.error(err)
  } finally {
    loadingForm.value = false
  }
}

const executeDelete = async () => {
  loadingForm.value = true
  try {
    const { type, data } = itemToDelete.value
    
    if (type === 'product') {
      await api.delete(`/products/${data.id}/`)
    } else if (type === 'category') {
      await api.delete(`/categories/${data.id}/`)
    }
    
    await fetchData()
    closeModals()
  } catch (err) {
    alert('Error al eliminar el elemento.')
    console.error(err)
  } finally {
    loadingForm.value = false
  }
}


// --- ÓRDENES y KPIs ---
const filteredOrders = computed(() => {
  if (orderFilter.value === 'all') return orders.value
  return orders.value.filter(o => o.status === orderFilter.value)
})

const calculateKPIs = () => {
  let sales = 0
  let referralOrders = 0

  orders.value.forEach(o => {
    if (o.status !== 'cancelled') {
      sales += parseFloat(o.total_amount || 0)
    }
    if (o.wallet_credit_used > 0 || o.notes?.includes('referido')) {
       referralOrders++
    }
  })

  kpis.value.totalSales = sales
  kpis.value.totalOrders = orders.value.length
  kpis.value.referralConversion = orders.value.length > 0 ? ((referralOrders / orders.value.length) * 100).toFixed(1) : 0
  kpis.value.lowStockProducts = products.value.filter(p => p.stock < 10).length
}

const updateOrderStatus = async (order) => {
  try {
    await api.patch(`/orders/${order.id}/`, { status: order.status })
    recentlyUpdatedOrder.value = order.id
    setTimeout(() => { recentlyUpdatedOrder.value = null }, 2000)
  } catch (err) {
    alert('Error al actualizar el estado de la orden.')
    console.error(err)
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const d = new Date(dateString)
  return d.toLocaleString('es-PE', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })
}
</script>

<style scoped>
.admin-dashboard {
  background-color: #f3f4f6; /* Gray 100 super suave */
  min-height: 100vh;
  font-family: var(--font-body, 'Inter', sans-serif);
}

.kpi-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
}

.kpi-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.tracking-wider {
  letter-spacing: 0.05em;
}

/* Tabs */
.admin-tabs {
  border-bottom: 2px solid var(--ei-border-muted, rgba(106, 176, 255, 0.15));
}

.admin-tabs .nav-link {
  color: var(--ei-text-muted, #8E9BB0);
  border: none;
  border-bottom: 2px solid transparent;
  padding: 12px 24px;
  font-weight: 600;
  transition: all 0.2s;
}

.admin-tabs .nav-link:hover {
  color: var(--ei-primary, #11F5B0);
  border-color: var(--ei-border-active, rgba(17, 245, 176, 0.4));
}

.admin-tabs .nav-link.active {
  color: var(--ei-primary, #11F5B0);
  border-color: var(--ei-primary, #11F5B0);
  background: transparent;
}

/* Tables */
.ei-table {
  color: var(--ei-text-main, #FFF);
}
.ei-table thead {
  background-color: transparent !important;
}
.ei-table th {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--ei-text-muted, #8E9BB0);
  font-weight: 700;
  border-bottom: 1px solid var(--ei-border-muted, rgba(106, 176, 255, 0.15));
  padding: 16px;
  background-color: transparent !important;
}

.ei-table td {
  padding: 16px;
  vertical-align: middle;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background-color: transparent !important;
}

.btn-save {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 6px 12px;
}

.table-success {
  background-color: #d1fae5 !important;
  transition: background-color 0.5s ease;
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-dialog-custom {
  background: rgba(10, 31, 56, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(106, 176, 255, 0.15);
  width: 100%;
  max-width: 600px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.modal-header-custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
}

.modal-body-custom {
  padding: 24px;
}

.btn-close-custom {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  color: #6b7280;
  transition: color 0.2s;
}
.btn-close-custom:hover {
  color: #111827;
}

/* Dropzone */
.dropzone-area {
  border: 2px dashed var(--am-primary);
  border-radius: 12px;
  padding: 30px 20px;
  background-color: rgba(0, 153, 255, 0.02);
  cursor: pointer;
  transition: all 0.3s ease;
}
.dropzone-area:hover, .dropzone-active {
  background-color: rgba(0, 153, 255, 0.08);
  border-color: var(--am-secondary);
}

.preview-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.preview-item {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}
.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.btn-remove {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
}
.btn-remove:hover {
  transform: scale(1.1);
  background: #dc3545;
}

/* Animations */
.tab-pane-fade {
  animation: fadeIn 0.3s ease-in-out;
}

.slide-down {
  animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* ── ADMIN LAYOUT ── */
.admin-sidebar {
  width: 240px;
  min-height: 100vh;
  background-color: var(--ei-bg-card, #060D1F);
  position: sticky;
  top: 0;
  z-index: 1040;
  border-right: 1px solid var(--ei-border-muted, rgba(106, 176, 255, 0.15));
}

.admin-nav-link {
  border-radius: 8px;
  padding: 12px 16px;
  transition: all 0.2s;
  opacity: 0.8;
  border: 1px solid transparent;
}

.admin-nav-link:hover {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.05);
}

.admin-nav-link.active {
  opacity: 1;
  background-color: var(--am-primary);
  border-color: rgba(255,255,255,0.1);
  box-shadow: 0 4px 6px rgba(0, 170, 228, 0.2);
}

.admin-topbar {
  height: 70px;
  z-index: 1030;
  background-color: var(--ei-bg-card, #060D1F);
  border-bottom: 1px solid var(--ei-border-muted, rgba(106, 176, 255, 0.15));
}

/* ── ECOINFINITY STYLES ── */
.ei-bg-dark { background-color: #020B14 !important; }
.ei-bg-primary { background-color: #11F5B0 !important; }
.ei-text-primary { color: #11F5B0 !important; }
.ei-bg-secondary { background-color: #6AB0FF !important; }
.ei-text-secondary { color: #6AB0FF !important; }
.ei-text-muted { color: #8E9BB0 !important; }
.border-ei-bottom { border-bottom: 1px solid rgba(106, 176, 255, 0.15) !important; }

.ei-glass-card {
  background: rgba(10, 31, 56, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(106, 176, 255, 0.15);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

.btn-outline-ei {
  color: #11F5B0;
  border: 1px solid #11F5B0;
  background: transparent;
}
.btn-outline-ei:hover {
  background: rgba(17, 245, 176, 0.1);
  color: #11F5B0;
}

.btn-primary-ei {
  background: #11F5B0;
  color: #020B14;
  border: none;
  font-weight: 700;
}
.btn-primary-ei:hover {
  background: #0edba1;
  color: #020B14;
}

.ei-input {
  background-color: rgba(6, 13, 31, 0.6) !important;
  border: 1px solid rgba(106, 176, 255, 0.15) !important;
  color: #FFF !important;
}
.ei-input:focus {
  border-color: #11F5B0 !important;
  box-shadow: 0 0 0 3px rgba(17, 245, 176, 0.2) !important;
}
</style>
