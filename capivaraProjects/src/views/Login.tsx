import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

import React, { Component } from 'react';
import LoginController from "../controller/LoginController";

type stateLogin = {
  emailInput: string,
  senhaInput: string
}

class Login extends Component<{}, stateLogin>{

  constructor(props:any){
    super(props);

    this.state = {
      emailInput : "",
      senhaInput : "",
    }
    
  }

  click(state:any){
    console.log(state);
  }

  render(){
    return(
    <View style={styles.sectionViewInput}>
      <Text style={styles.sectionText}>E-mail</Text>
      <TextInput 
        style={styles.sectionTextInput} 
        onChangeText={(text) => this.setState({emailInput : text})}
      />
      <Text style={styles.sectionText} >Senha</Text>
      <TextInput
        secureTextEntry={true} 
        style={styles.sectionTextInput} 
        onChangeText={(text) => this.setState({senhaInput : text})}
      />
      <View style={styles.sectionButtonInput}>
        <Button  color="#FFFFFF" onPress={ () => LoginController(this.state) } title="Entrar" />
      </View>
    </View>
    );
  }

};

const styles = StyleSheet.create({
  sectionTextInput: {
    height: 40,
    borderColor: "#C0C0C0",
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 20
  },
  sectionViewInput: {
    padding: "5%",
    flex: 1
  },
  sectionButtonInput: {
    backgroundColor :"#8A2BE2",
    borderRadius: 15,
    height: 45,
    justifyContent: "center",
  },
  sectionText: {
    height: 25,
    fontSize: 20
  }

});

export default Login;