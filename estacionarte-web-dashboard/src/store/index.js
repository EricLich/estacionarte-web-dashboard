import { reactive } from "@vue/reactivity";

const state = reactive({
  user:{},
  userSignedIn: false
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
  }
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
  }
}


export default{
  state,
  methods,
  getters
}