<template>
  <div class="jumbotron jumbotron-fluid text-center bg-light">
    <h1 class="display-4 text-center">{{ consola.nombre }}</h1>
    <hr class="my-4">


    <div class="card text-bg-dark">
      <img width="20px" class="card-img" :src="'../../../../public/' + consola.imagen_path" alt="Imagen">
      <div class="card-img-overlay">
        <h5 class="card-title">Stock: {{ consola.stock }} unidades</h5>
        <p class="card-text">{{ consola.descripcion }}</p>
        <h2 class="card-text">Precio: ${{ consola.precio }}</h2>
      </div>
    </div>


  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      consola: [],

    }
  },

  async created() {
    try {
      const response = await axios.get("/dashboard-consolas/" + this.$route.params.id);
      this.consola = response.data.data;

      console.log(this.consola);

    }
    catch (error) {
      console.log(error);
    }

  }

}
</script>

<style lang="" scoped>

</style>