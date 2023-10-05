<template>
  <h1 class="display-4 text-center">Crear Consola</h1>

  <div class="row">
    <div class="col col-md-6 offset-md-3 ">

      <form @submit.prevent="crearConsola" enctype="multipart/form-data">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" class="form-control" id="nombre" v-model="nuevaConsola.nombre" required>
        </div>
        <div class="form-group">
          <label for="precio">Precio:</label>
          <input type="number" class="form-control" id="precio" v-model="nuevaConsola.precio" required>
        </div>
        <div class="form-group">
          <label for="stock">Stock:</label>
          <input type="number" class="form-control" id="stock" v-model="nuevaConsola.stock" required>
        </div>
        <div class="form-group">
          <label for="marca_id">Marca:</label>
          <select class="form-control" id="marca_id" v-model="nuevaConsola.marca_id" required>
            <option value="">Seleccione una marca</option>
            <option v-for="marca in marcas" :key="marca.id" :value="marca.id">{{ marca.nombre }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="descripcion">Descripción:</label>
          <textarea class="form-control" id="descripcion" v-model="nuevaConsola.descripcion" required></textarea>
        </div>

        <div class="form-group">
          <label for="estado">Estado:</label>
          <select @change="convertirEstado" class="form-control" id="estado" v-model="nuevaConsola.estado" required>
            <option value="1">Activo</option>
            <option value="2">Inactivo</option>
          </select>
        </div>


        <div class="form-group">
          <label for="imagen">Imagen:</label>
          <input type="file" class="form-control " id="imagen" name="imagen" @change="cargarImagen" required>
        </div>



        <div class="text-center mt-3">
          <button type="button" @click="cancelar"  class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
          <button type="submit"  class="btn btn-primary">Crear Consola</button>
        </div>
      </form>
    </div>


  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2';

export default {
  name: "CreateConsola",

  props: {
    marcas: Object
  },

  
 

  data() {
    return {
      nuevaConsola: {
        nombre: "",
        precio: "",
        stock: "",
        marca_id: "",
        descripcion: "",
        estado: null,
        selectedFile: ""
      },

      errors: [],
     
      marcas: [],


    };
  },

  methods: {
    cancelar(){
      this.$router.push('/dashboard/consolas');
    },


    async crearConsola() {
      const formData = new FormData();
      formData.append('nombre', this.nuevaConsola.nombre);
      formData.append('precio', this.nuevaConsola.precio);
      formData.append('stock', this.nuevaConsola.stock);
      formData.append('marca_id', this.nuevaConsola.marca_id);
      formData.append('descripcion', this.nuevaConsola.descripcion);
      formData.append('estado', 1);
      formData.append("file", this.nuevaConsola.selectedFile);


      try {
        const response = await axios.post('/dashboard-consolas', formData, {
          headers: {
            'auth-token': localStorage.getItem('token')
          },
          onUploadProgress: progressEvent => {
            console.log(progressEvent.loaded / progressEvent.total)
          }
        });

     
        Swal.fire({
          icon: 'success',
          title: 'Consola creada correctamente',
          showConfirmButton: false,
          timer: 1500
        });

        this.$router.push('/dashboard/consolas');


      } catch (error) {
        console.error('Error al crear la consola:', error);

        if (error.response && error.response.data && error.response.data.errors) {
          const errors = error.response.data.errors;
          this.errors = errors;
          Swal.fire({
            icon: 'error',
            title: 'Error al crear la consola',
            text: 'Por favor revisa los siguientes errores: ',

          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al crear la consola',
            text: 'Ha ocurrido un error al intentar crear la consola. Por favor, inténtalo nuevamente.',
          });
        }
      }
    },







    cargarImagen(e) {
      const selectedFile = e.target.files[0];
      this.nuevaConsola.selectedFile = selectedFile;
    },


  },

  async created() {
    const marcasResponse = await axios.get("/get-marcas");
    this.marcas = marcasResponse.data.data.marcas;
  },


}



</script>

<style lang="" scoped>

</style>