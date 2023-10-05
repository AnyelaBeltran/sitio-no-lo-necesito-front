<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/home">Home</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Tienda
            </a>
            <ul class="dropdown-menu">
              <router-link class="dropdown-item" to="/tienda/consolas">Consolas</router-link>
              <router-link class="dropdown-item" to="/tienda/videojuegos">VideoJuegos</router-link>
              
            </ul>
          </li>



          <li class="nav-item dropdown" v-if="rol === 2 && user">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa fa-user" aria-hidden="true"></i>
              Dashboard - Administrador
            </a>
            <ul class="dropdown-menu">
              <router-link class="dropdown-item" to="/dashboard/consolas">Consolas</router-link>
              <router-link class="dropdown-item" to="/dashboard/juegos">VideoJuegos</router-link>
              <router-link class="dropdown-item" to="/dashboard/category-games">Categorías de juegos</router-link>



              <li>
                <hr class="dropdown-divider" />
              </li>
            </ul>
          </li>




        </ul>
        <div class="btn-group" role="group">
          <router-link class="btn btn-outline-primary" to="/register">Registro</router-link>
          <router-link v-if="!user" class="btn btn-outline-secondary" to="/login">Inicio de Sesión</router-link>
          <a v-if="user" href="javascript:void(0)" @click="logout" class="btn btn-outline-danger">Cerrar Sesión</a>
        </div>

        <!-- Agrega nombre, correo electrónico y estado "en línea" aquí -->
        <div class="navbar-text ms-auto text-center" v-if="user">
          <p class="mb-0">{{ user.nombre }} {{ user.apellido }}</p>
          <p class="mb-0">Email: {{ user.email }}</p>
          <p class="mb-0">En línea <i class="fa fa-spinner fa-spin"></i></p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  props: {
    user: Object, // Define user como una prop de tipo Object
  },
 

  data() {
    return {
      rol: null,


    }
  },

  methods: {
    logout() {
      // Emitir un evento para que el padre realice el logout
      localStorage.removeItem("token");
     
      this.$emit("logout");
    },
  },

  created() {
    if (this.user) {
    this.rol = this.user.rol_id;
    console.log(this.rol, 'rol');
  }
  },



};
</script>

<style scoped>
/* Estilos para centrar el texto verticalmente */
.navbar-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  text-align: center;
}

/* Estilos para el spinner */
.fa-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
