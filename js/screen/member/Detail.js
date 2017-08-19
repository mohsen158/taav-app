import React, {Component} from 'react';
import {Text, Button, TabBarIOS, View} from 'react-native'
import {ListItem} from 'react-native-elements'
export default class Detail extends Component {

    constructor(props) {
        //noinspection JSAnnotator
        super(props)


    }

    state = {
        test: '1'
        ,
        selectedTab: 'welcome'
    }

    componentDidMount() {

    }

    testbtn() {
        console.warn("iam hearassaassssssssssss")
    }

    renderFooter = () => {

    }

    render() {

        return (<Text>Detail</Text>)
    }
}