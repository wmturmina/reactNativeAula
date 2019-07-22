import React, { Component } from 'react'
import { FlatList, StyleSheet } from 'react-native'
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
    this.setState({
      loading: true
    })
    const resposta = await fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
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
