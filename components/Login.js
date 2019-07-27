import React, { Component } from  'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Dimensions,
  AsyncStorage
} from 'react-native'
/*import {
  AsyncStorage
} from '@react-native-community/async-storage'*/

const screenWidth = Dimensions.get('screen').width
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    width: screenWidth * 0.8
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  }
})

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: '',
      password: ''
    }
  }
  handlerLogin = () => {
    const {
      login,
      password
    } = this.state
    fetch('https://instalura-api.herokuapp.com/api/public/login', {
      method: 'POST',
      headers: new Headers({
        'Content-type': 'application/json'
      }),
      body: JSON.stringify({
        login,
        senha: password
      })
    })
      .then(response => {
        if (response.ok)
          return response.text()
        
        throw new Error('Usuário inválido!')
      })
      .then(token => {
        AsyncStorage.setItem('token', token)
        AsyncStorage.setItem('login', login)
      })
      .catch(error => {
        console.warn('ERRO', error)
      })
  }
  render() {
    const {
      login,
      password
    } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            placeholder="Usuário"
            style={styles.input}
            onChangeText={text => this.setState({ login: text })}
            value={login}
          />
          <TextInput
            placeholder="Senha"
            style={styles.input}
            onChangeText={text => this.setState({ password: text })}
            value={password}
            secureTextEntry
          />
          <Button title="Login" onPress={this.handlerLogin}/>
        </View>
      </View>
    )
  }
}