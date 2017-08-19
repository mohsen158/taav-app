import React, {Component} from 'react';
import {Text} from 'react-native'
import { ListItem} from 'react-native-elements'
export default class ActivityItem extends Component
{

    constructor(props)
    {
        //noinspection JSAnnotator
        super(props)

    }
    componentDidMount()
    {

    }
    testbtn() {
        console.warn("iam hearaaa")
    }

    render(){
        return (
            <ListItem
                onPress={() => this.props.navigation.navigate('Activity', {name: 'Lucy'})}
                title={this.props.item.id}
                      badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop:0 } }}
            />
        )
    }

}