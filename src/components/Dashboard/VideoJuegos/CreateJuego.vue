<template>
  <div>
    <h1 class="display-4 text-center">Crear Videojuego</h1>


    <div>
      <div v-if="errors.length" class="alert alert-danger">
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error.message }}</li>
        </ul>
      </div>
    </div>



    <div class="row">
      <div class="col col-md-6 offset-md-3">
        <form @submit.prevent="crearVideojuego" enctype="multipart/form-data">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" class="form-control" id="nombre" v-model="nuevoVideojuego.nombre" required>
          </div>
          <div class="form-group">
            <label for="descripcion">Descripción:</label>
            <textarea class="form-control" id="descripcion" v-model="nuevoVideojuego.descripcion" required></textarea>
          </div>
          <div class="form-group">
            <label for="precio">Precio:</label>
            <input type="number" class="form-control" id="precio" v-model="nuevoVideojuego.precio" required>
          </div>
          <div class="form-group">
            <label for="stock">Stock:</label>
            <input type="number" class="form-control" id="stock" v-model="nuevoVideojuego.stock" required>
          </div>
          <div class="form-group">
            <label for="categoria_id">Categoría:</label>
            <select class="form-control" id="categoria_id" v-model="nuevoVideojuego.categoria_id" required>
              <option value="">Seleccione una categoría</option>
              <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{ categoria.nombre }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="consola_id">Consola:</label>
            <select class="form-control" id="consola_id" v-model="nuevoVideojuego.consola_id" required>
              <option value="">Seleccione una consola</option>
              <option v-for="consola in consolas" :key="consola.id" :value="consola.id">{{ consola.nombre }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="estado">Estado:</label>
            <select class="form-control" id="estado" v-model="nuevoVideojuego.estado" required>
              <option value="1">Activo</option>
              <option value="2">Inactivo</option>
            </select>
          </div>

          <div class="form-group">
            <label for="imagen">Imagen:</label>
            <input type="file" class="form-control" id="imagen" name="imagen" @change="cargarImagen" required>
          </div>
          <div class="text-center mt-3">
            <button type="button" class="btn btn-danger" @click="cancelarCreacion">Cancelar</button>
            <button type="submit" class="btn btn-primary">Crear Videojuego</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'CreateJuego',

  data() {
    return {
      nuevoVideojuego: {
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoria_id: '',
        consola_id: '',
        estado: true,
        selectedFile: null,
      },
      categorias: [],
      consolas: [],
      errors: [],
    };
  },

  methods: {
    async crearVideojuego() {
      const formData = new FormData();
      for (const key in this.nuevoVideojuego) {
        formData.append(key, this.nuevoVideojuego[key]);
      }

      try {
        const response = await axios.post('/dashboard-juegos', formData, {
          headers: {
            'auth-token': localStorage.getItem('token'),
          },
          onUploadProgress: (progressEvent) => {
            console.log(progressEvent.loaded / progressEvent.total);
          },
        });

        Swal.fire({
          icon: 'success',
          title: 'Videojuego creado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });

        this.$router.push('/dashboard/juegos');
      } catch (error) {
        console.error('Error al crear el videojuego:', error);

        if (error.response && error.response.data && error.response.data.errors) {
          const errors = error.response.data.errors;
          this.errors = errors;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al crear el videojuego',
            text: 'Ha ocurrido un error al intentar crear el videojuego. Por favor, inténtalo nuevamente.',
          });
        }
      }
    },

    cargarImagen(e) {
      const selectedFile = e.target.files[0];
      this.nuevoVideojuego.selectedFile = selectedFile;
    },

    cancelarCreacion() {
      this.$router.push('/dashboard/juegos');
    },
  },

  async created() {
    const categoriasResponse = await axios.get('/get-categorias');
    this.categorias = categoriasResponse.data.data.categorias;

    const consolasResponse = await axios.get('/get-consolas');
    this.consolas = consolasResponse.data.data.consolas;
  },
};
</script>

<style lang="" scoped>
/* Tu estilo CSS aquí */
</style>
