<template>
    <div class="container-inner flex flex-col">
        <h2 class="text-4xl mb-10 mt-10 text-left">Registrate</h2>
        <div class="flex justify-center align-center">
            <form class="w-full max-w-lg border-2 p-10 rounded-lg shadow-md">
            
            <div class="flex flex-wrap -mx-3 mb-3">
                <div class="w-full px-3">
                    <label class="text-left block tracking-wide text-gray-700 text-lg font-bold" for="grid-cuit">
                        Nombre de establecimiento
                    </label>
                    <input required v-model="newUser.parkingName" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-nombre" type="text" placeholder="Nombre establecimiento">                    
                    <div v-if="!validation.parkingName" class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2 rounded " role="alert">
                        <p class="text-left pl-2 text-red-800">El nombre no debe estar vacio.</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-3">
                <div class="w-full px-3">
                    <label class="text-left block tracking-wide text-gray-700 text-lg font-bold" for="grid-cuit">
                        Cuit
                    </label>
                    <input required v-model="newUser.cuit" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-cuit" type="text" placeholder="CUIT">                    
                    <div v-if="!validation.cuit" class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2 rounded" role="alert">
                        <p class="text-left pl-2 text-red-800">El cuit debe tener 11 caracteres.</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-3">
                <div class="w-full px-3">
                    <label class="text-left block tracking-wide text-gray-700 text-lg font-bold" for="grid-email">
                        Email
                    </label>
                    <input required v-model="newUser.email" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="Email">                
                    <div v-if="!validation.email" class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2 rounded" role="alert">
                        <p class="text-left pl-2 text-red-800">No escribió el formato de email correctamente.</p>
                    </div>
                    <div v-if="validation.emailExists" class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2 rounded" role="alert">
                        <p class="text-left pl-2 text-red-800">Ya existe una cuenta con esa dirección de email.</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-3">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="text-left block tracking-wide text-gray-700 text-lg font-bold" for="grid-adress">
                        Dirección
                    </label>
                    <input required v-model="newUser.address" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-addres" type="text" placeholder="Dirección">
                    <div v-if="!validation.address"  class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2 rounded" role="alert">
                        <p class="text-left pl-2 text-red-800">El campo de dirección no puede quedar vacío.</p>
                    </div>
                    <div v-if="validation.addressExists" class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2 rounded " role="alert">
                        <p class="text-left pl-2 text-red-800">La dirección ya está asignada a otro establecimiento.</p>
                    </div>
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="text-left block tracking-wide text-gray-700 text-lg font-bold" for="grid-adress">
                        Altura
                    </label>
                    <input required v-model="newUser.number" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-addres-number" type="text" placeholder="Altura">
                    <div v-if="!validation.address"  class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2 rounded" role="alert">
                        <p class="text-left pl-2 text-red-800">El campo de número no puede quedar vacío.</p>
                    </div>
                    <div v-if="validation.addressExists" class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2 rounded " role="alert">
                        <p class="text-left pl-2 text-red-800">La dirección ya está asignada a otro establecimiento.</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-3">
                <div class="w-full px-3">
                    <label class="text-left block tracking-wide text-gray-700 text-lg font-bold" for="grid-password">
                        Teléfono
                    </label>
                    <input required v-model="newUser.phoneNumber" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-number" type="text" placeholder="Teléfono">                    
                    <div v-if="!validation.phoneNumberFilled"  class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2 rounded" role="alert">
                        <p class="text-left pl-2 text-red-800">Debe llenar este campo.</p>
                    </div>
                    <div v-if="validation.phoneNumberExists"  class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2 rounded" role="alert">
                        <p class="text-left pl-2 text-red-800">Ya existe un usuario con este teléfono.</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-3">
                <div class="w-full px-3">
                    <label class="text-left block tracking-wide text-gray-700 text-lg font-bold" for="grid-password">
                        Contraseña
                    </label>
                    <input required v-model="newUser.password" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="Contraseña (mínimo 6 caracteres)">                    
                    <div v-if="!validation.password"  class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2 rounded" role="alert">
                        <p class="text-left pl-2 text-red-800">Su contraseña debe tener al menos 6 caracteres.</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-3">
                <div class="w-full px-3">
                    <label class="text-left block tracking-wide text-gray-700 text-lg font-bold" for="grid-re-password">
                        Repetir contraseña
                    </label>
                    <input required v-model="newUser.passRepeat" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-re-password" type="password" placeholder="Contraseña">                
                    <div v-if="!validation.passRepeat" class="bg-red-100 border-l-4 border-red-500 text-orange-700 p-2 rounded" role="alert">
                        <p class="text-left pl-2 text-red-800">No coinciden los campos de contraseña.</p>
                    </div>
                </div>
            </div>

            <div class="flex flex-wrap">
                <button @click.prevent="signupAuth" @keydown.enter="signupAuth" :disabled="store.getters.getLoadingStatus()" :class="store.getters.getLoadingStatus() && 'bg-green-500'" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded">
                    {{ !store.getters.getLoadingStatus() ? 'Registrarse' : 'Cargando...'}}
                </button>
            </div>
            
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, inject } from 'vue'
import firebase from 'firebase/compat/app'
import { db } from '../utils/firebaseSetup'
import ParkingUser from '../interfaces/ParkingUser'
import { useRouter } from 'vue-router'
import axios from 'axios';

export default defineComponent({
    setup() {
        const store: any = inject('store');

        const router = useRouter()

        let newUser = reactive({ 
            parkingName: '' as String,
            cuit: '' as String, 
            email: '' as String, 
            address: '' as String, 
            number: '' as String,
            password: '' as String, 
            passRepeat: '' as String ,
            phoneNumber: '' as String,
        })
        
        let validation = reactive({
            parkingName: true as boolean,
            addressExists: false as boolean,
            numberFilled: true as Boolean,
            phoneNumberFilled: true as Boolean,
            phoneNumberExists: false as Boolean,
            cuit: true as boolean,
            email: true as boolean,
            emailExists: false as boolean,
            address: true as boolean,
            password: true as boolean,
            passRepeat: true as boolean,
        })
    

        const signupAuth = async () => {
            store.methods.changeLoadingStatus() // cambia el status de loading a true para mostrar que se esta cargando
            validation.email = true;
            validation.emailExists = false;
            validation.addressExists = false;
            let addressExists: boolean = await checkAdressExists(newUser.address.toString() + ' ' + newUser.number.toString()); // checkea si la direccion ya existe en la bdd            
            let phoneExists: boolean = await checkPhoneExists(newUser.phoneNumber.toString());
            if(validate() && addressExists == false){   //si los campos ingresados son validos y la direccion no existe, procede    
                if(phoneExists == false){
                    const [latApi, longApi] = await checkLatLong();
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(newUser.email.toString(), newUser.password.toString()) //crea el usuario en auth
                        .then(user => {
                            const parkingUser: ParkingUser = { //le da valor a un nuevo usuario 
                                parkingName: newUser.parkingName.toString(),
                                cuit: newUser.cuit.toString(),
                                address: newUser.address.toString() + ' ' + newUser.number.toString(),
                                phoneNumber: newUser.phoneNumber.toString(),
                                location: {
                                    lat: latApi,
                                    long: longApi
                                },
                            }  
                            user.user?.uid ? registerParkingUser(parkingUser, user.user.uid) : store.methods.changeLoadingStatus(); //modifica el nuevo usuario en firestore en la coleccion "ParkingUsers" para que corresponda al agregado en auth                                            
                        })
                        .catch(err => {
                            let emailAlreadyExists = 'The email address is already in use by another account.'; 
                            
                            if(err.message.toString().includes(emailAlreadyExists)){ //si el error contiene un string con la variable emailAlreadyExists, entonces se mostrara en el form que el mail ya existe en la bdd
                                validation.emailExists = true;
                            }else{
                                validation.emailExists = false;
                            }
                            store.methods.changeLoadingStatus()
                        })
                }else{
                    phoneExists ? validation.phoneNumberExists = true : validation.phoneNumberExists = false;
                    store.methods.changeLoadingStatus()   
                }            
            }else{      
                addressExists ? validation.addressExists = true : validation.addressExists = false;
                store.methods.changeLoadingStatus()          
            }          
        }

        const registerParkingUser = (newUser: ParkingUser, uid: String) => {        
            db.collection('ParkingUsers').doc(uid.toString()).set({uid, ...newUser}) 
                                                             .then(user => {                                                                 
                                                                    localStorage.setItem('logedUser', JSON.stringify({uid, ...newUser}))                                                                    
                                                                    store.methods.setUser(JSON.parse(localStorage.getItem('logedUser')!)); //el ! significa que no va a devolver nunca "null" entonces ts no molesta mas
                                                                    store.methods.changeLoadingStatus();
                                                                    router.push('/dashboard');
                                                             })
                                                             .catch(err => console.log(err))            
        }

        const validate = ():boolean => {
            let nameCheck = checkParkingName();
            let emailCheck = checkEmail();
            let cuitCheck = checkCuit();
            let addressCheck = checkAdress();
            let passCheck = checkPass();
            let passRepeatCheck = checkRepeatPass()
            let numCheck = checkNumber()
            let phoneCheck = checkPhone()

            return nameCheck && emailCheck && phoneCheck && cuitCheck && addressCheck && numCheck && passCheck && passRepeatCheck ? true : false;
        }

        const checkPhone = ():boolean =>{
            if(newUser.phoneNumber != ''){
                validation.phoneNumberFilled = true;
                return true;
            }else{
                validation.phoneNumberFilled = false;
                return false;
            }
        }

        const checkParkingName = ():boolean => {
            if(newUser.parkingName != ''){
                validation.parkingName = true;
                return true;
            }else{
                validation.parkingName = false;
                return false;
            }
        }

        const checkEmail = ():boolean => {
            validation.email = true;
            let pattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"; //VERIFICACION DE EMAIL CON REGEX
            if(newUser.email == '' || !newUser.email.match(pattern)){           
                validation.email = false;
                return false;
            }
            return true;
        }

        const checkCuit = ():boolean => { //CHECKEAR CUIT
            if(newUser.cuit.length == 11){
                validation.cuit = true;
                return true;
            }else{
                validation.cuit = false;
                return false;
            }
        }

        const checkAdress = ():boolean =>{
            if(newUser.address != ''){
                validation.address = true;
                return true;
            }else{
                validation.address = false;
                return false;
            }
        }

        const checkNumber = () => {
            if(newUser.number != ''){
                validation.numberFilled = true;
                return true;
            }else{
                validation.address = false;
                return false;
            }
        }

        const checkPass = ():boolean => {
            if(newUser.password.length >= 6){
                validation.password = true;
                return true;
            }else{
                validation.password = false;
                return false;
            }
        }

        const checkRepeatPass = ():boolean => {
            if(newUser.passRepeat.length >= 6 && newUser.passRepeat == newUser.password){
                validation.passRepeat = true;
                return true;
            }else{
                validation.passRepeat = false;
                return false;
            }
        }

        const checkAdressExists = async (address: String) => {            //metodo que devuelve true en caso de que exista la direccion en algun documento y false en el caso contrario
            const snapshot = await db.collection('ParkingUsers').get()
            let doc = await snapshot.docs.find(user => user.data().address == address)
            if(doc == undefined){
                return false;
            }else{
                return true;
            }            
        }
        const checkPhoneExists = async (phoneNumber: String) => {            //metodo que devuelve true en caso de que exista el numero de telefono en algun documento y false en el caso contrario
            const snapshot = await db.collection('ParkingUsers').get()
            let doc = await snapshot.docs.find(user => user.data().phoneNumber == phoneNumber)
            console.log(doc)
            if(doc == undefined){
                return false;
            }else{
                return true;
            }            
        }

        const checkLatLong = async () => {
            let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${newUser.number}+${newUser.address}+buenos+aires&key=AIzaSyB1JGcj9GhNgv1_mX0zNEa8S7FxwC8adCM`
            const locationData:any = await axios.get(url)
            let lat = locationData.data.results[0].geometry.location.lat
            let long = locationData.data.results[0].geometry.location.lng
            return [lat, long]
        }

        
        return{
            store,
            newUser,
            validation,
            signupAuth,
            validate,
        }
        
    },
})
</script>

<style scoped>

</style>