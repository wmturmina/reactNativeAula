import React, { Component } from 'react'
import {
  View,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native'

import Comment from './Comment'
import CommentForm from './CommentForm'
import Like from './Like'
import Header from './Header'

const screenWidth = Dimensions.get('screen').width
const styles = StyleSheet.create({
  foto: {
    width: screenWidth,
    height: screenWidth
  }
})
export default function Post(props) {
  const {
    comentario,
    comentarios,
    loginUsuario,
    urlPerfil,
    urlFoto,
    likers,
    likeada
  } = props.item

  return (
    <View>
      <Header profilePicture={urlPerfil} login={loginUsuario} />
      <Image source={{ uri: urlFoto }} style={styles.foto} />
      <Like liked={likeada} likers={likers} />
      <Comment login={loginUsuario} comentario={comentario} />
      {comentarios.map((item, key) =>
        <Comment key={key} login={item.login} comentario={item.texto} />
        )
      }
      <CommentForm onSend={(texto) => console.warn(texto)} />
    </View>
  )
}
