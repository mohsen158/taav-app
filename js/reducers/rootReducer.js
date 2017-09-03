/**
 * Created by mohsen on 8/23/2017.
 */
import { combineReducers } from 'redux';
import chatroom from './chatroom';
import user from './user';
const rootReducer = combineReducers({
    chatroom,
    user
});

export default rootReducer;