import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet,
  AsyncStorage
} from 'react-native'
import Post from './Post'

const styles = StyleSheet.create({
  container: {
    marginTop: 25
  }
})

const BASE_URL = 'https://instalura-api.herokuapp.com/api'
export default class Feed extends Component {
  constructor(props){
    super(props)
    this.state = {
      fotos: [],
      loading: false
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {
      navigation
    } = this.props

    this.setState({
      loading: true
    })
    const login = navigation.getParam('login')
    let url = `${BASE_URL}/fotos`
    if (login)
      url = `${BASE_URL}/public/fotos/${login}`
    
    const resposta = await fetch(url,{
      headers: new Headers({
        'X-AUTH-TOKEN': await AsyncStorage.getItem('token')
      })
    })
    const data = await resposta.json()
    this.setState({
      fotos: data,
      loading: false
    })
  }

  handlerLike = async (idFoto) => {
    const {
      fotos
    } = this.state
    const resposta = await fetch(`${BASE_URL}/fotos/${idFoto}/like`, {
      method: 'POST',
      headers: new Headers({
        'X-AUTH-TOKEN': await AsyncStorage.getItem('token')
      })
    })
    const data = await resposta.json()
    this.setState({
      fotos: fotos.map(item => {
        if (item.id === idFoto) {
          let likers = item.likers
          if (!item.likeada) {
            likers = [...likers, data]
          } else {
            likers = likers.filter(liker => liker.login !== data.login)
          }
          return {
            ...item,
            likeada: !item.likeada,
            likers
          }
        }
        return item
      })
    })
  }

  handlerComment = async (idFoto, comment) => {
    const {
      fotos
    } = this.state
    const resposta = await fetch(`${BASE_URL}/fotos/${idFoto}/comment`, {
      method: 'POST',
      body: JSON.stringify({
        texto: comment
      }),
      headers: new Headers({
        'Content-type': 'application/json',
        'X-AUTH-TOKEN': await AsyncStorage.getItem('token')
      })
    })
    const data = await resposta.json()
    this.setState({
      fotos: fotos.map(item => {
        if (item.id === idFoto) {
          return {
            ...item,
            comentarios: [
              ...item.comentarios,
              data
            ]
          }
        }
        return item
      })
    })
  }
 
  render() {
    const {
      fotos,
      loading
    } = this.state

    return (
      <FlatList
        refreshing={loading}
        onRefresh={() => this.getData()}
        style={styles.container}
        data={fotos}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) =>
          <Post item={item} doLike={this.handlerLike} doComment={this.handlerComment} />
        }
      />
    )
  }
}
