<template>
    <div class="flex flex-col container ">
        <div class="flex flex-row mt-10 dash-links">
            <div @click="changeTab(tabs.PARKED)" :class="{'active-tab' : (activeTab == tabs.PARKED)}" class="tab text-3xl mr-10 text-gray-300">Espacios Ocupados ({{ parkedCount }})</div>
            <div @click="changeTab(tabs.RESERVED)" v-if="reservations.length > 0" :class="{'active-tab' : (activeTab == tabs.RESERVED)}" class="tab text-3xl mr-10 text-gray-300">Reservas Pendientes ({{ reserveCount }})</div>
            <div @click="changeTab(tabs.ADMIN)" :class="{'active-tab' : (activeTab == tabs.ADMIN)}" class="tab text-3xl mr-10 text-gray-300">Administrar Espacios</div>
        </div>
        <div class="h-auto py-4 px-8 text-lg bg-white shadow-lg rounded-lg mt-5 flex flex-col pb-10">
            <input v-if="activeTab != tabs.ADMIN" type="text" v-model="inputValue" placeholder="Buscar patente" class="mt-5 align-self-start w-1/3 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-md border-0 shadow outline-none focus:outline-none focus:ring pr-10"/>
            
            <div v-if="activeTab == tabs.PARKED" class="parked-spots h-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-5 mt-5">
                <ParkedCar v-for="parkedCar in parkedCars" :key="parkedCar.id" :parkedCar="parkedCar" @end="carLeaving" @cancel="cancelReservation"/>                    
                <div v-if="parkedCount == 0" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong class="font-bold">Ups!</strong><br>
                    <span class="block sm:inline">No hay patentes que coincidan</span>
                </div>            
            </div>

            <div v-if="activeTab == tabs.RESERVED" class="parked-spots h-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-5 mt-5">
                <Reserve v-for="reservation in reservations" :key="reservation.id" :reservation="reservation" @proceedReservation="moveSpotToFilled" @cancel="cancelReservation"/>
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

        let parkedCars = reactive<any[]>([]);

        let reservations = reactive<any[]>([])
             

        let parkedCount = computed<Number>(() => {
            return parkedCars.length;
        })

        let reserveCount = ref()

        watch(reservations, () => {
            reserveCount.value = reservations.length
        })

        function changeTab(selectedTab: String){
            activeTab.value = selectedTab;
            inputValue.value = '';
        }

        onBeforeMount(async () => {
            await db.collection('Reservations').where('parkingID', '==', store.getters.getUserId()).onSnapshot(snapShot => {
                parkedCars.splice(0, parkedCars.length)
                reservations.splice(0, reservations.length)
                let indexRes = ref(0);
                let indexParked = ref(0);
                snapShot.docs.map(async (doc) => {
                    let vehicle:any = await db.collection('Vehicles').doc(doc.data().vehicleID).get().then(snapShot => snapShot.data()).catch(err => console.log(err))
                    let spot:any = await db.collection('ParkingSpots').doc(doc.data().parkingSpotID).get().then(snapShot => snapShot.data()).catch(err => console.log(err))                 
                    if(doc.data().active && doc.data().userArrivedDate == null && doc.data().cancelationDate == null){
                        indexRes.value == 0 ? reservations.splice(0, reservations.length) : false
                        reservations.push({...doc.data()})                        
                        reservations[indexRes.value].id = doc.id;                    
                        reservations[indexRes.value].vehicle = vehicle;
                        reservations[indexRes.value].spot = spot;
                        indexRes.value++;                 
                    }else if(doc.data().userArrivedDate != null && doc.data().userLeftDate == null && doc.data().active){
                        indexParked.value == 0 ? parkedCars.splice(0, parkedCars.length) : false
                        parkedCars.push({...doc.data()})
                        parkedCars[indexParked.value].id = doc.id;                    
                        parkedCars[indexParked.value].vehicle = vehicle;
                        parkedCars[indexParked.value].spot = spot                  
                        indexParked.value++;
                    }
                })
                indexRes.value = 0;
                indexParked.value = 0;
            })            
        })           

        const moveSpotToFilled = (resToMove: any) => {            
            reservations.splice(reservations.findIndex(res => res.id == resToMove.id), 1)
            let a = new Date();
            let date = a.getDate() + '-' + (a.getMonth() + 1) + '-' + a.getFullYear() + ' ' + a.getHours() + ':' + a.getMinutes();
            resToMove.userArrivedDate = date;
            db.collection('Reservations').doc(resToMove.id).update({userArrivedDate: date, active:true});
            if(reservations.length == 0){
                activeTab.value = tabs.PARKED;
            }else if(reservations.length == 0 && parkedCars.length == 0){
                activeTab.value = tabs.ADMIN;
            }
        }

        
        const parkedCopy = parkedCars;
        const reservCopy = reservations;
        
        watch(inputValue, () => {
            if(activeTab.value == tabs.PARKED){
                parkedCars = parkedCopy;
                parkedCars = parkedCars.filter(car => car.vehicle.licensePlate.includes(inputValue.value))
                console.log(parkedCars)
            }else if(activeTab.value == tabs.RESERVED){                
                reservations = reservCopy;
                reservations = reactive(reservations.filter(reserve => reserve.id.includes(inputValue.value)))
                console.log(reservations)
            }
        })

        const carLeaving = async (parked:any) => {            
            let a = new Date()
            let date = a.getDate() + '-' + (a.getMonth() + 1) + '-' + a.getFullYear() + ' ' + a.getHours() + ':' + a.getMinutes()    
            db.collection('Reservations').doc(parked.id).update({active: false, userLeftDate: date})
                                        .then(res => {
                                            db.collection('ParkingSpots').doc(parked.parkingSpotID.toString()).update({available: true})
                                                                         .then(res => {
                                                                            parkedCars.splice(parkedCars.findIndex(reserve => reserve.id == parked.id), 1)
                                                                         }) 
                                                                         .catch(err => console.log('error en update de spot'))
                                        })
                                        .catch(err => console.log('error en update de reservations')) 
        }

        const cancelReservation = (reserve: any) => {
            let a = new Date();
            let date = a.getDate() + '-' + (a.getMonth() + 1) + '-' + a.getFullYear() + ' ' + a.getHours() + ':' + a.getMinutes();
            db.collection('Reservations').doc(reserve.id).update({active: false, cancelationDate: date})
                                                            .then(async res => {
                                                                await db.collection('ParkingSpots').doc(reserve.parkingSpotID).update({available: true})
                                                            })
                                                            .catch(err => console.log(err.message))
        }

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
            moveSpotToFilled,
            carLeaving,
            cancelReservation

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

