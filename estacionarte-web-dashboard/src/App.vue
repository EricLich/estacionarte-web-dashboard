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


        <div v-if="userSignedIn" class="nav-links-loged">
          <router-link to="/profile" class="mr-4">Perfil</router-link>
          <router-link to="/dashboard" class="mr-4">Dashboard</router-link>
          <button @click.prevent="signOut" class="text-red-500">Cerrar Sesión</button>
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
import { defineComponent, onBeforeMount, ref, watch } from 'vue'
import './assets/tailwind.css'
/* import auth from '@/utils/firebaseSetup' */
import firebase from 'firebase/compat/app'
import { useRoute, useRouter } from 'vue-router';


export default defineComponent({
    setup() {
    
    let userUid = ref('');
    let userSignedIn = ref(false);
    const router = useRouter();
    
    onBeforeMount( () => {
       firebase.auth().onAuthStateChanged((user) => {
        if(!user){
          userSignedIn.value = false
          console.log("no hay")
          router.replace('/login')        
        }else{
          router.replace('/dashboard')
          userSignedIn.value = true
          userUid.value = user.uid
        }
      })
    })

    watch((userUid) => {
      if(userUid.value != ''){
        userSignedIn.value = true;  
      }else{
        userSignedIn.value = false;
      }
    })


    const signOut = () => {
      firebase.auth().signOut();
      userUid.value = ''
      userSignedIn.value = false;
      router.push('/')
    }


    return{
      userUid,
      userSignedIn,
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
