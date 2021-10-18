<template>
    <div class="container-inner flex flex-col">
        <h2 class="text-4xl mb-10 mt-10 text-left">Registrate</h2>
        <div class="flex justify-center align-center">
            <form class="w-full max-w-lg border-2 p-10 rounded-lg shadow-md">
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    Nombre
                </label>
                <input v-model="parkingName" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Nombre">
                </div>
                <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Apellido
                </label>
                <input v-model="lastname" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Apellido">
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                    Email
                </label>
                <input v-model="email" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="Email">
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-adress">
                    Dirección de establecimiento
                </label>
                <input v-model="address" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-addres" type="text" placeholder="Dirección">
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Contraseña
                </label>
                <input v-model="password" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="Contraseña">
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-re-password">
                    Repetir contraseña
                </label>
                <input v-model="passRepeat" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-re-password" type="password" placeholder="Contraseña">
                </div>
            </div>

            <div class="flex flex-wrap">
                <button @click.prevent="signupAuth" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded">
                    Registrarse
                </button>
            </div>
            
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import firebase from 'firebase/compat/app'
import { db } from '../utils/firebaseSetup'
import ParkingUser from '../interfaces/ParkingUser'

export default defineComponent({
    setup() {
        const parkingName = ref('');
        const lastname = ref('')
        const email = ref('');
        const address = ref('')
        const password = ref('')
        const passRepeat = ref('')
    
        const signupAuth = () => {
            if(parkingName.value != "" && lastname.value != "" && email.value != "" && password.value != "" && passRepeat.value != "" && password.value == passRepeat.value){                                
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email.value, password.value)
                    .then(user => {
                        const parkingUser: ParkingUser = {
                            parkingName: parkingName.value,
                            address: address.value,
                            phoneNumber: "",
                            location: {
                                lat: "",
                                long: ""
                            },
                        }  
                        user.user?.uid ? registerParkingUser(parkingUser, user.user.uid) : console.log('Error de id');                                             
                    })
                    .catch(err => console.log(err.message))
            }else{
                alert("Hay datos sin completar")
            }          
        }

        const registerParkingUser = (newUser: ParkingUser, uid: String) => {
            db.collection('ParkingUsers').doc(uid.toString()).set({uid, ...newUser}) 
                                                             .then(user => console.log(user))
                                                             .catch(err => console.log(err))
        }



        return{
            parkingName,
            lastname,
            email,
            address,
            password,
            passRepeat,
            signupAuth
        }
        
    },
})
</script>

<style scoped>

</style>