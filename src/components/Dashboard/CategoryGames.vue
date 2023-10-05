<template>
  <div class="jumbotron jumbotron-fluid text-center bg-light">
    <h1 class="display-4 text-center">Categorías de Juegos y Consolas</h1>
    <p class="lead text-center">Administra nuestras emocionantes categorías de juegos y consolas.</p>
    <hr class="my-4">
    <p class="text-center">Administra una amplia selección de juegos y consolas para todos los gustos.</p>
    <p class="text-center">Administra las últimas novedades y encuentra tus favoritos.</p>
    <p class="lead">
      <a class="btn btn-primary btn-lg" href="#" role="button">Crear Nueva Categoría</a>
    </p>
  </div>


  <div class="container mt-4  ">


    <table class="table table-hover bg-secondary shadow">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Estado</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in categoryGames" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ category.nombre }}</td>
          <td>{{ category.descripcion }}</td>
          <td>{{ category.estado }}</td>
          <td>
            <button class="btn btn-outline-primary btn-sm shadow">
              <i class="fa fa-edit"></i> Editar
            </button>
            <span>&nbsp;</span> <!-- Agrega un espacio en blanco -->
            <button @click="" class="btn btn-outline-danger btn-sm shadow">
              <i class="fa fa-trash"></i> Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  name: "CategoryGames",
  data() {
    return {
      categoryGames: [],
    }
  },

  async mounted() {
    try {

      const response = await axios.get("/dashboard-category-games", {
        header: {
          'auth-token': localStorage.getItem('token')
        }
      });


      this.categoryGames = response.data.data;




    } catch (error) {
      console.log(error.response);
      if(error.response.status == 400 && error.response.data.messages == "Token inválido"){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Tu Sesion ha expirado por favor ingresa nuevamente a tu cuenta de usuario',
          showConfirmButton: false,
          timer: 3000,
          

        })
        localStorage.removeItem('token');
        this.$router.push('/login');
      }

    }
  },




}





</script>

<style  scoped></style>