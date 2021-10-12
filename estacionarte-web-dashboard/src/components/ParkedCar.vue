<template>
  <div class="flex flex-col border-2 rounded-md min-w-auto w-full h-auto mt-5 shadow-lg p-6 align-center justify-items-start">
    <div class="flex flex-col align-baseline">
        <h2 class="text-4xl self-start mb-2">Patente: {{ parkedCar.licensePlate }}</h2>
        <h3 class="text-2xl text-gray-500 self-start mb-2">Tiempo transcurrido: {{ parkedCar.timePassed }}</h3>
        <p class="text-xl text-gray-400 self-start mb-1">Modelo: {{ parkedCar.model }}</p>  
        <span class="text-xl text-gray-400 self-start mb-1">Marca: {{ parkedCar.brand }}</span>
    </div>

    <button class="w-24 mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-none rounded">
        Finalizar
    </button>  
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Parked from '@/interfaces/Reservation';


export default defineComponent({
    props:{
        parkedCar: Object as PropType<Parked>
    },
    setup(props) {
        
    },
})
</script>

<style scoped>

</style>