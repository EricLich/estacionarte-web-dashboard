<template>
    <div class="flex flex-col self-start bg-white border-2 rounded-md w-full h-4/6 shadow-lg px-8 py-8 mb-4 mt-4">
        <h3 class="text-2xl text-left mt-5">Agregar espacio de estacionamiento</h3>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-6 h-97" @keydown.enter="!store.getters.getEditing() ? triggerSave : null">
            <div class="mb-4" v-if="!multipleAdd">
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


            <!-- AGERGADO MULTIPLE -->
            <div class="mb-4" v-if="multipleAdd">
                <label class="block text-gray-700 text-m font-bold mb-2 text-left" for="spotName">
                    Indique la cantidad de lugares que desea crear (minimo 1)
                </label>
                <input v-model="cantSpots" min="1" class="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="spotName" type="number" placeholder="Identificador del lugar">
                <div v-if="cantSpots < 1 || cantSpots > 100" class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2 my-2 rounded" role="alert">
                    <p v-if="cantSpots <= 0" class="text-left pl-2 text-red-800">El número no puede ser menor a 1</p>                                                        
                </div>
                <div v-if="cantSpots.toString() == ''" class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2 my-2 rounded" role="alert">
                    <p class="text-left pl-2 text-red-800">El campo no puede estar vacío</p>
                </div>
            </div>
            

            <label v-if="!multipleAdd" class="block text-gray-700 text-m font-bold mt-4 mb-2 text-left">
                <span class="text-gray-700">Disponible para uso</span>
                <select v-model="newSpot.available" class="shadow form-select block w-full mt-1 mb-2 border py-4 px-2 rounded focus:outline-none focus:shadow-outline">
                    <option :value="true">Libre</option>
                    <option :value="false">Ocupado</option>
                </select>
            </label>
            <label v-if="!multipleAdd" class="block text-gray-700 text-m font-bold mt-4 mb-2 text-left">
                <span class="text-gray-700">Estado</span>
                <select v-model="newSpot.active" class="shadow form-select block w-full mt-1 mb-2 border py-4 px-2 rounded focus:outline-none focus:shadow-outline">
                    <option :value="true">Activo</option>
                    <option :value="false">Inactivo</option>
                </select>
            </label>
            <div v-if="!store.getters.getEditing()" class="flex items-center justify-between">
                <button @click.prevent="saveNewSpot" v-if="!multipleAdd" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" type="button">
                    Agregar
                </button>
                <button @click.prevent="addMultiple"  class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" type="button">
                    Agregar varios
                </button>
                <button v-if="multipleAdd" @click.prevent="multipleAdd = !multipleAdd"  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" type="button">
                    Cancelar agregado múltiple
                </button>
            </div>
            <div v-if="store.getters.getEditing()" class="flex items-center justify-between">
                <button @click.prevent="editSpotPassed" @keydown.enter="editSpotPassed" class="bg-yellow-400 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" type="button">
                    Editar
                </button>
                <button @click.prevent="cancelEdit" class="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" type="button">
                    Cancelar
                </button>
            </div>
        </form>
    </div>
    <div class="flex flex-col self-start bg-white border-2 rounded-md w-full h-4/6 shadow-lg px-8 py-8 mb-4 mt-4 overflow-scroll">        
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
    const multipleAdd = ref<Boolean>(false)

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

    const cantSpots = ref<number>(1)
    let spots = ref<any[]>([]);
    let add = ref<Boolean>(true);
    let spotToEditId = ref<String>('');
    let nameBeforeEdit = ref<String>('')
    let noMatches = ref<Boolean>(false);
    let spotsCopy:any[];

    const triggerSave = () => {
        saveNewSpot()
    }

    const saveNewSpot = async () => {         
        validation.repeatedName = false;
        validation.empty = false;
        if(newSpot.spotName == ''){
            validation.empty = true;
        }else{
            if(checkSpotName()){
                await db.collection('ParkingSpots').add(newSpot)   
                await getSpots()                                     
            }else{
                validation.repeatedName = true;
            }
        }   
    }


    const addMultiple = async ():Promise<void> => {
        validation.empty = false;
        if(!multipleAdd.value){
            multipleAdd.value = !multipleAdd.value;
        }else{
            if(cantSpots.value > 0){
                let realCantSpots = Math.floor(cantSpots.value) 
                let parkingIdStore = store.getters.getUserId();
                let spotsToAdd = []
                for(let i:number = 1; i <= realCantSpots; i++){
                    let ps = {
                                active: true,
                                available: true,
                                parkingID: parkingIdStore,
                                spotName: `Spot ${spots.value.length + i}`
                             }
                    spotsToAdd.push(ps)                    
                }                    
                spotsToAdd.forEach(async spot => {
                    try{                
                        await db.collection('ParkingSpots').add(spot)                
                    }catch(err){                
                        console.log(err)
                    }
                })  
                multipleAdd.value = !multipleAdd.value
                await getSpots()
            }else{
                validation.empty = true;
            }
        }
    }

    onBeforeMount(async () => {
        await getSpots()
    })

    const getSpots = async () => {
        await db.collection('ParkingSpots').where('parkingID', '==', newSpot.parkingID).onSnapshot(snapshot => {  
            newSpot.spotName = '';
            spots.value.splice(0, spots.value.length)
            snapshot.docs.map((doc, index) => {
                spots.value.push({...doc.data()})
                spots.value[index].id = doc.id                                
            })
        })
        spotsCopy = spots.value
    }

    const checkSpotName = ():boolean => {
        if(spots.value.find(spot => spot.spotName == newSpot.spotName) == undefined){
            return true
        }else{
            return false;
        }
    }

    const editSpot = (parkingSpot: any):void => {
        if(store.getters.getEditing()){
            multipleAdd.value ? multipleAdd.value = false : false
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

    const cancelEdit = ():void => {
        store.methods.changeEditingStatus();
        nameBeforeEdit.value = '';
        newSpot.spotName = '';
        newSpot.available = true;
        newSpot.active = true;
        validation.repeatedName = false;
        validation.empty = false;
        add.value = !add.value;
    }

    watch(inputValue, ():void => {
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
        noMatches,
        triggerSave,
        cantSpots,
        multipleAdd,
        addMultiple            
    }

  }
});
</script>

<style>

</style>