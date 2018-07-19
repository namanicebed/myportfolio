import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, Picker, TouchableOpacity } from 'react-native';
import reducers from './reducers';
import firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import IntroForm from './components/IntroForm';
import InfoForm from './components/IntroForm';


class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyAXT7jWZM_MDDiTOCEuYkfSww47EtWZGCU',
            authDomain: 'introapp-a8c30.firebaseapp.com',
            databaseURL: 'https://introapp-a8c30.firebaseio.com',
            projectId: 'introapp-a8c30',
            storageBucket: 'introapp-a8c30.appspot.com',
            messagingSenderId: "853702815343"
        };
        firebase.initializeApp(config);
    }
    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <InfoForm />
            </Provider>

        );
    }
}

export default App;