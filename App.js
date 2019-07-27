import React, { Component } from 'react'
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation'

import Feed from './components/Feed'
import Login from './components/Login'
import Loading from './components/Loading'

const LoginStack = createStackNavigator({
  LoginScreen: {
    screen: Login
  }
},
{
  headerMode: 'None'
})

const FeedStack = createStackNavigator({
  FeedScreen: {
    screen: Feed
  },
  FeedFriendScreen: {
    screen: Feed
  }
},
{
  headerMode: 'None'
})

const App = createSwitchNavigator({
  LoadingScreen: {
    screen: Loading
  },
  Login: LoginStack,
  Feed: FeedStack
},
{
  initialRouteName: 'LoadingScreen'
})
export default createAppContainer(App)