/**
 * Created by mohsen on 8/23/2017.
 */
import {combineReducers} from 'redux';
const initialState = {
    isFetching: false,
    lastFetched: null,
    height: 0
}

export const meta = (state = initialState, action) => {
    switch (action.type) {
        case 'START_FETCHING_MESSAGES':
            return Object.assign({}, state, {isFetching: true});
        case 'RECEIVED_MESSAGES':
            return Object.assign({}, state, {
                isFetching: false,
                lastFetched: action.receivedAt
            });
        case 'UPDATE_MESSAGES_HEIGHT':
            return Object.assign({}, state, {
                height: action.height
            });
        default:
            return state
    }
}

const initialStatetest = {
    test: 467678,
    socket: ''
}
let numtest = 0;
export const teststore = (state = initialStatetest, action) => {
    switch (action.type) {
        case 'test1':
            // console.log('iam hear')
            return Object.assign({}, state, {test: 5});
        case 'INIT_SOCKET':
            // console.log('iam socket')
            return Object.assign({}, state, {socket: action.socket});
        default:
            return state
    }
}

export const message = (state, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            numtest = numtest + 1;

            console.log('numtest:', numtest)
            return {
                id: action.id,
                text: action.text,
                time: action.time,
                fileName:action.fileName,
                author: action.author
            }
        default:
            return state
    }
}
const init = [
    {
        id: 1,
        text: 'text 1',
        time: Date.now(),
        fileName:'',
        author: {
            name: 'mohsen',
            avatar: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png',
            authorizing: false,
            authorized: false
        },
        room: ''
    }

]
export const messages = (state = init, action) => {

    switch (action.type) {
        case 'ADD_MESSAGE':
            if (state.map(m => m.id).includes(action.id)) {
                return state;
            } else {
                return [
                    ...state,
                    message(undefined, action)
                ]
            }
        case 'SEND_MESSAGE':
            return [
                ...state,
                message(undefined, action)
            ]
        default:
            return state
    }
};
const chatroom = combineReducers({
    messages,
    meta
    ,
    teststore
});
export default chatroom;

