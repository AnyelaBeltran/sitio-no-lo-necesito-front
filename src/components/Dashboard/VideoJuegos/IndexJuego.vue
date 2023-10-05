<template>
  <div class="col col-12 ">

    
  <div class="container">
    <div class="jumbotron jumbotron-fluid text-center bg-light">
    <h1 class="display-4 text-center">Index VideoJuegos</h1>
    <p class="lead text-center">Administra una amplia selección de videojuegos .</p>
    <hr class="my-4">
    <p class="text-center">Administra una amplia selección de videojuegos para todos los gustos.</p>
    <p class="text-center">Administra las últimas novedades y encuentra tus favoritos.</p>
    <p class="lead">
      <a class="btn btn-primary btn-lg"  @click="crearVideojuego" href="#" role="button">Crear VideoJuego</a>
    </p>
  </div>
</div>


  <div class="col container mt-4">
    <table class="table table-hover bg-secondary shadow">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Precio</th>
          <th scope="col">Stock</th>
          <th scope="col">Categoría</th>
          <th scope="col">Consola</th>
          <th scope="col">Descripción</th>
          <th scope="col">Estado</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(videojuego, index) in videojuegos" :key="videojuego.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ videojuego.nombre }}</td>
          <td><code>$</code>{{ videojuego.precio }}</td>
          <td>{{ videojuego.stock }} unidades</td>
          <td>{{ videojuego.Categorium.nombre }}</td>
          <td>{{ videojuego.Consola.nombre }}</td>
          <td>{{ videojuego.descripcion }}</td>
          <td>{{ videojuego.estado ? 'Activo' : 'Inactivo' }}</td>
          <td>
            <div class="btn-group" role="group">
              <button @click="verVideojuego(videojuego.id)" class="btn btn-outline-success btn-sm shadow">
                <i class="fa fa-eye"></i> Ver
              </button>
              <button @click="editarVideojuego(videojuego.id)" class="btn btn-outline-warning btn-sm shadow">
                <i class="fa fa-pencil"></i> Editar
              </button>
              <button @click="eliminarVideojuego(videojuego.id)" class="btn btn-outline-danger btn-sm shadow">
                <i class="fa fa-trash"></i> Eliminar
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
import axios from "axios";

import Swal from 'sweetalert2';

export default {
  name: "IndexJuegos",
  components: {

  },

  data() {
    return {
      videojuegos: [],
    };
  },

  methods: {
    crearVideojuego() {
      this.$router.push('/dashboard/juegos/create');
    },

    verVideojuego(id) {
      this.$router.push({ name: 'JuegosById', params: { id } });
    },

    editarVideojuego(id) {
      this.$router.push({ name: 'UpdateJuegoById', params: { id } });
    },

    eliminarVideojuego(id) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`/dashboard-juegos/${id}`, {
            headers: {
              'auth-token': localStorage.getItem('token')
            }
          })
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              showConfirmButton: false,
              timer: 1500
            });
            // Actualiza la lista de videojuegos después de eliminar
            this.obtenerVideojuegos();
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar',
              text: 'No se pudo eliminar el elemento.',
            });
          });
        }
      });
    },

    async obtenerVideojuegos() {
      try {
        const response = await axios.get("/dashboard-juegos", {
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        });
        this.videojuegos = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
  },

  async created() {
    // Llama a la función para obtener la lista de videojuegos al cargar la página
    this.obtenerVideojuegos();
  },
};
</script>

<style lang="" scoped>
/* Tu estilo CSS aquí */
</style>
