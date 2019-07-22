import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import Liked from './assets/s2-checked.png'
import NotLiked from './assets/s2.png'

const screenWidth = Dimensions.get('screen').width
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
  },
  foto: {
    width: screenWidth,
    height: screenWidth
  },
  rodape:{
    margin: 10
  },
  botaoDeLike: {
    width: 40,
    height: 40
  }
})
export default class Post extends Component {
  constructor(props){
    super(props)
    this.state={
      liked: props.item.likeada || false
    }
  }

  handlerLike = () => {
    const {
      liked
    } = this.state
    this.setState({
      liked: !liked
    })
  }

  render() {
    const {
      loginUsuario,
      urlPerfil,
      urlFoto
    } = this.props.item
    const {
      liked
    } = this.state
    return (
      <View>
        <View style={styles.cabecalho}>
          <Image source={{ uri: urlPerfil }} style={styles.fotoDePerfil} />
          <Text>{loginUsuario}</Text>
        </View>
        <Image source={{ uri: urlFoto }} style={styles.foto} />
        <View style={styles.rodape}>
          <TouchableOpacity onPress={this.handlerLike}>
            <Image source={liked ? Liked : NotLiked} style={styles.botaoDeLike} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
