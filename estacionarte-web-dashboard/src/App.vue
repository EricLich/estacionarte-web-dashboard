<template>
<div>
  <header>
    <div class="container">
      <div id="nav">
        <div class="logo">
          <router-link to="/" class="link-home">
            <h1 class="text-3xl">Estacionarte</h1>
          </router-link>
        </div>

        <div v-if="user == null"  class="nav-links-not-loged">
          <router-link to="/login" class="mr-4">Login</router-link>
          <router-link to="/signup">Registrarse</router-link>
        </div>

        <div v-if="user" class="nav-links-loged">
          <router-link to="/profile" class="mr-4">Perfil</router-link>
          <router-link to="/dashboard" class="mr-4">Dashboard</router-link>
          <router-link to="/" @click="user = null" class="text-red-500">Cerrar Sesión</router-link>
        </div>

      </div>
    </div>  
  </header>
  <router-view class="container"/>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import './assets/tailwind.css'

export default defineComponent({
  setup() {

     let user = ref(1) 


    return{
      user
    }
  },
})
</script>



<style>

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  
}

header{
  width: 100%;
  background-color: #9B9B9B;
}

.container{
  width: 85%;
  margin: auto;
}

.container-inner{
  width: 60%;
  margin: auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.link-home{
  text-decoration: none;
}

.link-home h1{
  color: white;
}

.nav-links-not-loged{
  width: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links-loged{
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links-not-loged a, .nav-links-loged a{
  color: white;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.3rem;
}



.nav-links-not-loged a.router-link-exact-active, .nav-links-loged a.router-link-exact-active{
  color: black;
}
</style>
