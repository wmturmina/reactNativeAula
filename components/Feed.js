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
    const baseUrl = 'https://instalura-api.herokuapp.com/api'
    let url = `${baseUrl}/fotos`
    if (login)
      url = `${baseUrl}/public/fotos/${login}`
    
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
          <Post item={item} />
        }
      />
    )
  }
}
