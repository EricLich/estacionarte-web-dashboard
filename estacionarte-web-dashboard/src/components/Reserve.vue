<template>
  <div class="flex flex-col border-2 rounded-md min-w-auto w-full h-auto mt-5 shadow-lg p-6 align-center justify-items-start">
    <div class="flex flex-col align-baseline">
        <!-- <h2 class="text-4xl self-start mb-2">Spot: <span class="text-lg">{{ res.spot.spotName }}</span></h2> VER DE CREAR UNA RESERVA EN UN SPOT DEMI-->
        <h3 class="text-2xl text-gray-500 self-start mb-2 mt-1">Vehiculo: {{ res.vehicle.brand }} - {{ res.vehicle.model }}</h3>
        <p class="text-xl text-gray-500 self-start mb-1">Patente: {{ res.vehicle.licensePlate }}</p>  
    </div>

    <button class="w-18 self-start mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border-none rounded">
        Ingresar
    </button>  
  </div>
</template>

<script lang="ts">
import Reservation from '@/interfaces/Reservation';
import { defineComponent, onBeforeMount, PropType } from 'vue';


export default defineComponent({
  name: 'Reservation',
  props:{
    reservation: Object as PropType<Reservation>
  },
  setup(props){

    let res = props.reservation;
    console.log(res)

    onBeforeMount(async () => {

    })


    return{
      res
    }
  } 
});
</script>

<style>

</style>