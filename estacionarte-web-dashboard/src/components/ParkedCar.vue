<template>
  <div class="flex flex-col border-2 rounded-md min-w-auto w-full h-auto mt-5 shadow-lg p-6 align-center justify-items-start">
    <div class="flex flex-col align-baseline">
        <h2 class="text-3xl font-bold self-start mb-2">Patente: {{ parked.vehicle.licensePlate }}</h2>
        <h2 class="text-3xl font-bold self-start mb-2">Lugar: {{ parked.spot.spotName }}</h2>
        <h3 class="text-2xl font-semibold text-gray-500 self-start mb-2">Tiempo transcurrido: {{ parkedCar.timePassed }}</h3>
        <p class="text-xl text-gray-400 self-start mb-1">Modelo: {{ parked.vehicle.model }}</p>  
        <span class="text-xl text-gray-400 self-start mb-1">Marca: {{ parked.vehicle.brand }}</span>
    </div>

    <button class=" text-md w-28 mt-4 bg-red-500 hover:bg-red-700 duration-75 text-white font-bold p-2 border border-none rounded shadow-md" @click="end()">
        Finalizar
    </button>  
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import Parked from '@/interfaces/Reservation';


export default defineComponent({
    props:{
        parkedCar: Object as PropType<Parked>
    },
    setup(props, { emit }) {
        let parked = reactive({...props.parkedCar})

        const end = () => {
          emit('end', parked)
        }

        return{
          parked,
          end
        }
    },
})
</script>

<style scoped>

</style>