<template>
    <div class="flex justify-between bg-white border-2 rounded-md w-full mt-2 mb-5 shadow-lg p-3 hover:scale">
        <p class="justify-start self-center">{{ spot.spotName }}</p>

        <div class="icons flex justify-between w-24 self-center p-2">
            <i class="fas fa-edit cursor-pointer text-gray bg-yellow-200 p-2 rounded-md"></i>
            <i class="fas fa-trash cursor-pointer text-white bg-red-500 p-2 rounded-md"></i>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ParkingSpot from '../interfaces/ParkingSpot';

export default defineComponent({
    props:{
        spot: Object as PropType<ParkingSpot>
    },
    setup(props) {
        
    },
})
</script>


