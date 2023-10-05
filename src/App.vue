<template>
  <div>
    <Nav :user="user"  @logout="logoutHandler" />

    <div>
      <router-view :user="user"  />
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';

import Nav from './components/Nav.vue'

import axios from "axios";
import Swal from 'sweetalert2';

export default {
  components: {
    Nav
  },

  data() {
    return {
      user: null,
      token: localStorage.getItem("token"),
    }
  },

  methods: {
    logoutHandler() {
      localStorage.removeItem("token");
      this.user = null;

    }
  },

  async created() {
    console.log(this.token, 'token');
    try {
    

      const tokenPayload = jwtDecode(this.token);
      console.log(tokenPayload, 'tokenpayload');

      this.user = {
        nombre: tokenPayload.nombre,
        apellido: tokenPayload.apellido,
        email: tokenPayload.email,
        rol_id: tokenPayload.rol_id
      }

      
      console.log(this.rol_id, this.user);
    } catch (error) {


    }

  
   




  },
 
  watch: {
    user(newVal, oldVal) {
      // Realiza acciones en respuesta al cambio de user
      console.log('El valor de user ha cambiado:', newVal, oldVal);
    },
    token(newVal, oldVal) {
      // Realiza acciones en respuesta al cambio de token
      console.log('El valor de token ha cambiado:', newVal, oldVal);
    },
  },
}
</script>

<style scoped></style>
