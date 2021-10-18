import fbApp from "./firebaseSetup"

const fbUserMethods: Object = {
    signup: async (email: String, password: String) => {
        await fbApp
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => console.log(user))
            .catch(err => console.log(err))
    },
    login: () => {

    },
    logout: () => {

    }
}

export { fbUserMethods };
