import firebase from 'firebase';
import { INFO_SAVED,INFO_UPDATE } from './type';

export const infoUpdate=({prop,value})=>{
    return{
        type:INFO_UPDATE,
        payload:{prop,value}
    }
}

export const infoCreate = ({ name, State, age, ethnicity, race, height, weight, genderSelectedIndex,gender }) => {
    return (dispatch) => {
        firebase.database().ref(`/users / introduction`)
            .push({ name, State, age, ethnicity, race, height, weight,gender })
            .then(() => {
                dispatch({
                    type: INFO_SAVED
                });
            })
    }
}


