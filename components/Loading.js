import React from 'react'
import {
  ActivityIndicator,
  View,
  StyleSheet,
  AsyncStorage
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default function Loading(props) {
  AsyncStorage.getItem('token')
    .then(token => {
      props.navigation.navigate( token ? 'Feed' : 'Login' )
    })
  return(
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  )
}