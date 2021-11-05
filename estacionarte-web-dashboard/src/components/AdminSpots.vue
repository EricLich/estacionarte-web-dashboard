<template>
    <div class="flex self-start flex-col bg-white border-2 rounded-md w-full h-4/6 mt-4 shadow-lg p-10">
        <h3 class="text-2xl text-left">Agregar espacio de estacionamiento</h3>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-6 h-100">
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
                    <option :value="true">Libre</option>
                    <option :value="false">Ocupado</option>
                </select>
            </label>
            <label class="block text-gray-700 text-m font-bold mt-4 mb-2 text-left">
                <span class="text-gray-700">Estado</span>
                <select v-model="newSpot.active" class="shadow form-select block w-full mt-1 mb-2 border py-4 px-2 rounded focus:outline-none focus:shadow-outline">
                    <option :value="true">Activo</option>
                    <option :value="false">Inactivo</option>
                </select>
            </label>
            <div v-if="!store.getters.getEditing()" class="flex items-center justify-between">
                <button @click.prevent="saveNewSpot()" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" type="button">
                    Agregar
                </button>
            </div>
            <div v-if="store.getters.getEditing()" class="flex items-center justify-between">
                <button @click.prevent="editSpotPassed()" class="bg-yellow-400 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" type="button">
                    Editar
                </button>
                <button @click.prevent="cancelEdit" class="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" type="button">
                    Cancelar
                </button>
            </div>
        </form>
    </div>
    <div class="flex flex-col self-start bg-white border-2 rounded-md w-full h-4/6 shadow-lg px-8 pt-6 pb-8 mb-4 mt-4 overflow-scroll">        
        <h3 class="text-2xl w-full mt-5 mb-5 text-left">Listado de espacios de estacionamiento</h3>
        <input type="text" v-model="inputValue" placeholder="Buscar espacio" class="mb-5 align-self-start w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-md border-0 shadow outline-none focus:outline-none focus:ring pr-10"/>
        <AdminSpot v-for="(spot) in spots" :key="spot.id" :spot="spot" @editSpot="editSpot"/>
        <div v-if="noMatches" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full" role="alert">
            <strong class="font-bold">Ups!</strong><br>
            <span class="block sm:inline">No hay identificadores que coincidan</span>
        </div>   
    </div>  
</template>

<script lang="ts">
import AdminSpot from './AdminSpot.vue';
import { defineComponent, reactive, inject, onBeforeMount, ref, watch } from 'vue';
import { db } from '../utils/firebaseSetup';

export default defineComponent({
  name: 'AdminSpots',
  components: {
      AdminSpot: AdminSpot
  },
  setup(props){

    const store:any = inject('store');

    let inputValue = ref<String>('')

    let newSpot = reactive({
        active: true as Boolean,
        spotName: '' as String,
        parkingID: store.getters.getUserId() as String,
        available: true as boolean
    })

    let validation = reactive({
        repeatedName: false,
        empty: false
    })

    let spots = ref<any[]>([]);

    let add = ref<Boolean>(true);
    
    let spotToEditId = ref<String>('');

    let nameBeforeEdit = ref<String>('')

    let noMatches = ref<Boolean>(false);

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
            spots.value.splice(0, spots.value.length)
            snapshot.docs.map((doc, index) => {
                spots.value.push({...doc.data()})
                spots.value[index].id = doc.id                                
            })
        })
    })

    const checkSpotName = ():boolean => {
        if(spots.value.find(spot => spot.spotName == newSpot.spotName) == undefined){
            return true
        }else{
            return false;
        }
    }

    const editSpot = (parkingSpot: any) => {
        if(store.getters.getEditing()){
            validation.empty = false;
            validation.repeatedName = false   
            nameBeforeEdit.value = parkingSpot.spotName;     
            newSpot.spotName = parkingSpot.spotName;
            newSpot.available = parkingSpot.available;
            newSpot.active = parkingSpot.active
            spotToEditId = parkingSpot.id
            add.value = !add.value;
        }else if(!store.getters.getEditing()){
            console.log('aca')
            nameBeforeEdit.value = '';     
            newSpot.spotName = '';
            newSpot.parkingID = '';
            newSpot.active = true
            validation.empty = false;
            validation.repeatedName = false;
            add.value = !add.value;
        }
    }

    const editSpotPassed = async () => {
        validation.repeatedName = false;
        validation.empty = false;

        if(newSpot.spotName == ''){
            validation.empty = true;
        }else{
            if(checkSpotName()  || newSpot.spotName == nameBeforeEdit.value){
                db.collection('ParkingSpots').doc(spotToEditId.toString()).update({spotName: newSpot.spotName, available: newSpot.available, active: newSpot.active})
                add.value = !add.value; 
                newSpot.spotName = ''  
                newSpot.active = true
                newSpot.available = true  
                store.methods.changeEditingStatus()        
            }else {
                validation.repeatedName = true;
            }
        }
    }

    const cancelEdit = () => {
        store.methods.changeEditingStatus();
        nameBeforeEdit.value = '';
        newSpot.spotName = '';
        newSpot.available = true;
        newSpot.active = true;
        validation.repeatedName = false;
        validation.empty = false;
        add.value = !add.value;
    }

    let spotsCopy = spots.value;
    watch(inputValue, () => {
        spots.value = spotsCopy;
        spots.value = spots.value.filter(spot => spot.spotName.toLowerCase().includes(inputValue.value.toLowerCase()))
        if(spots.value.length == 0){
            noMatches.value = true;
        }else{
            noMatches.value = false;
        }
    })

    return{
        store,
        newSpot, 
        saveNewSpot,
        spots,
        editSpot,
        add,
        editSpotPassed,
        spotToEditId,
        validation,
        cancelEdit,   
        inputValue,
        noMatches            
    }

  }
});
</script>

<style>

</style>