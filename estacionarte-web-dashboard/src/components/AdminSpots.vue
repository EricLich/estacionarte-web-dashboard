<template>
    <div class="flex self-start flex-col bg-white border-2 rounded-md w-full h-full mt-4 shadow-lg p-10">
        <h3 class="text-2xl text-left">Agregar espacio de estacionamiento</h3>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-6">
            <div class="mb-4">
                <label class="block text-gray-700 text-m font-bold mb-2 text-left" for="spotName">
                    Identificador del lugar
                </label>
                <input v-model="newSpot.spotName" class="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="spotName" type="text" placeholder="Identificador del lugar">
                <div v-if="validation.repeatedName" class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2 my-2 rounded" role="alert">
                    <p class="text-left pl-2 text-red-800">No puede haber dos lugares con el mismo identificador.</p>
                </div>
                <div v-if="validation.empty" class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2 my-2 rounded" role="alert">
                    <p class="text-left pl-2 text-red-800">El identificador del lugar no puede estar vacio.</p>
                </div>
            </div>
            
            <!-- <label class="block text-gray-700 text-m font-bold mb-2 text-left">
                <span class="text-gray-700">Tipo de Vehiculo aceptado</span>
                <select class="shadow form-select block w-full mt-1 mb-2 border py-4 px-2 rounded focus:outline-none focus:shadow-outline">
                    <option>Automovil</option>
                    <option>Camioneta</option>
                    <option>Moto</option>
                </select>
            </label> -->
            <label class="block text-gray-700 text-m font-bold mt-4 mb-2 text-left">
                <span class="text-gray-700">Disponible para uso</span>
                <select v-model="newSpot.available" class="shadow form-select block w-full mt-1 mb-2 border py-4 px-2 rounded focus:outline-none focus:shadow-outline">
                    <option :value="true">Habilitado</option>
                    <option :value="false">Deshabilitado</option>
                </select>
            </label>
            <div v-if="add" class="flex items-center justify-between">
                <button @click.prevent="saveNewSpot()" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" type="button">
                    Agregar
                </button>
            </div>
            <div v-if="!add" class="flex items-center justify-between">
                <button @click.prevent="editSpotPassed()" class="bg-yellow-400 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" type="button">
                    Editar
                </button>
            </div>
        </form>
    </div>
    <div class="flex flex-col self-start bg-white border-2 rounded-md w-full h-full shadow-lg px-8 pt-6 pb-8 mb-4 mt-4 ">        
        <h3 class="text-2xl w-full mt-5 mb-5 text-left">Listado de espacios de estacionamiento</h3>
        <AdminSpot v-for="(spot, index) in spots" :key="index" :spot="spot" @editSpot="editSpot"/>
    </div>  
</template>

<script lang="ts">
import AdminSpot from './AdminSpot.vue';
import { defineComponent, reactive, inject, onBeforeMount, ref } from 'vue';
import { db } from '../utils/firebaseSetup';

export default defineComponent({
  name: 'AdminSpots',
  components: {
      AdminSpot: AdminSpot
  },
  setup(){

    const store:any = inject('store');

    let newSpot = reactive({
        spotName: '' as String,
        parkingID: store.getters.getUserId() as String,
        vehicleID: 'test' as String,
        available: true as boolean
    })

    let validation = reactive({
        repeatedName: false,
        empty: false
    })

    let spots = reactive<any[]>([]);

    let add = ref(true)
    
    let spotToEditId = ref('');

    const saveNewSpot = async () => { 
        validation.repeatedName = false;
        validation.empty = false;
        if(newSpot.spotName == ''){
            validation.empty = true;
        }else{
            if(checkSpotName()){
                await db.collection('ParkingSpots').add(newSpot)                                        
            }else{
                validation.repeatedName = true;
            }
        }
        
    }

    onBeforeMount(async () => {
        await db.collection('ParkingSpots').where('parkingID', '==', newSpot.parkingID).onSnapshot(snapshot => {  
            newSpot.spotName = '';
            spots.splice(0, spots.length)
            snapshot.docs.map((doc, index) => {
                spots.push({...doc.data()})
                spots[index].id = doc.id                                
            })
        })
    })

    const checkSpotName = ():boolean => {
        if(spots.find(spot => spot.spotName == newSpot.spotName) == undefined){
            return true
        }else{
            return false;
        }
    }

    const editSpot = (parkingSpot: any) => {
        validation.empty = false;
        validation.repeatedName = false
        newSpot.spotName = parkingSpot.spotName;
        newSpot.available = parkingSpot.available;
        spotToEditId = parkingSpot.id
        add.value = !add.value;
    }

    const editSpotPassed = async () => {
        validation.repeatedName = false;
        validation.empty = false;
        if(newSpot.spotName == ''){
            validation.empty = true;
        }else{
            if(checkSpotName()){
                db.collection('ParkingSpots').doc(spotToEditId.toString()).update({spotName: newSpot.spotName, available: newSpot.available})
                add.value = !add.value; 
            }else{
                validation.repeatedName = true;
            }
        }
    }

    return{
        store,
        newSpot, 
        saveNewSpot,
        spots,
        editSpot,
        add,
        editSpotPassed,
        spotToEditId,
        validation
    }

  }
});
</script>

<style>

</style>