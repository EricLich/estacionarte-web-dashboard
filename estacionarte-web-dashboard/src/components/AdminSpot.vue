<template>
    <div class="flex justify-between bg-white border-2 rounded-md w-full mb-5 shadow-lg p-3" :class="{'bg-gray-200': !props.spot.available}">
        <p class="justify-start self-center">{{ props.spot.spotName }} <span class="font-bold">{{ !props.spot.available ? ' | Ocupado': 'Libre'}}</span></p>

        <div class="icons flex justify-between w-24 self-center p-2">
            <i class="fas fa-edit cursor-pointer text-gray bg-yellow-200 p-2 rounded-md hover:bg-yellow-300" @click="editSpot()" ></i>
            <i v-if="props.spot.available" class="fas fa-trash cursor-pointer text-white bg-red-500 p-2 rounded-md hover:bg-red-600" @click="deleteSpot()"></i>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, inject } from 'vue'
import ParkingSpot from '../interfaces/ParkingSpot';
import { db } from '../utils/firebaseSetup';

export default defineComponent({
    props:{
        spot: Object as PropType<ParkingSpot>,
        editing: Boolean
    },
    setup(props, { emit }) {

        const store:any = inject('store')

        const deleteSpot = async () => {
            confirm(`Está seguro de que desea eliminar el espacio ${props.spot?.spotName}?`) ? 
                await db.collection('ParkingSpots').doc(props.spot?.id.toString()).delete() 
                : null;
            
        }

        const editSpot = async () => {
            if(!store.getters.getEditing()){
                store.methods.changeEditingStatus()
                emit('editSpot', {...props.spot})
            }else if(store.getters.getEditing()){
                store.methods.changeEditingStatus();
                emit('editSpot', {...props.spot})
            }
        }

        return{
            props,
            deleteSpot,
            editSpot,
        }
    },
})
</script>


