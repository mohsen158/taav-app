/**
 * Created by mohsen on 8/23/2017.
 */
import React, {Component} from 'react';
import {Text, Button, TabBarIOS, View,Dimensions} from 'react-native'
import {Bubble} from 'nachos-ui'
export default class Message extends Component {
    componentDidMount() {
        console.warn(this.props)
    }

    render(){
        const bubbleStyle = { margin: 10 }
        var {height, width} = Dimensions.get('window');


if(this.props.message.author.name==this.props.user.name)
{
    return (
        <View style={{backgroundColor:'blue'}}>
            <View style={{ marginVertical: 5, flexDirection: 'row' }}>
                <Bubble style={bubbleStyle}>{this.props.message.author.name}</Bubble>
                <Bubble
                    style={bubbleStyle}
                    arrowPosition='left'
                    color='#ff9c00'
                >
                    {this.props.message.text}
                </Bubble>
            </View>
        </View>
    )
}

        return (
            <View style={{backgroundColor:'red', opacity:0.5}}>
                <View style={{ marginVertical: 5, flexDirection: 'row' }}>
                    <Bubble style={bubbleStyle}>{this.props.message.author.name}</Bubble>
                    <Bubble
                        style={bubbleStyle}
                        arrowPosition='left'
                        color='#ff9c00'
                    >
                        {this.props.message.text}
                    </Bubble>
                </View>
            </View>
        )


    }


}