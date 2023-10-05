<template>

    <!-- Sección de Banderas -->
    <div class="flag-banner">
      <div class="flag">
        <img src="../../../../public/images/nintendo.png" alt="Bandeja 1">
      </div>
      <div class="flag">
        <img src="../../../../public/images/playstation.png" alt="Bandeja 2">
      </div>
      <div class="flag">
        <img src="../../../../public/images/xbox.png" alt="Bandeja 3">
      </div>
    </div>





    <div class="jumbotron jumbotron-fluid text-center bg-light">
      <h1 class="display-4">Bienvenido a la tienda sección de consolas!</h1>
      <p class="lead">Aqui puedes encontrar todas las consolas de videojuegos que tenemos disponibles en nuestra tienda
      </p>
      <hr class="my-4">
      <p>Disfruta de las mejores consolas de videojuegos del mercado actual en nuestra tienda en linea</p>

    </div>


    <div class="juegos-container">

      <h3 class="text-center mt-5">Ultimas Consolas</h3>

      <div class="juegos-bg">

        <div class="row">
          <!-- Tarjeta  -->
          <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6" v-for="(consola, index) in consolas">
            <div class="card juego-card ">

              <div class="card-body">
                <h5 class="card-title">{{ consola.nombre }}</h5>
                <p class="card-text">{{ consola.descripcion }}</p>
                <p class="card-text">Categoría: Acción</p>
                <p class="card-text">Consola: Xbox One</p>
                <p class="card-text">
                <h3>Precio: <span class="badge bg-primary">${{ consola.precio }}</span></h3>
                </p>
                <div>
                  <img width="20px" class="card-img-top img-fluid mb-3" :src="'../../../../public/' + consola.imagen_path"
                    alt="Imagen">

                </div>
                <button type="button" class="btn btn-danger" @click="comprarConsolas(index + 1)">
                  <i class="fa fa-shopping-cart" aria-hidden="true" style="font-size:40px;"></i>

                  !Comprar Ahora! <span class="badge text-bg-secondary">{{ consola.stock }} Únidades disponibles</span>
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
      consolas: [],

    }
  },

  props: {
    user: {
      type: Object
    }
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

  },

  async mounted() {

    try {
      const response = await axios.get("/dashboard-consolas");
      this.consolas = response.data.data;

      console.log(response);

    }
    catch (error) {
      console.log(error);
    }

  }
}
</script>
<style scoped>


.bg-large {
  background-image: url('../../../../public/images/portada.jpg'); 
  background-size: cover;
  background-position: center;
  padding: 20px; 
}



.flag-banner {
  background-image: url('../../../../public/images/portada.jpg'); 
  background-size: cover;
  background-position: center;
  padding: 20px; 
}

.flag {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin: 10px;

}

.flag img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Estilos para las tarjetas de consolas */
.juego-card {
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 10px;
}

.juego-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

/* Establece un ancho máximo y un alto máximo para la imagen */
.card-img-top {
  max-width: 100%;
  /* El ancho máximo será igual al ancho del card */
  max-height: 200px;
  /* Establece la altura máxima que desees */
  width: auto;
  /* Permite que la imagen ajuste su ancho automáticamente */
  height: auto;
  /* Permite que la imagen ajuste su altura automáticamente */
}
</style>






