import { INFO_SAVED, INFO_UPDATE } from '../actions/type';

const INITIAL_STATE = { name: '', State: '', age: '', ethnicity: '', race: '', height: '', weight: '', genderSelectedIndex: null,gender: null };

export default (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case INFO_SAVED:
            return INITIAL_STATE;

        case INFO_UPDATE:
            return { ...state, [actions.payload.prop]: actions.payload.value };

        default:
            return state;
    }
}