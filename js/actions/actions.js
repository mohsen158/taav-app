/**
 * Created by mohsen on 8/26/2017.
 */
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';
let testtest = 0;
import {praxoServer} from '../config/env'
import io from 'socket.io-client';
let userID = Date.now();
var socket;
var path='/storage/emulated/0/Pictures/Telegram/IMG_20170901_231340.jpg'
export const initMessage = (dispatch, user) => {

    socket = io(praxoServer, {transports: ['websocket'], query: "username=" + user.name});
    console.log('socket ssssds', socket)


    dispatch({type: 'ghjgjjjjhg '});

    console.log('listen  ss ')

    socket.on('receiveMessages', (data) => {

        if (data) {
            data = JSON.parse('[' + data + ']')
            Object.values(data).forEach(msg => dispatch(addMessage(msg)));
        }
    })


    socket.emit('fetchallMessages', '{"room":1}')
    socket.on('receiveMessage', (message) => {


        setTimeout(() => {

            const messages = message || [];

            dispatch(addMessage(messages))
            console.log(message)
            console.warn("new message")

        }, 0);


    });

}


export const addMessage = (msg) => ({
    type: 'ADD_MESSAGE',
    ...msg
});
export const receiveMessages = (messages) => {
    return function (dispatch) {
        Object.values(messages).forEach(msg => dispatch(addMessage(msg)));


    }
}
export const addSocket = (socket) => ({
    type: 'INIT_SOCKET',
    ...socket
});
export const changeUserName = (name) => ({
    type: 'SET_USER_NAME',
    name: name
})
export const sendMessage = (text='', user,fileName='') => {

    var msg = {
        id: Date.now(),
        text: text,
        time: Date.now(),
        fileName:fileName,
        author: {
            name: user.name,
            avatar: user.avatar,
            authorizing: false,
            authorized: false
        }
        ,
        room: 1
    };
    msg.id = Date.now()
    console.log('strien', JSON.stringify(msg))
    socket.emit('message', JSON.stringify(msg));
    return addMessage(msg);
};
