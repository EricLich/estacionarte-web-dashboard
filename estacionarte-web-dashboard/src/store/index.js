import { reactive } from "@vue/reactivity";

const state = reactive({
  user:{},
  userSignedIn: false,
  editing: false,
});

const methods = {
  setUser(newUser){
    state.user = newUser;
    state.userSignedIn = true;
  },
  resetUser(){
    state.user = {};
    state.userSignedIn = false;
  },
  setUserSignedIn(){
    state.userSignedIn = true;
  },
  changeEditingStatus(){
    state.editing = !state.editing;
  },
}

const getters = {
  getUser(){
    return state.user;
  },
  getUserId(){
    return state.user.uid;
  },
  getUserSignedIn(){
    return state.userSignedIn;
  },
  getParkingName(){
    return state.user.parkingName;
  },
  getEditing(){
    return state.editing
  },
}


export default{
  state,
  methods,
  getters
}