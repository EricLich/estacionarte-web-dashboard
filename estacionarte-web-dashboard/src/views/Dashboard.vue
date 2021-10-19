<template>
    <div class="flex flex-col container ">
        <div class="flex flex-row mt-10 dash-links">
            <div @click="changeTab(tabs.PARKED)" :class="{'active-tab' : (activeTab == tabs.PARKED)}" class="tab text-3xl mr-10 text-gray-300">Espacios Ocupados ({{ parkedCount }})</div>
            <div @click="changeTab(tabs.RESERVED)" :class="{'active-tab' : (activeTab == tabs.RESERVED)}" class="tab text-3xl mr-10 text-gray-300">Reservas Pendientes ({{ reserveCount }})</div>
            <div @click="changeTab(tabs.ADMIN)" :class="{'active-tab' : (activeTab == tabs.ADMIN)}" class="tab text-3xl mr-10 text-gray-300">Administrar Espacios</div>
        </div>
        <div class="h-auto py-4 px-8 text-lg bg-white shadow-lg rounded-lg mt-5 flex flex-col pb-10">
            <input v-if="activeTab != tabs.ADMIN" type="text" v-model="inputValue" placeholder="Buscar patente" class="mt-5 align-self-start w-1/3 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-md border-0 shadow outline-none focus:outline-none focus:ring pr-10"/>
            
            <div v-if="activeTab == tabs.PARKED" class="parked-spots h-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-5 mt-5">
                <ParkedCar v-for="parkedCar in parkedCars" :key="parkedCar.id" :parkedCar="parkedCar"/>   
                <div v-if="parkedCount == 0" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong class="font-bold">Ups!</strong><br>
                    <span class="block sm:inline">No hay patentes que coincidan</span>
                </div>            
            </div>

            <div v-if="activeTab == tabs.RESERVED" class="parked-spots h-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-5 mt-5">
                <Reserve v-for="reservation in reservations" :key="reservation.id" :reservation="reservation"/>
                <div v-if="reserveCount == 0" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong class="font-bold">Ups!</strong><br>
                    <span class="block sm:inline">No hay patentes que coincidan</span>
                </div>             
            </div>

            <div v-if="activeTab == tabs.ADMIN" class="parked-spots h-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-5 mt-2">
                <AdminSpots :spots="spots"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch, inject } from 'vue';
import ParkedCar from '@/components/ParkedCar.vue';
import Reserve from '@/components/Reserve.vue';
import AdminSpots from '@/components/AdminSpots.vue'
import Parked from '@/interfaces/Parked';
import Reservation from '@/interfaces/Reservation';
import ParkingSpot from '@/interfaces/ParkingSpot';
import { useRoute } from 'vue-router';

export default defineComponent({
    components:{
        ParkedCar: ParkedCar,
        Reserve: Reserve,
        AdminSpots: AdminSpots
    },
    setup(props) {  
        const store = inject('store')
        let inputValue = ref('')

        let tabs = {
            PARKED: 'tab-parked' as String,
            RESERVED: 'tab-reserved' as String,
            ADMIN: 'tab-admin' as String,
        }

        let activeTab = ref<String>(tabs.PARKED);

        let parkedCars = ref<Parked[]>([
            {
                id: 1,
                licensePlate: "a",
                timePassed: 123,
                model:"tuVieja",
                brand: "tuVieja",
            },
            {
                id: 2,
                licensePlate: "a2",
                timePassed: 123,
                model: "tuVieja",
                brand: "tuVieja",
            },
            {   
                id: 3,
                licensePlate: "a3",
                timePassed: 123,
                model: "tuVieja3",
                brand: "tuVieja3",
            },
            {   
                id: 4,
                licensePlate: "a4",
                timePassed: 123,
                model: "tuVieja4",
                brand: "tuVieja4",
            },
            {   
                id: 5,
                licensePlate: "a5",
                timePassed: 123,
                model: "tuVieja5",
                brand: "tuVieja5",
            },
            {   
                id: 6,
                licensePlate: "a6",
                timePassed: 123,
                model: "tuVieja6",
                brand: "tuVieja6",
            },
        ])

        let reservations = ref<Reservation[]>([
            {
                id: 1,
                parkingId: "lala",
                parkingSpotId: "lala",
                idUser: "user1",
                idVehicle: "v1",
                reservationDate: "un dia",
                userArrivedDate: "un dia",
                userLeftDate: "otro dia",
                cancelationDate: "un dia"
            },
            {
                id: 2,
                parkingId: "lala2",
                parkingSpotId: "lala2",
                idUser: "user2",
                idVehicle: "v2",
                reservationDate: "un dia",
                userArrivedDate: "un dia",
                userLeftDate: "otro dia",
                cancelationDate: "un dia"
            },
            {
                id: 3,
                parkingId: "lala3",
                parkingSpotId: "lala3",
                idUser: "user3",
                idVehicle: "v3",
                reservationDate: "un dia",
                userArrivedDate: "un dia",
                userLeftDate: "otro dia",
                cancelationDate: "un dia"
            },
            {
                id: 4,
                parkingId: "lala4",
                parkingSpotId: "lala4",
                idUser: "user4",
                idVehicle: "v4",
                reservationDate: "un dia",
                userArrivedDate: "un dia",
                userLeftDate: "otro dia",
                cancelationDate: "un dia"
            },
            {
                id: 5,
                parkingId: "lala5",
                parkingSpotId: "lala5",
                idUser: "user5",
                idVehicle: "v5",
                reservationDate: "un dia",
                userArrivedDate: "un dia",
                userLeftDate: "otro dia",
                cancelationDate: "un dia"
            },
            {
                id: 6,
                parkingId: "lala6",
                parkingSpotId: "lala6",
                idUser: "user6",
                idVehicle: "v6",
                reservationDate: "un dia",
                userArrivedDate: "un dia",
                userLeftDate: "otro dia",
                cancelationDate: "un dia"
            },
        ])

        let spots = ref<ParkingSpot[]>([
            {
               id: 1,
               spotName: "Spot 1",
               type: 1,
               idUser: 1,
               idVehicle: 1,
               available: true 
            },
            {
               id: 2,
               spotName: "Spot 2",
               type: 1,
               idUser: 2,
               idVehicle: 3,
               available: true 
            },
            {
               id: 3,
               spotName: "Spot 3",
               type: 2,
               idUser: 3,
               idVehicle: 6,
               available: true 
            },
            {
               id: 4,
               spotName: "Spot 4",
               type: 1,
               idUser: 1,
               idVehicle: 1,
               available: true 
            },
            {
               id: 5,
               spotName: "Spot 5",
               type: 1,
               idUser: 1,
               idVehicle: 1,
               available: true 
            },
            {
               id: 6,
               spotName: "Spot 6",
               type: 1,
               idUser: 1,
               idVehicle: 1,
               available: true 
            },
        ])

        let parkedCount = computed<Number>(() => {
            return parkedCars.value.length;
        })

        let reserveCount = computed<Number>(() => {
            return reservations.value.length;
        })

        function changeTab(selectedTab: String){
            activeTab.value = selectedTab;
            inputValue.value = '';
        }

        /* copias de arrays para volverles a dar el valor inicial en el caso de dejar los input vacios */
        const parkedCopy = parkedCars.value;
        const reservCopy = reservations.value;
        
        watch(inputValue, () => {
            if(activeTab.value == tabs.PARKED){
                parkedCars.value = parkedCopy;
                parkedCars.value = parkedCars.value.filter(car => car.licensePlate.includes(inputValue.value))
            }else if(activeTab.value == tabs.RESERVED){
                reservations.value = reservCopy;
                reservations.value = reactive(reservations.value.filter(reserve => reserve.parkingId.includes(inputValue.value)))
            }
        })

        return{
            store,
            tabs,
            activeTab,
            inputValue,
            parkedCars,
            reservations,
            parkedCount,
            reserveCount,
            spots,
            changeTab,

        }
    },
})
</script>

<style scoped>

    .active-tab{
        color: black;
        font-weight: bold;
    }

    .tab:hover{
        cursor: pointer;
    }

</style>

