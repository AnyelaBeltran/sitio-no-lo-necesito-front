<template>
  <div class="jumbotron jumbotron-fluid text-center bg-light">
    <h1 class="display-4 text-center">{{ videojuego.nombre }}</h1>
    <hr class="my-4">
    <div class="card text-bg-dark">
      <img width="20px" class="card-img" :src="'/public/' + videojuego.imagen_path" alt="Imagen">
      <div class="card-img-overlay">
        <h5 class="card-title">Stock: {{ videojuego.stock }} unidades</h5>
        <p class="card-text">{{ videojuego.descripcion }}</p>
        <h2 class="card-text">Precio: ${{ videojuego.precio }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      videojuego: {},
    }
  },
  async created() {
    try {
      const id = this.$route.params.id;
      const response = await axios.get(`/dashboard-juegos/${id}`, {
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });
      this.videojuego = response.data.data;
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style lang="" scoped>
/* Tu estilo CSS aquí */
</style>
