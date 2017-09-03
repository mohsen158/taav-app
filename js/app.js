/**
 * Created by mohsen on 8/2/2017.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Button,
    View
} from 'react-native';
import  {MainRoute} from './config/routers'
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import Chatroom from './screen/chatroom/chatroom'
import rootReducer from './reducers/rootReducer'
import logger from 'redux-logger'
const store = createStore(rootReducer, applyMiddleware(logger));
import io from 'socket.io-client';

export default class taav extends Component {


    render() {
        console.log('store from hear',store)
        return (
            <Provider store={store}>
                <MainRoute dispatch={store.dispatch}/>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
