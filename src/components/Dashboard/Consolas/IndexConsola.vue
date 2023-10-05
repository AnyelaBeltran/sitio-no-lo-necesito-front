<template>
  <div class="container">
    <div class="jumbotron jumbotron-fluid text-center bg-light">
    <h1 class="display-4 text-center">Index Consolas</h1>
    <p class="lead text-center">Administra una amplia selección de consolas.</p>
    <hr class="my-4">
    <p class="text-center">Administra una amplia selección de consolas para todos los gustos.</p>
    <p class="text-center">Administra las últimas novedades y encuentra tus favoritos.</p>
    <p class="lead">
      <a class="btn btn-primary btn-lg"  @click="crearConsola" href="#" role="button">Crear Consola</a>
    </p>
  </div>

    <table class="table table-hover bg-secondary shadow">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Precio</th>
          <th scope="col">Stock</th>
          <th scope="col">Marca</th>

          <th scope="col">Descripcion</th>
          <th scope="col">Estado</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(consola, index) in consolas" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ consola.nombre }}</td>

          <td><code>$</code>{{ consola.precio }}</td>
          <td>{{ consola.stock }} únidades</td>

          <td> <strong>{{ consola.Marca.nombre }}</strong> </td>

          <td>{{ consola.descripcion }}</td>
          <td>{{ consola.estado }}</td>

          <td>
            <div class="btn-group" role="group">
              <button @click="verConsola(consola.id)" class="btn btn-outline-success btn-sm shadow">
                <i class="fa fa-eye"></i> Ver
              </button>
              <button @click="editarConsola(consola.id)" class="btn btn-outline-warning btn-sm shadow">
                <i class="fa fa-pencil"></i> Editar
              </button>

              <button @click="eliminarConsola(consola.id)" class="btn btn-outline-danger btn-sm shadow">
                <i class="fa fa-trash"></i> Eliminar
              </button>
            </div>

          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2';
export default {
  name: "IndexConsolas",
  components: {
    
  },

  data() {
    return {
      consolas: [],
      marcas: [],
      title: null,

    }
  },

  methods: {
    crearConsola() {
      this.$router.push('/dashboard/consolas/create');

    },

    verConsola(index) {
      console.log(index, 'consola');
      this.$router.push({ name: 'ConsolasById', params: { id: index } });
    },

    editarConsola(index) {
      this.$router.push({ name: 'UpdateConsolaById', params: { id: index } });
    },


    eliminarConsola(index) {
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
      axios.delete(`/dashboard-consolas/${index}`, {
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
}

  


  },




  async created() {

    try {
      const response = await axios.get("/dashboard-consolas", {
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });
      this.consolas = response.data.data;

      const marcasResponse = await axios.get("/get-marcas");
      this.marcas = marcasResponse.data.data.marcas;
    } catch (error) {

    }
  },
}
</script>

<style lang="" scoped>

</style>