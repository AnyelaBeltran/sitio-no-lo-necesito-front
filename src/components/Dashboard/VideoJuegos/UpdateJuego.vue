<template>
  <h1 class="display-4 text-center">Editar Videojuego</h1>

  <div class="row">
    <div class="col col-md-6 offset-md-3 ">

      <form @submit.prevent="actualizarVideojuego" enctype="multipart/form-data">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" class="form-control" id="nombre" v-model="nuevoVideojuego.nombre" required>
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
            <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{ categoria.nombre }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="descripcion">Descripción:</label>
          <textarea class="form-control" id="descripcion" v-model="nuevoVideojuego.descripcion" required></textarea>
        </div>

        <div class="form-group">
          <label for="estado">Estado:</label>
          <select @change="convertirEstado" class="form-control" id="estado" v-model="nuevoVideojuego.estado" required>
            <option value="1">Activo</option>
            <option value="2">Inactivo</option>
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
          <label for="imagen">Imagen:</label>
          <input type="file" class="form-control " id="imagen" name="imagen" @change="cargarImagen" required>
        </div>

        <div class="text-center mt-3">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
          <button type="submit" class="btn btn-primary">Actualizar Videojuego</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2';

export default {
  name: "EditVideojuego",

  data() {
    return {
      nuevoVideojuego: {
        nombre: "",
        precio: "",
        stock: "",
        categoria_id: "",
        descripcion: "",
        estado: null,
        consola_id: "",
        selectedFile: ""
      },

      errors: [],
      categorias: [],
      consolas: []
    };
  },

  async mounted() {
    const id = this.$route.params.id;

    try {
      const response = await axios.get(`/dashboard-juegos/${id}`, {
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });

      this.nuevoVideojuego.nombre = response.data.data.nombre;
      this.nuevoVideojuego.precio = response.data.data.precio;
      this.nuevoVideojuego.stock = response.data.data.stock;
      this.nuevoVideojuego.categoria_id = response.data.data.categoria_id;
      this.nuevoVideojuego.descripcion = response.data.data.descripcion;
      this.nuevoVideojuego.estado = response.data.data.estado;
      this.nuevoVideojuego.consola_id = response.data.data.consola_id;

    } catch (error) {
      console.error('Error al obtener los datos del videojuego:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al obtener los datos del videojuego',
        text: 'Ha ocurrido un error al intentar obtener los datos del videojuego. Por favor, inténtalo nuevamente.',
      });
    }
  },

  async created() {
    // Obtener las categorías y consolas
    const categoriasResponse = await axios.get("/get-categorias");
    const consolasResponse = await axios.get("/get-consolas");
    
    this.categorias = categoriasResponse.data.data.categorias;
    this.consolas = consolasResponse.data.data.consolas;
  },

  methods: {
    async actualizarVideojuego() {
      const id = this.$route.params.id; // Obtener el valor de id
      const formData = new FormData();
      formData.append('nombre', this.nuevoVideojuego.nombre);
      formData.append('precio', this.nuevoVideojuego.precio);
      formData.append('stock', this.nuevoVideojuego.stock);
      formData.append('categoria_id', this.nuevoVideojuego.categoria_id);
      formData.append('descripcion', this.nuevoVideojuego.descripcion);
      formData.append('estado', this.nuevoVideojuego.estado);
      formData.append('consola_id', this.nuevoVideojuego.consola_id);
      formData.append('imagen', this.nuevoVideojuego.selectedFile); // Cambiar "file" a "imagen"

      try {
        const response = await axios.patch(`/dashboard-juegos/${id}`, formData, {
          headers: {
            'auth-token': localStorage.getItem('token')
          },
          onUploadProgress: progressEvent => {
            console.log(progressEvent.loaded / progressEvent.total)
          }
        });

        Swal.fire({
          icon: 'success',
          title: 'Videojuego actualizado correctamente',
          showConfirmButton: false,
          timer: 1500
        });

        this.$router.push('/dashboard/juegos');

      } catch (error) {
        console.error('Error al actualizar el videojuego:', error);

        if (error.response && error.response.data && error.response.data.errors) {
          const errors = error.response.data.errors;
          this.errors = errors;
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el videojuego',
            text: 'Por favor revisa los siguientes errores: ',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el videojuego',
            text: 'Ha ocurrido un error al intentar actualizar el videojuego. Por favor, inténtalo nuevamente.',
          });
        }
      }
    },

    cargarImagen(e) {
      const selectedFile = e.target.files[0];
      this.nuevoVideojuego.selectedFile = selectedFile;
    },
  },
};
</script>

<style lang="" scoped>
</style>
