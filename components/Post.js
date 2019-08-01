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
    likeada,
    id
  } = props.item
  const {
    doLike,
    doComment
  } = props

  return (
    <View>
      <Header profilePicture={urlPerfil} login={loginUsuario} />
      <Image source={{ uri: urlFoto }} style={styles.foto} />
      <Like idFoto={id} liked={likeada} likers={likers} onLike={doLike} />
      <Comment login={loginUsuario} comentario={comentario} />
      {comentarios.map((item, key) =>
        <Comment key={key} login={item.login} comentario={item.texto} />
        )
      }
      <CommentForm idFoto={id} onSend={doComment} />
    </View>
  )
}
