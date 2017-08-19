/**
 * Created by mohsen on 8/2/2017.
 */
import React, {Component} from 'react';
import {server} from '../config/env'
import  {
    Text, View, FlatList, StyleSheet, Button, ScrollView, Animated, TouchableWithoutFeedback
} from 'react-native'
import axios from 'axios'
import {List, ListItem, SearchBar} from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import {NavigationActions} from'react-navigation'
import {Picker} from "native-base";
const Item = Picker.Item;
import ActivityTabs from '../config/routers'
import ActivityItem from './activityItem'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }, list: {

        backgroundColor: '#ff3799',
    },
    picker: {
        width: 100,
    },

})
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


export default class Activities extends Component {

    constructor(props) {
        super(props)
        this.btnadd = this.btnadd.bind(this)
        this.SearchMethod = this.SearchMethod.bind(this)
        //   this.socket = io('http://'.concat(server).concat(':6001'), {json: false})

    }

    state = {
        list: []
        ,
        listSource: [],
        testlist: [{as: 'sd'}, {sd: 'sd'}]
        , steps: []
        , step: 'all'
        , searchText: ''

    }


    SearchMethod(searchText = '', searchStep = '') {


        text = searchText;
        step = searchStep
        let searchtext = text.toLowerCase()
        let stepId = step
        const flags = new Set();

        let newarray = this.state.listSource.filter((n) => {
            let lowName = n.member.name.toLowerCase()


            if ((lowName.search(searchtext) !== -1) && ((n.step.id == step) || (step == 'all'))) {
                if (flags.has(n.member.id)) {
                    return false;
                } else {
                    flags.add(n.member.id);
                    return true;
                }

            }

        })

        this.setState({list: newarray, step: step, searchText: text})



    }

    componentWillUpdate(nextProps, nextState) {


    }

    componentDidMount() {

        echo.channel('channel')

            .listen('updateStatus', (e) => {
                console.log(e);
            });


        // var echo = window.Echo = new Echo({
        //     broadcaster: "socket.io",
        //     host: 'http://'.concat(server).concat(':6001')
        // });
        //


    }

    componentWillMount() {
        // console.warn("sdfa")
        axios.get('http://192.168.1.52:8080/getA').then(response => {
            this.setState({list: response.data})
            this.setState({listSource: response.data})
            // console.warn(this.state.list)
        }).catch(function (error) {
            console.warn(error)

        })
        axios.get('http://192.168.1.52:8080/getSteps').then(response => {
            this.setState({steps: response.data})

            // console.warn(this.state.list)
        }).catch(function (error) {
            console.warn(error)

        })
        this.SearchMethod()

    }


    btnadd() {
        // var list= this.state.testlist.concat({sdf:'sdxxfsdfs'})
        //  this.setstate( {testlist:list})
        //
        // this.refs.mmm.bounceIn(700);
        // this.SearchMethod('Arianna ','1')
        var newArray = this.state.list.slice();
        // newArray.push({sdf: 'dsfsfd'});
        newArray[0].member.name = "mohsen sssssssssss"
        // newArray.pop()
        this.setState({list: newArray})
    }

    testbtn(item) {

    }

    onValueChange(value: string) {
        this.setState({
            selected1: value
        })
    }

    render() {


        return (
            <View style={styles.container}>
                <Text>MainPage</Text>
                <Button title={"btsnabhss  sssssssjcxhbaabcsssbdd"} onPress={this.btnadd}></Button>
                <Animatable.View ref="view">
                    <Text>sssdsccssssss</Text>
                </Animatable.View>
                <Picker
                    mode="dropdown"
                    selectedValue={this.state.step }
                    onValueChange={(value) => {
                        {/*console.log(value)*/}
                         {/*this.setState({*/}
                       {/*step: value*/}
                     {/*})*/}
                     this.SearchMethod(this.state.searchText,value);
                       }}>
                    <Item key="all" value="all" label="all"/>
                    {this.state.steps.map((item, index) => {
                        return <Item key={item.id} value={item.id} label={item.title}/>
                    })}

                </Picker>
                <SearchBar
                    lightTheme
                    round
                    placeholder='Type Heaaasssssسssssse...'
                    onChangeText={(text=>{

                        this.SearchMethod(text,this.state.step);


                    })}/>

                <FlatList
                    style={styles.list}
                    extraData={this.state}
                    data={this.state.list}
                    keyExtractor={(item,index) => item.id}
                    renderItem={({item})=> (<ListItem
                onPress={() => {

                    const navigationAction = NavigationActions.navigate({
  routeName: 'Activity', // <==== this is stackNavigator
  action: NavigationActions.navigate({
    routeName: 'Activity', // <===== this is defaultScreen for Portfolio
    params: {item: {...item}}
  })
});
this.props.navigation.dispatch(navigationAction);




                    }

                }


                title={item.member.id
                }

                      badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop:0 } }}
            />)}
                />

            </
                View
            >


        )
    }
}