<template>
        <div class="container-inner flex flex-col">
        <h2 class="text-4xl mb-10 mt-10 text-left">Datos de Estacionamiento</h2>
        <div class="flex justify-center align-center">
            <form class="w-full max-w-lg border-2 p-10 rounded-lg shadow-md" >
            
            <div class="flex flex-wrap -mx-3 mb-3">
                <div class="w-full px-3">
                    <label class="text-left block tracking-wide text-gray-700 text-lg font-bold" for="grid-cuit">
                        Nombre de establecimiento
                    </label>
                    <input :disabled="!edit" v-model="updatedUser.parkingName" :class="edit && 'bg-gray-200'" class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-nombre" type="text" placeholder="Nombre establecimiento">                    
                    <div v-if="updatedUser.parkingName.length < 1" class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2 rounded" role="alert">
                        <p class="text-left pl-2 text-red-800">El nombre no puede estar vacío</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-3">
                <div class="w-full px-3">
                    <label class="text-left block tracking-wide text-gray-700 text-lg font-bold" for="grid-cuit">
                        Cuit
                    </label>
                    <input :disabled="!edit" v-model="updatedUser.cuit" :class="edit && 'bg-gray-200'" class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-cuit" type="text" placeholder="CUIT">                    
                    <div v-if="updatedUser.cuit.length < 11 || updatedUser.cuit.length > 11" class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2 rounded" role="alert">
                        <p class="text-left pl-2 text-red-800">El cuit debe tener 11 caracteres.</p>
                    </div>
                    <div v-if="cuitExists" class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2 rounded" role="alert">
                        <p class="text-left pl-2 text-red-800">El cuit ya está asignado a otro usuario.</p>
                    </div>
                </div>
            </div>            
            <div class="flex flex-wrap -mx-3 mb-3">
                <div class="w-full px-3 mb-6 md:mb-0">
                    <label class="text-left block tracking-wide text-gray-700 text-lg font-bold" for="grid-adress">
                        Dirección
                    </label>
                    <input :disabled="!edit" v-model="updatedUser.address" :class="edit && 'bg-gray-200'" class="appearance-none w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-addres" type="text" placeholder="Dirección">
                    <div v-if="updatedUser.address.length == 0" class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2 rounded" role="alert">
                        <p class="text-left pl-2 text-red-800">El campo no puede quedar vacío</p>
                    </div>
                    <div v-if="addressExists" class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2 rounded" role="alert">
                        <p class="text-left pl-2 text-red-800">Esta dirección ya existe</p>
                    </div>
                </div>
            </div>

            <div class="flex justify-between">
                <button v-if="!edit" @click.prevent="edit = !edit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded">
                    Editar
                </button>
                <button v-if="edit" @click.prevent="updateUser" @keydown.enter="updateUser" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-3 px-5 rounded">
                    {{ !store.getters.getLoadingStatus() ? 'Guardar' : 'Guardando...'}}
                </button>
                <button v-if="edit" @click.prevent="cancelEdit" class="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-5 rounded">
                    Cancelar
                </button>
            </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, ref } from 'vue'
import { db } from '../utils/firebaseSetup'
import axios from 'axios'

export default defineComponent({
    setup() {
        const store:any = inject('store') //injecting store
        const storeUser:any = store.getters.getUser()

        const edit = ref(false)

        const updatedUser = reactive<any>({
            parkingName: storeUser.parkingName as string,
            cuit: storeUser.cuit as string,
            address: storeUser.address as string
        })

        const exAddress = store.getters.getUserAddress()
        const exCuit = store.getters.getUserCuit()

        const nameOK = ref<Boolean>(true)
        const cuitOK = ref<Boolean>(true)
        const addressOK = ref<Boolean>(true)
        const addressExists = ref<Boolean>(false)
        const cuitExists = ref<Boolean>(false)

        const cancelEdit = () => {
            edit.value = !edit.value
            updatedUser.parkingName = storeUser.parkingName
            updatedUser.cuit = storeUser.cuit
            updatedUser.address = storeUser.address
            nameOK.value == false ? nameOK.value = true : false
            cuitOK.value == false ? cuitOK.value = true : false
            addressOK.value == false ? addressOK.value = true : false
        }

        const updateUser = async ():Promise<void> => {
            store.methods.changeLoadingStatus()
            nameOK.value = updatedUser.parkingName.length > 0
            cuitOK.value = updatedUser.cuit.length == 11
            addressOK.value = updatedUser.address.length > 0

            if(nameOK.value && cuitOK.value && addressOK.value){
                if(exAddress != updatedUser.address){
                    addressExists.value = await checkAdressExists(updatedUser.address)
                }
                if(!addressExists.value){
                    if(exCuit != updatedUser.cuit){
                        cuitExists.value = await checkCuitExists(updatedUser.cuit)
                    }
                    if(!cuitExists.value){
                        try{
                            let separatedAddress = updatedUser.address.split(' ');
                            let newAddress = separatedAddress.splice(0, separatedAddress.length - 1).join(' ')
                            let number = separatedAddress[separatedAddress.length - 1]                              
                            let [lat, long] = await checkLatLong(newAddress, number)
                            
                            await db.collection('ParkingUsers').doc(storeUser.uid).update({parkingName: updatedUser.parkingName, cuit: updatedUser.cuit, address: updatedUser.address, location: {lat, long}})
                            let user = await db.collection('ParkingUsers').doc(storeUser.uid).get()

                            user != undefined && localStorage.setItem('logedUser', JSON.stringify(user.data()))
                            store.methods.setUser(JSON.parse(localStorage.getItem('logedUser')!))                     
                            alert('Usuario actualizado')
                            edit.value = !edit.value
                            store.methods.changeLoadingStatus()
                            nameOK.value = true
                            cuitOK.value = true
                            addressOK.value = true
                        }catch(err){
                            store.methods.changeLoadingStatus()
                            console.log(err, 'aca')
                        }
                    }
                }else{
                    store.methods.changeLoadingStatus()
                }
            }else{
                store.methods.changeLoadingStatus()                
            }
        }

        const checkAdressExists = async (address: string):Promise<Boolean> => {            //metodo que devuelve true en caso de que exista la direccion en algun documento y false en el caso contrario
            const snapshot = await db.collection('ParkingUsers').get()
            return await snapshot.docs.find(user => user.data().address == address) != undefined ? true : false //si no encuentra devuelve false y si encuentra true      
        }

        const checkCuitExists = async (cuit: string):Promise<Boolean> => {            //metodo que devuelve true en caso de que exista la direccion en algun documento y false en el caso contrario
            const snapshot = await db.collection('ParkingUsers').get()
            return await snapshot.docs.find(user => user.data().cuit == cuit) != undefined ? true : false //si no encuentra devuelve false y si encuentra true      
        }

        const checkLatLong = async (address: string, number: string) => {
            let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${number}+${address}+buenos+aires&key=AIzaSyB1JGcj9GhNgv1_mX0zNEa8S7FxwC8adCM`
            const locationData:any = await axios.get(url)
            let lat = locationData.data.results[0].geometry.location.lat
            let long = locationData.data.results[0].geometry.location.lng
            return [lat, long]
        }
        
    
        return{    
            store,
            edit,        
            updateUser,
            cuitOK,
            addressOK,
            cuitExists,
            addressExists,
            updatedUser,
            cancelEdit
        }

    },
})
</script>

<style scoped>

</style>
