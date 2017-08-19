/**
 * Created by mohsen on 8/2/2017.
 */
import React, {Component} from 'react';
import  {Text, View, Button} from 'react-native'
export default class LogIn extends Component {
    static navigationOptions = {
        title: 'Login'
        ,

    }

    constructor(props) {
        super(props)
        this.btnclick = this.btnclick.bind(this)
        this.btnLogIn = this.btnLogIn.bind(this)
    }

    state = {
        test: false
    }

    btnclick() {
        this.setState({test: !this.state.test})
    }

    btnLogIn() {

        this.props.navigation.navigate('MainPage')
    }

    render() {
        if (this.state.test) {
            return (
                <View>
                    <Button title={"btn"} onPress={this.btnclick}></Button>
                    <Button title={"LogIn"} onPress={this.btnLogIn}></Button>
                    <Text>trueffssassa</Text></View>
            )
        } else {
            return (
                <View>
                    <Button title={"btn"} onPress={this.btnclick}></Button>
                    <Text>false</Text></View>
            )
        }
        <View><Text>Loginaa</Text></View>

    }
}