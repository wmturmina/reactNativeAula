import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import {
  withNavigation
} from 'react-navigation'

const styles = StyleSheet.create({
  comentario: {
    marginLeft: 10,
    flexDirection: 'row'
  },
  tituloLegenda: {
    fontWeight: 'bold',
    marginRight: 5
  }
})

function Comment(props) {
  const {
    comentario,
    login
  } = props

  const navigate = function() {
    props.navigation.navigate('FeedFriendScreen', { login: login })
  }

  return (
    <View style={styles.comentario}>
      <TouchableOpacity onPress={navigate}>
        <Text style={styles.tituloLegenda}>{login}</Text>
      </TouchableOpacity>
      <Text>{comentario}</Text>
    </View>
  )
}

export default withNavigation(Comment)
