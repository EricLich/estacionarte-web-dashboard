<template>
  <div class="flex flex-col border-2 rounded-md min-w-auto w-full h-80 mt-5 shadow-lg p-6 align-center justify-items-start">
    <div class="flex flex-col align-baseline">
        <h2 class="text-3xl font-bold self-start mb-2">Patente: {{ parked.vehicle.licensePlate }}</h2>
        <h2 class="text-3xl font-bold self-start mb-2">Lugar: {{ parked.spot.spotName }}</h2>
        <h3 class="text-xl font-semibold text-gray-500 text-left mb-2">Hora de llegada: {{ parkedCar.userArrivedDate }}</h3>
        <p class="text-xl text-gray-400 self-start mb-1">Modelo: {{ parked.vehicle.model }}</p>  
        <span class="text-xl text-gray-400 self-start mb-1">Marca: {{ parked.vehicle.brand }}</span>
    </div>

    <div class="flex justify-between self-center">
    <button class=" text-md w-28 mt-4 bg-red-500 hover:bg-red-700 duration-75 text-white font-bold p-2 border border-none rounded shadow-md mr-1" @click="end">
        Finalizar
    </button>  
    <button class=" text-md w-28 mt-4 bg-yellow-400 hover:bg-yellow-500 duration-75 text-white font-bold p-2 border border-none rounded shadow-md ml-1" @click="cancel">
        Cancelar
    </button>  
    </div>
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
          emit('end', props.parkedCar)
        }

        const cancel = () => {
          emit('cancel', props.parkedCar)
        }

        return{
          parked,
          end,
          cancel
        }
    },
})
</script>

<style scoped>

</style>