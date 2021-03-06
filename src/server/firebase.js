import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const config ={
    apiKey: "AIzaSyB1tT5VWDAKpyxzoNVaWV-cb6APg41iQ_A",
    authDomain: "home-cd22c.firebaseapp.com",
    projectId: "home-cd22c",
    storageBucket: "home-cd22c.appspot.com",
    messagingSenderId: "916399183071",
    appId: "1:916399183071:web:8b1696e6ce253e1ca2456a",
    measurementId: "G-K3BDKMNB0B"
  };

class Firebase{
    constructor(){
        app.initializeApp(config);
        this.db = app.firestore();
        this.auth=app.auth();
    }
    estaIniciado(){
        return new Promise(resolve=>{
            this.auth.onAuthStateChanged(resolve)
        })
    }
}

export default Firebase;