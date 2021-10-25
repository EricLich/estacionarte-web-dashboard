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
                <AdminSpots/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch, inject, onBeforeMount } from 'vue';
import ParkedCar from '@/components/ParkedCar.vue';
import Reserve from '@/components/Reserve.vue';
import AdminSpots from '@/components/AdminSpots.vue'
import Parked from '@/interfaces/Parked';
import { db } from '../utils/firebaseSetup'

export default defineComponent({
    components:{
        ParkedCar: ParkedCar,
        Reserve: Reserve,
        AdminSpots: AdminSpots
    },
    setup(props) {  
        const store:any = inject('store')
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

        let reservations = reactive<any[]>([])
             

        let parkedCount = computed<Number>(() => {
            return parkedCars.value.length;
        })

        let reserveCount = computed<Number>(() => {
            return reservations.length;
        })

        function changeTab(selectedTab: String){
            activeTab.value = selectedTab;
            inputValue.value = '';
        }

        onBeforeMount(async () => {

            await db.collection('Reservations').where('parkingID', '==', store.getters.getUserId()).onSnapshot(snapShot => {
                reservations.splice(0, reservations.length)
                snapShot.docs.map(async (doc, index) => {
                    reservations.push({...doc.data()})
                    reservations[index].id = doc.id;                    
                    let vehicle:any = await db.collection('Vehicles').doc(reservations[index].vehicleID).get().then(snapShot => snapShot.data()).catch(err => console.log(err))
                    reservations[index].vehicle = vehicle;
                    let spot:any = await db.collection('ParkingSpots').doc(reservations[index].parkingSpotID).get().then(snapShot => snapShot.data()).catch(err => console.log(err))                    
                    reservations[index].spot = spot
                })
            })

        })



        
        const parkedCopy = parkedCars.value;
        const reservCopy = reservations;
        
        watch(inputValue, () => {
            if(activeTab.value == tabs.PARKED){
                parkedCars.value = parkedCopy;
                parkedCars.value = parkedCars.value.filter(car => car.licensePlate.includes(inputValue.value))
            }else if(activeTab.value == tabs.RESERVED){                
                reservations = reservCopy;
                reservations = reactive(reservations.filter(reserve => reserve.id.includes(inputValue.value)))
                console.log(reservations)
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
            changeTab,

        }
    },
})
</script>

<style scoped>

    .active-tab{
        /* color: black; */
        color: #015275;
        font-weight: bold;
    }

    .tab:hover{
        cursor: pointer;
    }

</style>

