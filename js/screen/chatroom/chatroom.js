/**
 * Created by mohsen on 8/23/2017.
 */
import React, {Component} from 'react';
import {Text, Button, TabBarIOS, View} from 'react-native'
import MessageList from './messageList'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {connect} from 'react-redux'
import {Input} from 'nachos-ui'
import OneSignal from 'react-native-onesignal';
import {sendMessage,changeUserName,initMessage, addSocket}from '../../actions/actions'
import io from 'socket.io-client';
import reduxLogger from 'redux-logger'

const mapStateToProps = (state) => {
    return {
        messages: state.chatroom.messages
    }
}
export const Testredux = connect(mapStateToProps)(MessageList)
const mapStateToProps2 = (state) => ({

    user: state.user
});
class Chatroom extends Component {
    state = {
        text: '',
        test2: "dfsd",
        userName: ''
    }


    constructor(props) {
        super(props);

        // Creating the socket-client instance will automatically connect to the server.

        //this.props.dispatch(addSocket(this.socket))
        // this.socket.emit('chat message', 'Hssssello world!sss');
    }

    componentDidMount() {
        OneSignal.configure({});

        console.log('this', this.props)
    }

    send() {
        //   this.socket.emit('chat message', 'Hssssello world!ssddds');
//this.props.dispatch('sfsd')
        this.props.dispatch(sendMessage(this.state.text, this.props.user))
    }

    setName() {
        this.setState({userName: this.state.text})
        this.props.dispatch(changeUserName(this.state.text))
        initMessage(this.props.dispatch,this.props.user)


    }

    render() {


        if (this.state.userName == '') {
            return (
                <View  >
                    <Text  >type your name</Text>

                    <Input

                        placeholder='Your name'
                        value={this.state.text}
                        onChangeText={value => this.setState({text:value})}
                    />
                    <Button   title={'SEND'} onPress={this.setName.bind(this)}/>
                </View>
            )

        } else
            return (
                <View style={{flex:1,
            backgroundColor:'#ecf0f1'
             }}>
                    <KeyboardAwareScrollView   >
                        <Testredux test={'sdfdsf'} user={this.props.user}/>

                        <Text>{this.props.user.name}</Text>
                        <View style={{flex:1,flexDirection:'row'}}>
                            <Input
                                style={{textAlign:'center' ,
                            flex:1}}
                                placeholder='Your name'
                                value={this.state.text}
                                onChangeText={value => this.setState({text:value})}
                            />
                            <Button style={{textAlign:'center' ,
                        flex:1}} title={'SEND'} onPress={this.send.bind(this)}/>

                        </View>

                    </KeyboardAwareScrollView >
                </View>  )


    }


}
export default connect(mapStateToProps2)(Chatroom);