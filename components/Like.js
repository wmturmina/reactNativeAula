import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import Liked from '../assets/s2-checked.png'
import NotLiked from '../assets/s2.png'

const styles = StyleSheet.create({
  rodape:{
    margin: 10
  },
  botaoDeLike: {
    width: 40,
    height: 40
  },
  likes: {
    fontWeight: 'bold'
  }
})
export default function Like(props) {
  const {
    onLike,
    idFoto,
    liked,
    likers
  } = props
  const handlerLike = function() {
    onLike(idFoto)
  }
  return (
    <View>
      <View style={styles.rodape}>
        <TouchableOpacity onPress={handlerLike}>
          <Image source={liked ? Liked : NotLiked} style={styles.botaoDeLike} />
        </TouchableOpacity>
      </View>
      {!!likers.length &&
        <Text style={styles.likes}>{likers.length} {`curtida${likers.length > 1 ? 's' : ''}`}</Text>
      }
    </View>
  )
}
