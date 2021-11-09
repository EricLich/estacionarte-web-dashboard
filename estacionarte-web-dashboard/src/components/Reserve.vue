<template>
  <div class="flex flex-col border-2 rounded-md min-w-auto w-full h-60 mt-5 shadow-lg p-6 align-center justify-items-start">
    <div class="flex flex-col align-baseline">
        <h2 class="text-4xl font-bold self-start mb-2">Lugar: <span class="text-md">{{ res.spot.spotName }}</span></h2>
        <h3 class="text-2xl font-semibold text-gray-500 self-start mb-2">Vehiculo: {{ res.vehicle.brand }} - {{ res.vehicle.model }}</h3>
        <p class="text-xl text-gray-500 self-start mb-1">Patente: <span class="font-bold">{{ res.vehicle.licensePlate }}</span></p>  
    </div>

    <div class="flex justify-between self-center">
      <button class="w-18 self-start mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border-none rounded mr-1" @click="proceedReservation">
          Ingresar
      </button>  
      <button class="w-18 self-start mt-4 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 border-none rounded ml-1" @click="cancelReservation">
          Cancelar
      </button>  
    </div>
  </div>
</template>

<script lang="ts">
import Reservation from '@/interfaces/Reservation';
import { defineComponent, PropType, reactive } from 'vue';


export default defineComponent({
  name: 'Reservation',
  props:{
    reservation: Object as PropType<Reservation>
  },
  setup(props, { emit }){


    /* SI SE PONE EN INACTIVO EL SPOT HAY QUE CANCELAR LA RESERVA */

    let res = reactive({...props.reservation});
    const proceedReservation = () => {
      emit('proceedReservation', res);
    }

    const cancelReservation = () => {
      emit('cancel', res);
    }

    return{
      res,
      proceedReservation,
      cancelReservation
    }
  } 
});
</script>

<style>

</style>