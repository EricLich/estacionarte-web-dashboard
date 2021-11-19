import { reactive } from "@vue/reactivity";

const state = reactive({
  user:{},
  userSignedIn: false,
  editing: false,
  loading: false
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
  changeLoadingStatus(){
    state.loading = !state.loading
  }
}

const getters = {
  getUser(){
    return state.user;
  },
  getUserId(){
    return state.user.uid;
  },
  getUserCuit(){
    return state.user.cuit;
  },
  getUserAddress(){
    return state.user.address;
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
  getLoadingStatus(){
    return state.loading
  }
}


export default{
  state,
  methods,
  getters
}