<template>
  <section class="vh-100 background-image">
    <div class="container h-100">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-12">
          <div class="card text-black" style="border-radius: 25px">
            <div class="card-body p-md-5">
              <div class="text-center">
                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Inicio de Sesión
                </p>
              </div>

              <form class="mx-1 mx-md-4" @submit.prevent="handleSubmit">
                <div class="mb-4">
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="fa fa-envelope fa-lg fa-fw"></i>
                    </span>
                    <input
                      type="email"
                      id="email"
                      class="form-control"
                      v-model="email"
                      required
                    />
                  </div>
                  <label class="form-label" for="email"
                    >Correo Electrónico</label
                  >
                </div>
                <div class="mb-4">
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="fa fa-lock fa-lg fa-fw"></i>
                    </span>
                    <input
                      type="password"
                      id="password"
                      v-model="password"
                      required
                      class="form-control"
                    />
                  </div>
                  <label class="form-label" for="password">Contraseña</label>
                </div>
                <div class="text-center mb-4">
                  <button type="submit" class="btn btn-primary btn-lg">
                    Iniciar Sesión
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      token: null,
      error: null,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post("/login", {
          email: this.email,
          password: this.password,
        });

        const data = response.data;

        if (data.code == 201) {
          this.token = data.result.token;
          localStorage.setItem("token", this.token);

          Swal.fire({
            icon: 'success',
            title: 'Bienvenido ' + data.result.userData.nombre + ' ' + data.result.userData.apellido,
              
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          }).then(() => {
            this.$router.push('/');
            setTimeout(() => {
              window.location.reload();
            }, 100);
          });
        }
      } catch (error) {
        if (error.response.data.code == 422 || error.response.data.code == 404) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.messages
          });
        }
      }
    },
  },
};
</script>


<style scoped>
.background-image {
  background-image: url("../assets/images/fondo-login.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 25px;
  width: 100%;
}

/* Estilos para ajustar el tamaño del spinner */

</style>
