<template>
    <div class="flex justify-between bg-white border-2 rounded-md w-full mb-5 shadow-lg p-3" :class="{'bg-gray-200': !props.spot.available}">
        <p class="justify-start self-center">{{ props.spot.spotName }} {{ !props.spot.available ? ' | Deshabilitado': ''}}</p>

        <div class="icons flex justify-between w-24 self-center p-2">
            <i class="fas fa-edit cursor-pointer text-gray bg-yellow-200 p-2 rounded-md hover:bg-yellow-300" @click="editSpot()" ></i>
            <i class="fas fa-trash cursor-pointer text-white bg-red-500 p-2 rounded-md hover:bg-red-600" @click="deleteSpot()"></i>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ParkingSpot from '../interfaces/ParkingSpot';
import { db } from '../utils/firebaseSetup';

export default defineComponent({
    props:{
        spot: Object as PropType<ParkingSpot>
    },
    setup(props, { emit }) {

        const deleteSpot = async () => {
            await db.collection('ParkingSpots').doc(props.spot?.id.toString()).delete()
        }

        const editSpot = async () => {
            emit('editSpot', props.spot)
        }

        return{
            props,
            deleteSpot,
            editSpot,
        }
    },
})
</script>


