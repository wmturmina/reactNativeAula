import React, { Component } from 'react'
import {
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import Send from '../assets/send.png'

const styles = StyleSheet.create({
  novoComentario: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  textInput: {
    flex: 1,
    height: 40
  },
  sendButton: {
    height: 30,
    width: 30
  }
})
export default class CommentForm extends Component {
  constructor(props){
    super(props)
    this.state={
      novoComentario: ''
    }
  }

  handlerChangeText = (text) => {
    this.setState({
      novoComentario: text
    })
  }
  handlerSend = () => {
    this.props.onSend(this.state.novoComentario)
    this.setState({
      novoComentario: ''
    })
  }

  render() {
    const {
      novoComentario
    } = this.state

    return (
      <View style={styles.novoComentario}>
        <TextInput
          style={styles.textInput}
          placeholder="Adicione um comentário..."
          value={novoComentario}
          onChangeText={this.handlerChangeText}
        />
        <TouchableOpacity onPress={this.handlerSend}>
          <Image source={Send} style={styles.sendButton} />
        </TouchableOpacity>
      </View>
    )
  }
}
