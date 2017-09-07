/**
 * Created by mohsen on 8/2/2017.
 */
import React from 'react'
import {Text} from 'react-native'
import {TabNavigator, StackNavigator, DrawerNavigator,TabBarBottom} from 'react-navigation';
import LogIn from '../screen/LogIn'
import Activities from '../screen/Activities'
import SwipeoutExample from'../test/react-native-swipeout/test'
import ViewPagerPage from'../test/viewpager/test'
import MainScreen from'../test/react-native-viewpager/MainScreen'
import ExampleView from'../test/react-native-animatable/app'
import Activity from '../screen/member/Activity'
import Chatroom from '../screen/chatroom/chatroom'
import  activityItem from '../screen/activityItem'
import Detail from '../screen/member/Detail'
import lottie from '../test/lottie/LottieAnimatedExample'
import  interactable from '../test/react-native-interactable/app'
export const ActivityTabs = TabNavigator({

    Detail: {
        screen: Detail
    },
    Activity: {
        screen: Activity


    }
}, {

        tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom'

})
export const ActivityRouter = StackNavigator({
    Activities: {
        screen: Activities,
    },
    Activity: {

        screen: ActivityTabs
    },

}, {

    headerMode: 'none'

})

export const DrawerMenu = DrawerNavigator({
    chatroom: {
        screen: Chatroom,
    },
    Activities: {
        screen: ActivityRouter,
    }, animatable: {
        screen: ExampleView,
    },
    SwipeoutExample: {
        screen: SwipeoutExample,
    },
    ViewPagerPage: {
        screen: ViewPagerPage,
    },
    viewpager: {
        screen: MainScreen,
    }, interactable: {
        screen: interactable,
    },Lottie: {

        screen: lottie
    },
});
export const MainRoute = StackNavigator({
    MainPage: {
        screen: DrawerMenu
    },
    LogIn: {

        screen: LogIn
    },

}, {

    headerMode: 'none'

})
