<template>
  <div class="flex flex-col border-2 rounded-md min-w-auto w-full h-auto mt-5 shadow-lg p-6 align-center justify-items-start">
    <div class="flex flex-col align-baseline">
        <h2 class="text-4xl self-start mb-2">Spot: {{ reservation.parkingSpotId }}</h2>
        <h3 class="text-2xl text-gray-500 self-start mb-2">Tiempo transcurrido: {{ reservation.reservationDate }}</h3>
        <p class="text-xl text-gray-400 self-start mb-1">idVehic: {{ reservation.idVehicle }}</p>  
    </div>

    <button class="w-24 mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border-none rounded">
        Ingresar
    </button>  
  </div>
</template>

<script lang="ts">
import Reservation from '@/interfaces/Reservation';
import { defineComponent, PropType } from 'vue';


export default defineComponent({
  name: 'Reservation',
  props:{
    reservation: Object as PropType<Reservation>
  },
  setup(props){

  }
});
</script>

<style>

</style>