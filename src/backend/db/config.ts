import firebase from "firebase";
import 'firebase/firestore';

//se não houver uma app inicializada(app.length=0), inicialize a aplicação
if(!firebase.apps.length){
    firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHD_DOMAIN,
        projectId:process.env.NEXT_PUBLIC_PROJECT_FIREBASE_ID,
    })
}

export default firebase;