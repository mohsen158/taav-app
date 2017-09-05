/**
 * Created by mohsen on 8/23/2017.
 */
import React, {Component} from 'react';
import {Text, Button, Image, TabBarIOS, View, Dimensions} from 'react-native'
import {Bubble} from 'nachos-ui'
import {praxoServer} from '../../config/env'
export default class Message extends Component {
    componentDidMount() {
        console.warn(this.props)
    }

    render() {
        const bubbleStyle = {margin: 2}
        var {height, width} = Dimensions.get('window');
        console.log('http://192.168.1.50:8891/file/' + this.props.message.fileName)

        if (this.props.message.author.name == this.props.user.name) {
            return (
                <View style={{backgroundColor:'blue'}}>
                    <View style={{ marginVertical: 2, flexDirection: 'row' }}>

                        <Image
                            style={{width: 70, height: 70}}

                            source={{uri:praxoServer+'/file/'+this.props.message.fileName}}
                        />


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

                    <Image
                        style={{width: 70, height: 70}}
                        source={{uri:praxoServer+'/file/'+this.props.message.fileName}}
                    />

                    <Bubble style={bubbleStyle}>{this.props.message.author.name}</Bubble>
                    <Bubble
                        style={bubbleStyle}
                        arrowPosition='left'
                        color='#ff9c02'


                    >
                        {this.props.message.text}
                    </Bubble>
                </View>
            </View>
        )


    }


}