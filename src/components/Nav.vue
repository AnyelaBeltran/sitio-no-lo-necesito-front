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
              <li><a class="dropdown-item" href="#">Video Juegos</a></li>
              <li><a class="dropdown-item" href="#">Consolas</a></li>
              <li>
                <hr class="dropdown-divider" />
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">Administrador</a>
          </li>
        </ul>
        <div class="btn-group" role="group">
          <router-link class="btn btn-outline-primary" to="/register">Registro</router-link>
          <router-link class="btn btn-outline-secondary" to="/login">Inicio de Sesión</router-link>
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

  props: ["user"],

  data() {
    return {
      user: null,
      token: null
    }
  },

  mounted() {
    
    console.log(user);
    
  }
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
}</style>
