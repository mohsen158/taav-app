/**
 * Created by mohsen on 8/23/2017.
 */
import React, {Component} from 'react';
import {Text, Button, Image, TabBarIOS, View} from 'react-native'
import MessageList from './messageList'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {connect} from 'react-redux'
import {Input} from 'nachos-ui'
import axios from 'axios';
import {praxoServer} from '../../config/env'
import OneSignal from 'react-native-onesignal';
import {sendMessage, changeUserName, initMessage, addSocket}from '../../actions/actions'
import io from 'socket.io-client';
import reduxLogger from 'redux-logger'
var ImagePicker = require('react-native-image-picker');


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
        this.sendFile = this.sendFile.bind(this)
        //this.props.dispatch(addSocket(this.socket))
        // this.socket.emit('chat message', 'Hssssello world!sss');
    }

    componentDidMount() {
        // OneSignal.configure({});//has error

        console.log('this', this.props)
    }

    send() {
        //   this.socket.emit('chat message', 'Hssssello world!ssddds');
//this.props.dispatch('sfsd')
        this.props.dispatch(sendMessage(this.state.text, this.props.user))


    }



    sendFile(path, fileName) {

        //
        // var path = 'file:////storage/emulated/0/Pictures/Telegram/IMG_20170901_231340.jpg'
        //
        //
        //


        var data = new FormData();
        data.append('picture', {uri: path, name: fileName, type: 'image/jpg'});

        // Create the config object for the POST
        // You typically have an OAuth2 token that you use for authentication
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data;'
            },
            body: data,
        }
        //
        console.log('hear')
        var that=this;
        var data = new FormData();
        data.append('picture', {uri: path, name: fileName, type: 'image/jpg'});
        axios.post(praxoServer+'/uploadImage', data,{
            onUploadProgress: function (progressEvent) {
                console.log(progressEvent.loaded)
                // Do whatever you want with the native progress event
            }
        })
            .then(function (res) {
                console.log('this', that)
                that.props.dispatch(sendMessage('', that.props.user, fileName))
                console.log('after dispatch', res)
            })
            .catch(function (err) {
                console.log(err)
            });
        console.log('sdfsd')


        //
        //
    }


    file() {
        var options = {
            title: 'Select Avatar',
            customButtons: [
                {name: 'fb', title: 'Choose Photo from Facebook'},
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                this.sendFile(response.uri, response.fileName)
                let source = {uri: response.uri};

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });

        /*
         var FilePickerManager = require('NativeModules').FilePickerManager;
         const options = {
         title: 'File Picker',
         chooseFileButtonTitle: 'Choose File...'
         };

         FilePickerManager.showFilePicker(options,(response) => {
         console.log('Response = ', response);

         if (response.didCancel) {
         console.log('User cancelled file picker');
         }
         else if (response.error) {
         console.log('FilePickerManager Error: ', response.error);
         }
         else {
         this.setState({
         file: response
         });
         console.log(response.fileName)
         }
         });

         */


    }

    setName() {
        this.setState({userName: this.state.text})
        this.props.dispatch(changeUserName(this.state.text))
        initMessage(this.props.dispatch, this.props.user)


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
                    <Button title={'SEND'} onPress={this.setName.bind(this)}/>
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
                            <Button style={{textAlign:'center' ,
                        flex:1}} title={'File'} onPress={this.file.bind(this)}/>

                        </View>

                    </KeyboardAwareScrollView >
                </View>  )


    }


}
export default connect(mapStateToProps2)(Chatroom);