<template>
    <div class="flex justify-items-start bg-white border-2 rounded-md w-full h-full mt-5 shadow-lg p-10">
        <h3 class="text-2xl jus">Agregar espacio de estacionamiento</h3>
    </div>
    <div class="flex flex-col self-start bg-white border-2 rounded-md w-full h-full mt-5 shadow-lg pb-5">
        <h3 class="text-2xl w-full mt-5 mb-5">Listado de espacios de estacionamiento</h3>
        <div class="container">
            <AdminSpot v-for="spot in spots" :key="spot.id" :spot="spot"/>
        </div>
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