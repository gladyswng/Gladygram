import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// here i want to import the seed file


const config = {
    apiKey: "AIzaSyD6Le3xybx5TUhjbRtrdtdRveSMyLL8Y8c",
    authDomain: "gladygram-932e7.firebaseapp.com",
    projectId: "gladygram-932e7",
    storageBucket: "gladygram-932e7.appspot.com",
    messagingSenderId: "284651315560",
    appId: "1:284651315560:web:807e8f72e37dc385a676dd"
}

const firebase = Firebase.initializeApp(config)

const { FieldValue } = Firebase.firestore


// here is where i want to call the seed file (only once)
// seedDatabase(firebase)

console.log(firebase)

export { firebase, FieldValue }

