<template>
  <div>
   <Nav :user="user" />
    <div >
      <router-view :user="user" />
    </div>
  </div>
</template>

<script>

import Nav from './components/Nav.vue'

import axios from "axios";

export default {
  components: {
    Nav
  },

  data() {
    return {
      user: null,
      
    }
  },

  async created() {
    try {
      const response = await axios.get("/user");
      console.log(response.data);
      this.user = response.data;  

      
    } catch (error) {

    }



  },

}
</script>

<style scoped></style>
