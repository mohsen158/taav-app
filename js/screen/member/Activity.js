import React, {Component} from 'react';
import {Text, Button, TabBarIOS, View} from 'react-native'
import {ListItem} from 'react-native-elements'
import {server} from '../../config/env'
import axios from 'axios'
import {Picker} from "native-base";
const Item = Picker.Item;
import Echo from "laravel-echo"


window.io = require("socket.io-client");

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */
const echo = window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: 'http://'.concat(server).concat(':6001')
});


export default class ActivityItem extends Component {

    constructor(props) {
        //noinspection JSAnnotator
        super(props)
        this.getNextStep = this.getNextStep.bind(this)
        this.refresh = this.refresh.bind(this)


    }

    state = {
        item: ''
        , status: ''
        , remainingSteps: []
        , nextStep: ''

    }

    componentWillUpdate(nextProps, nextState) {
        // perform any preparations for an upcoming update


        console.log('in will update:', nextState)
    }

    componentWillMount() {

        this.refresh()
    }

    componentDidMount() {
        //console.log('sdfsdffsffdsss',this.props.navigation.state.params.item)
        //migirim akharin progress or ending

        echo.channel('channel')

            .listen('updateStatus', (e) => {

                this.setState({item: e.activity, status: e.activity.status})
                this.getNextStep()
                console.log('in remainingSteps:', this.state.remainingSteps);
            });


        console.log('in remainingSteps:', this.state.remainingSteps);

    }

    testbtn() {
        console.warn("iam hearassaasssessssss")
    }

    renderFooter = () => {

    }

    refresh() {
        item = this.props.navigation.state.params.item;
        axios.get('http://'.concat(server).concat(':8080/memberActiveActivity/').concat(item.member.id)).then(response => {

            if (response.data == 0) {
                this.setState({status: 'Done'}, () => {

                    this.getNextStep()
                })
                console.log('axiosss respons 0000     0', response)
            }
            else {
                this.setState({status: response.data.status, item: response.data})
                console.log('get item:', response.data)
            }

        }).catch(function (error) {

            console.log(error)
        })
        this.getNextStep()
    }

    getNextStep() {
        item = this.props.navigation.state.params.item
        console.log('next steps item.status', this.state)
        if (this.state.status == 'Done') {
            axios.post('http://'.concat(server).concat(':8080/remainingSteps/').concat(item.member_id)).then(response => {

                console.log('size:',response.data.length)
               if(response.data.length)
               {  this.setState({remainingSteps: response.data,nextStep:response.data[0].id})
            }else {
                   this.setState({remainingSteps: response.data, nextStep: ''})
               }
                console.log('next steps response', response.data)
            }).catch(function (error) {

                console.log('getremainingSteps error  ', error)
            })

        }
    }

    startActivity() {
        console.log(server)

        item = this.state.item
        axios.get('http://'.concat(server).concat(':8080/start/').concat(item.member_id).concat('/').concat(item.step_id)).then(response => {


        }).catch(function (error) {

            console.log(error)
        })
    }

    doneActivity() {


        item = this.state.item
        console.log('in bug', item)
        axios.post('http://'.concat(server).concat(':8080/done/').concat(item.member_id).concat('/').concat(item.step_id)).then(response => {

            console.log(response)

        }).catch(function (error) {

            console.log(error)
        })
    }

    setNextStep() {
let tt='http://'.concat(server).concat(':8080/newStep/').concat(item.member_id).concat('/').concat(this.state.nextStep)
        console.log(tt)
        axios.get('http://'.concat(server).concat(':8080/newStep/').concat(item.member_id).concat('/').concat(this.state.nextStep)).then(response => {

            console.log(response)

        }).catch(function (error) {

            console.log(error)
        })
        this.refresh()

    }

    render() {

        if (this.state.status == 'Pending') {
            return (

                <View>
                    <Text>Pending</Text>
                    <Button title={'start'} onPress={this.startActivity.bind(this)}/>
                </View>
            )
        }
        if (this.state.status == 'Progress') {
            return <View>
                <Text>Progress</Text>
                <Button title={'Done'} onPress={this.doneActivity.bind(this)}/>
            </View>

        } else {
            return <View>
                <Text>{this.state.status}</Text>
                <Picker
                    mode="dropdown"
                    selectedValue={this.state.nextStep }
                    onValueChange={(value) => {
                   this.setState({nextStep:value})
                   console.log(value)
                }}>

                    {this.state.remainingSteps.map((item, index) => {
                        return <Item key={item.id} value={item.id} label={item.title}/>
                    })}


                </Picker>
                <Button onPress={this.setNextStep.bind(this)} title={'as'}/>
            </View>
        }


    }
}