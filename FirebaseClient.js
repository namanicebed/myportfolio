import firebase from 'firebase'

const config = {
    apiKey: 'AIzaSyAXT7jWZM_MDDiTOCEuYkfSww47EtWZGCU',
    authDomain: 'introapp-a8c30.firebaseapp.com',
    databaseURL: 'https://introapp-a8c30.firebaseio.com',
    projectId: 'introapp-a8c30',
    storageBucket: 'introapp-a8c30.appspot.com',
    messagingSenderId: "853702815343"
};
const firebaseApp = firebase.initializeApp(config);

export default firebaseApp