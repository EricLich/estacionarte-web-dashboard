<template>
<div class="container-inner flex flex-col">
  <h2 class="text-4xl mb-10 mt-10 text-left">Inicia Sesión</h2>
  <div class="flex justify-center align-center">
      <div class="w-full max-w-xs">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="user-email">
            Email
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600" id="user-email" type="text" placeholder="Email" v-model="email">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Contraseña
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-600" id="password" type="password" placeholder="Contraseña" v-model="password">
        </div>
        <div class="flex items-center justify-between">
          <button @click="login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Entrar
          </button>
        </div>
      </form>
    </div>
  </div>

</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router';
import firebase from 'firebase/compat/app'


export default defineComponent({
  setup() {
    const email = ref('');
    const password = ref('');

    const router = useRouter();
    async function login(){

      /* agregar funcion para verificar que sea un parking y no un usuario de la app */
      try{
        if(email.value != "" && password.value != ""){
          firebase.auth().signInWithEmailAndPassword(email.value, password.value)
                      .then(res => {
                        console.log(res.user)
                        router.push('/dashboard');
                      })
                      .catch(err => console.log(err))
          
        }else{
          console.log("mal")
        }
      }catch(err){
        console.log(err.message)
      }


        
    }


    return{
      email,
      password,
      login
    }
  },
})
</script>

<style>

</style>