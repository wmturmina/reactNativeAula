import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  cabecalho: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  fotoDePerfil: {
    marginRight: 10,
    borderRadius: 20,
    width: 40,
    height: 40
  }
})
export default function Header(props){
  const {
    profilePicture,
    login
  } = props

  return (
    <View style={styles.cabecalho}>
      <Image source={{ uri: profilePicture }} style={styles.fotoDePerfil} />
      <Text>{login}</Text>
    </View>
  )
}
