<template>
<div>
  <header class="shadow-xl rounded-b-md">
    <div class="container">
      <div id="nav">
        <div class="logo">
          <router-link to="/" class="link-home">
            <h1 class="text-3xl font-bold">Estacionarte</h1>
          </router-link>
        </div>


        <div v-if="store.getters.getUserSignedIn()" class="nav-links-loged">
          <router-link to="/profile" class="mr-4">Perfil</router-link>
          <router-link to="/dashboard" class="mr-4">Dashboard</router-link>
          <button @click.prevent="signOut" class="text-white text-lg font-bold bg-red-500 p-3 rounded-lg shadow-md hover:bg-red-600 duration-75">Cerrar Sesión</button>
        </div>
        <div v-else class="nav-links-not-loged">
          <router-link to="/login" class="">Login</router-link>
          <router-link to="/signup" class="ml-4">Registrarse</router-link>
        </div>
      </div>
    </div>  
  </header>
  <router-view class="container"/>
</div>
</template>

<script >
import { defineComponent, onBeforeMount, provide, ref } from 'vue'
import './assets/tailwind.css'
import firebase from 'firebase/compat/app'
import { useRoute, useRouter } from 'vue-router';
import store from '@/store/index'


export default defineComponent({
    setup() {

      provide('store', store)
      const router = useRouter();
      const hola = ref('hola')

      onBeforeMount(() => {
         firebase.auth().onAuthStateChanged((userFB) => {
          if(!userFB){
            router.replace('/login')
          }
        })
      })

      const signOut = () => {
        firebase.auth().signOut();
        store.methods.resetUser();
        router.push('/login')
      }


      return{
        store,
        signOut,
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
  background-color: #004360;
}

.container{
  width: 90%;
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
  width: 35%;
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
  color: rgb(179, 179, 179);
}
</style>
