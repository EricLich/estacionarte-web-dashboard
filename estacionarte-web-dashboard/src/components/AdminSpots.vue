<template>
    <div class="flex self-start flex-col bg-white border-2 rounded-md w-full h-full mt-4 shadow-lg p-10">
        <h3 class="text-2xl text-left">Agregar espacio de estacionamiento</h3>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-6">
            <div class="mb-4">
                <label class="block text-gray-700 text-m font-bold mb-2 text-left" for="spotName">
                    Identificador del lugar
                </label>
                <input class="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="spotName" type="text" placeholder="Identificador del lugar">
            </div>
            <label class="block text-gray-700 text-m font-bold mb-2 text-left">
                <span class="text-gray-700">Tipo de Vehiculo aceptado</span>
                <select class="shadow form-select block w-full mt-1 mb-2 border py-4 px-2 rounded focus:outline-none focus:shadow-outline">
                    <option>Automovil</option>
                    <option>Camioneta</option>
                    <option>Moto</option>
                </select>
            </label>
            <label class="block text-gray-700 text-m font-bold mt-4 mb-2 text-left">
                <span class="text-gray-700">Disponible para uso</span>
                <select class="shadow form-select block w-full mt-1 mb-2 border py-4 px-2 rounded focus:outline-none focus:shadow-outline">
                    <option>Habilitado</option>
                    <option>Deshabilitado</option>
                </select>
            </label>
            <div class="flex items-center justify-between">
                <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" type="button">
                    Agregar
                </button>
            </div>
        </form>
    </div>
    <div class="flex flex-col self-start bg-white border-2 rounded-md w-full h-full shadow-lg px-8 pt-6 pb-8 mb-4 mt-4">
        <h3 class="text-2xl w-full mt-5 mb-5 text-left">Listado de espacios de estacionamiento</h3>
        <AdminSpot v-for="spot in spots" :key="spot.id" :spot="spot"/>
    </div>  
</template>

<script lang="ts">
import AdminSpot from './AdminSpot.vue';
import ParkingSpot from '../interfaces/ParkingSpot';
import { defineComponent, PropType } from 'vue';


export default defineComponent({
  name: 'AdminSpots',
  components: {
      AdminSpot: AdminSpot
  },
  props:{
    spots: Array as PropType<Array<ParkingSpot>>
  },
  setup(props){

  }
});
</script>

<style>

</style>