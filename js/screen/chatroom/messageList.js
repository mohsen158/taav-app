/**
 * Created by mohsen on 8/23/2017.
 */
import React, {Component} from 'react';
import {Text, Button, FlatList, TabBarIOS, View} from 'react-native'
import Message from './message'
export default class MessageList extends Component {
    state = {
        messages: []
    }

    componentDidMount() {
        // console.warn('store',store)
    }

    btn() {


        dispatch({type: 'test1'})////////////this is wrong???
    }

    render() {


        return (
            <View style={{
                marginRight:5,

                marginLeft:5
            ,

            }}>


                <FlatList
                    data={this.props.messages}
                    renderItem={({item}) => <Message user={this.props.user} message={item} />}
                />

            </View>  )


    }


}