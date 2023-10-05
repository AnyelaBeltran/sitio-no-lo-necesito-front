<template>
  <div>
    <!-- Banner con imagen -->
    <div class="banner">
      <img src="../assets/images/fondo-home.png" alt="Banner de diversión" class="banner-img">
      <div class="banner-card">
        <!-- Contenido de la tarjeta de alerta en el banner -->
        <div class="alert-info" v-if="!user">
          <h2>Porfavor! Inicie sesión para poder comprar en la tienda</h2>
        </div>
      </div>
    </div>

    <div class="text-center">

      <h2 class="text-center mt-4 text-black fw-boldd">Fuentes de diversión</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat varius urna, sed efficitur eros dictum sit
        amet.</p>


    </div>

    <!-- Div con imagen de fondo y tarjetas -->
    <div class="juegos-container">

      <h3 class="text-center mt-5">Ultimas Consolas</h3>

      <div class="juegos-bg">

        <div class="row">
          <!-- Tarjeta  -->
          <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6" v-for="(consola, index) in consolas">
            <div class="card juego-card">
              <img width="20px" class="card-img-top img-fluid mb-3" :src="'../../../../public/' + consola.imagen_path" alt="Imagen">
              <div class="card-body">
                <h5 class="card-title">{{ consola.nombre }}</h5>
                <p class="card-text">{{ consola.descripcion }}</p>
                <p class="card-text">Categoría: Acción</p>
                <p class="card-text">Consola: Xbox One</p>
                <p class="card-text">
                <h3>Precio: <span class="badge bg-primary">${{ consola.precio }}</span></h3>
                </p>
                <button type="button" class="btn btn-danger" @click="comprarConsolas(index + 1)">
                  <i class="fa fa-shopping-cart" aria-hidden="true" style="font-size:40px;"></i>

                  !Comprar Ahora! <span class="badge text-bg-secondary">{{ consola.stock }} Únidades disponibles</span>
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>


      <h3 class="text-center mt-5">Ultimas Video Juegos</h3>

      <div class="juegos-bg">

        <div class="row">
          <!-- Tarjeta 1 -->
          <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6" v-for="(juego, index) in videoJuegos">
            <div class="card juego-card">
              <img width="20px" class="card-img-top img-fluid mb-3" :src="'../../../../public/' + juego.imagen_path" alt="Imagen">
              <div class="card-body">
                <h5 class="card-title">{{ juego.nombre }}</h5>
                <p class="card-text">{{ juego.descripcion }}.</p>
                <div class="alert alert-primary" role="alert">
                  <h4> <strong>Categoría</strong>: {{ juego.Categorium.nombre }} - {{ juego.Categorium.descripcion }}
                  </h4>
                </div>
                <div class="alert alert-warning" role="alert">
                  <h4> <strong>Consola</strong>: {{ juego.Consola.nombre }} - {{ juego.Consola.descripcion }}
                  </h4>
                </div>
                <h3>Precio: <span class="badge bg-primary">${{ juego.precio }}</span></h3>

                <button type="button" class="btn btn-danger" @click="comprarJuegos(index + 1)">
                  <i class="fa fa-shopping-cart" aria-hidden="true" style="font-size:40px;"></i>

                  !Comprar Ahora! <span class="badge text-bg-secondary">{{ juego.stock }} Únidades disponibles</span>
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>



    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2';

export default {
  name: "Home",
  props: {
    user : Object

  },
 
  


  data() {
    return {
      consolas: [],
      videoJuegos: [],
      token: localStorage.getItem("token"),
     


    };
  },

  methods: {
    comprarConsolas(index) {

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

    comprarJuegos(index) {
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
          title: '¡Juego agregado al carrito!',
          text: 'Gracias por tu selección',
        })
      }

    
    }

  },



  async created() {
    try {
      const products = await axios.get("/get-last-in-stock");
      const data = products.data;

      this.consolas = data.data.consolas;
      this.videoJuegos = data.data.videojuegos

      
    } catch (error) {

    }
  },


  



};
</script>

<style scoped>
/* Estilos personalizados */

.banner {
  text-align: center;
  position: relative;
}

.banner-img {
  width: 100%;
  height: 30%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.banner-card {
  background-color: rgba(233, 203, 203, 0.8);
  /* Fondo blanco transparente */
  color: #000000;
  /* Texto en color negro */
  padding: 20px;
  /* Aumentar el espacio interior */
  text-align: center;
  border-radius: 15px;
  /* Mayor radio para los bordes */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  max-width: 80%;
  /* Ajustar el ancho máximo */
}

.alert-info {

  background-color: transparent;
  color: fff;
  padding: 15px;
  border-radius: 10px;
}

.alert-info h2 {
  color: #000000;
  font-size: 24px;
  margin-bottom: 0;
  font-family: 'Courier New', Courier, monospace;
}

.juegos-container {
  background-image: url('fondo_juegos.jpg');
  background-size: cover;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  overflow: hidden;
}

.juegos-bg {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
}

.juego-card {
  margin-bottom: 20px;
  transition: transform 0.3s ease-in-out;
}

.juego-card:hover {
  transform: scale(1.05);
}
</style>
