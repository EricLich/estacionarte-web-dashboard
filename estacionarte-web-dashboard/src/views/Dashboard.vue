<template>
    <div class="flex flex-col container h-full">
        <div class="flex flex-row mt-10 dash-links">
            <div @click="changeTab(tabs.PARKED)" :class="{'active-tab' : (activeTab == tabs.PARKED)}" class="tab text-3xl mr-10 text-gray-300">Espacios ocupados ({{ parkedCount }})</div>
            <div @click="changeTab(tabs.RESERVED)" :class="{'active-tab' : (activeTab == tabs.RESERVED)}" class="tab text-3xl mr-10 text-gray-300">Reservas pendientes ({{ reserveCount }})</div>
            <div @click="changeTab(tabs.ADMIN)" :class="{'active-tab' : (activeTab == tabs.ADMIN)}" class="tab text-3xl mr-10 text-gray-300">Administrar espacios</div>
        </div>
        <div class="h-98 py-4 px-8 text-lg bg-white shadow-lg rounded-lg mt-2 flex flex-col pb-10">
            <input v-if="activeTab != tabs.ADMIN" type="text" v-model="inputValue" placeholder="Buscar patente" class="mt-5 align-self-start w-1/3 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-md border-0 shadow outline-none focus:outline-none focus:ring pr-10"/>
            
            <div v-if="activeTab == tabs.PARKED" class="parked-spots h-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-5 mt-5">
                <ParkedCar v-for="parkedCar in parkedCars" :key="parkedCar.id" :parkedCar="parkedCar" @end="carLeaving" @cancel="cancelReservation"/>                    
                <div v-if="parkedCount == 0" class="bg-red-100 h-20 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full" role="alert">
                    <strong class="font-bold">Ups!</strong><br>
                    <span class="block sm:inline">No hay patentes que coincidan</span>
                </div>            
            </div>

            <div v-if="activeTab == tabs.RESERVED" class="parked-spots h-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-5 mt-5">
                <Reserve v-for="reservation in reservations" :key="reservation.id" :reservation="reservation" @proceedReservation="moveSpotToFilled" @cancel="cancelReservation"/>
                <div v-if="reserveCount == 0" class="bg-red-100 h-20 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full" role="alert">
                    <strong class="font-bold">Ups!</strong><br>
                    <span class="block sm:inline">No hay patentes que coincidan</span>
                </div>             
            </div>

            <div v-if="activeTab == tabs.ADMIN" class="parked-spots h-screen grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-5 mt-2">
                <AdminSpots/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, inject, onBeforeMount } from 'vue';
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

        let activeTab = ref<String>(tabs.ADMIN);

        let parkedCars = ref<any[]>([]);

        let reservations = ref<any[]>([])
             
        let parkedCount = ref(parkedCars.value.length);

        let reserveCount = ref(reservations.value.length);



        function changeTab(selectedTab: String){
            inputValue.value = '';
            activeTab.value = selectedTab;     
            parkedCount.value = parkedCopy.length;
            reserveCount.value = reserveCopy.length;       
        }
        
        onBeforeMount(async () => {
            await db.collection('Reservations').where('parkingID', '==', store.getters.getUserId()).onSnapshot(snapShot => {
                parkedCars.value.splice(0, parkedCars.value.length)
                //reservations.value.splice(0, reservations.value.length)
                let indexRes = ref(0);
                let indexParked = ref(0);
                snapShot.docs.filter(async doc => {
                    let spot:any = await db.collection('ParkingSpots').doc(doc.data().parkingSpotID).get().then(snapShot => snapShot.data()).catch(err => console.log(err))                 
                    let vehicle:any = await db.collection('Vehicles').doc(doc.data().vehicleID).get().then(snapShot => snapShot.data()).catch(err => console.log(err))
                    if(doc.data().active && doc.data().userArrivedDate == null && doc.data().cancelationDate == null){
                        indexRes.value == 0 ? reservations.value.splice(0, reservations.value.length) : false
                        reservations.value.push({...doc.data()})                        
                        reservations.value[indexRes.value].id = doc.id;                    
                        reservations.value[indexRes.value].vehicle = vehicle;
                        reservations.value[indexRes.value].spot = spot;
                        indexRes.value++;                 
                    }else if(doc.data().userArrivedDate != null && doc.data().userLeftDate == null && doc.data().active /* && doc.data().cancelationDate != null */){
                        indexParked.value == 0 ? parkedCars.value.splice(0, parkedCars.value.length) : false
                        parkedCars.value.push({...doc.data()})
                        parkedCars.value[indexParked.value].id = doc.id;                    
                        parkedCars.value[indexParked.value].vehicle = vehicle;
                        parkedCars.value[indexParked.value].spot = spot                  
                        indexParked.value++;
                    }
                    parkedCount.value = parkedCars.value.length;
                    reserveCount.value = reservations.value.length;
                })
                indexRes.value = 0;
                indexParked.value = 0;
            })
        })


        const moveSpotToFilled = (resToMove: any) => {            
            reservations.value.splice(reservations.value.findIndex(res => res.id === resToMove.id), 1)
            let a = new Date();
            let date = a.getDate() + '-' + (a.getMonth() + 1) + '-' + a.getFullYear() + ' ' + a.getHours() + ':' + a.getMinutes();
            resToMove.userArrivedDate = date;
            db.collection('Reservations').doc(resToMove.id).update({userArrivedDate: date, active:true});
            if(reservations.value.length == 0){
                activeTab.value = tabs.PARKED;
            }else if(reservations.value.length == 0 && parkedCars.value.length == 0){
                activeTab.value = tabs.ADMIN;
            }
        }       
        
        const parkedCopy = parkedCars.value
        const reserveCopy = reservations.value
        watch(inputValue, () => {       
            parkedCars.value = parkedCopy;
            reservations.value = reserveCopy;                
            if(activeTab.value == tabs.PARKED){
                parkedCars.value = parkedCars.value.filter(car => car.vehicle.licensePlate.toLowerCase().includes(inputValue.value)) 
                parkedCount.value = parkedCars.value.length
            }else if(activeTab.value == tabs.RESERVED){                
                reservations.value = reservations.value.filter(reserve => reserve.vehicle.licensePlate.toLowerCase().includes(inputValue.value))
                reserveCount.value = reservations.value.length
            }
        })

        const carLeaving = async (parked:any) => {            
            let a = new Date()
            let date = a.getDate() + '-' + (a.getMonth() + 1) + '-' + a.getFullYear() + ' ' + a.getHours() + ':' + a.getMinutes()    
            db.collection('Reservations').doc(parked.id).update({active: false, userLeftDate: date})
                                        .then(res => {
                                            db.collection('ParkingSpots').doc(parked.parkingSpotID.toString()).update({available: true})
                                                                         .then(res => {                                                                             
                                                                            parkedCars.value.splice(parkedCars.value.findIndex(reserve => reserve.id === parked.id), 1)                                                                            
                                                                         }) 
                                                                         .catch(err => console.log('error en update de spot'))
                                        })
                                        .catch(err => console.log('error en update de reservations')) 
        }

        const cancelReservation = (reserve:any) => {
            let a = new Date();
            let date = a.getDate() + '-' + (a.getMonth() + 1) + '-' + a.getFullYear() + ' ' + a.getHours() + ':' + a.getMinutes();
            db.collection('Reservations').doc(reserve.id).update({active: false, cancelationDate: date})
                                                            .then(res => {      
                                                                if(reserve.type == 'reserve'){                                                                    
                                                                    reservations.value.splice(reservations.value.findIndex(r => r.id === reserve.id), 1)
                                                                    reservations.value.length == 0 ? reserveCount.value = 0 : false
                                                                }else if(reserve.type == 'parked'){                                                                    
                                                                    parkedCars.value.splice(parkedCars.value.findIndex(parked => parked.id === reserve.id), 1)
                                                                    parkedCars.value.length == 0 ? parkedCount.value = 0 : false
                                                                }
                                                                db.collection('ParkingSpots').doc(reserve.parkingSpotID).update({available: true})                                                               

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
            cancelReservation,                    
        }
    },
})
</script>

<style scoped>

    .active-tab{
          color : #9d74d7;

        font-weight: bold;
    }

    .tab:hover{
        cursor: pointer;
    }

</style>

