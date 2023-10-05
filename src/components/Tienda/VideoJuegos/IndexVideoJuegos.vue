<template>
  <div class="jumbotron jumbotron-fluid text-center bg-light">
    <h1 class="display-4">Bienvenido a la tienda sección de videojuegos!</h1>
    <p class="lead">Aquí puedes encontrar todos los videojuegos disponibles en nuestra tienda</p>
    <hr class="my-4">
    <p>Disfruta de los mejores videojuegos del mercado actual en nuestra tienda en línea</p>
  </div>

  <div class="juegos-container">
    <h3 class="text-center mt-5">Últimos Videojuegos</h3>
    <div class="juegos-bg">
      <div class="row">
        <!-- Video Game Card -->
        <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6" v-for="(juego, index) in videojuegos" :key="index">
          <div class="card juego-card">
            <div class="card-body">
              <h5 class="card-title">{{ juego.nombre }}</h5>
              <p class="card-text">{{ juego.descripcion }}</p>
              <p class="card-text">Categoría: Acción</p>
              <p class="card-text">Plataforma: PlayStation 4</p>
              <p class="card-text">
                <h3>Precio: <span class="badge bg-primary">${{ juego.precio }}</span></h3>
              </p>
              <div>
                <img width="20%" class="card-img-top img-fluid mb-3" :src="'/public/' + juego.imagen_path" alt="Imagen">
              </div>
              <button type="button" class="btn btn-danger" @click="comprarVideojuego(index)">
                <i class="fa fa-shopping-cart" aria-hidden="true" style="font-size: 40px;"></i>
                ¡Comprar Ahora! <span class="badge text-bg-secondary">{{ juego.stock }} Unidades disponibles</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      videojuegos: [],
    };
  },

  props: {
    user: Object,
  },

  methods: {
    async fetchVideojuegos() {
      try {
        const response = await axios.get("/dashboard-juegos");
        this.videojuegos = response.data.data;
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    comprarVideojuego(index) {
      if (!this.user) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Debes iniciar sesión para poder comprar en la tienda',

        })
        this.$router.push('/login');



      }
      else {
        Swal.fire({
          icon: 'success',
          title: '!Consola agregada al carrito!',
          text: 'Gracias por tu selección',
        })
      }
    },
  },
  mounted() {
    this.fetchVideojuegos();
  },
};
</script>

<style scoped>
.juego-card {
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  overflow: hidden;
}

.juego-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Establece un ancho máximo y un alto máximo para la imagen */
.card-img-top {
  max-width: 100%; /* Ajusta el ancho de la imagen al 100% del contenedor */
  height: auto; /* Permite que la imagen ajuste su altura automáticamente */
}
</style>
