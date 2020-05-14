import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Button,
  ActivityIndicator,
  Alert
} from 'react-native';

import React, { Component } from 'react';
import { validateLoginInput } from "../validate/validateLoginInput";
import { getToken } from '../storage/getToken';
import { Navigation } from 'react-native-navigation';
import { ValidateRegex } from '../validate/regexValidation';
import {signIn} from '../apolloConfig/signIn';

interface LoginState {
  emailInput: string,
  passwordInput: string,
  loading: boolean,
  isEmailValid: boolean,
  isPasswordValid: boolean,
}

interface loginValidate {
  isEmailValid: boolean,
  isPasswordValid: boolean
}

export default class Login extends React.Component<{}, LoginState>{

  validate = new ValidateRegex();

  constructor(props: any) {

    super(props);

    this.validate = this.validate;
    this.state = {
      emailInput: "",
      passwordInput: "",
      loading: false,
      isEmailValid: true,
      isPasswordValid: true,
    };

  }

  render() {
    return (
      <View style={styles.sectionViewInput}>
        <Text style={styles.sectionText}>E-mail</Text>
        <TextInput
          style={ [styles.borderInput ,this.inputStyle(this.state.isEmailValid)] }
          onChangeText={this.handleChangeTextInputEmail}
        />
        <Text style={styles.sectionText} >Senha</Text>
        <TextInput
          secureTextEntry={true}
          style={ [styles.borderInput ,this.inputStyle(this.state.isPasswordValid)] }
          onChangeText={this.handleChangeTextInputPassword}
        />
        <View style={styles.sectionButtonInput}>
            {this.state.loading ?
            <ActivityIndicator size="small" color="#0000ff" /> :
            <Button
              color="#FFFFFF"
              onPress={this.handleButtonTap}
              title='login'
            >
            </Button>}
        </View>
      </View>
    );
  }

  private inputStyle(typeOfInput : boolean): any {

    return typeOfInput ? {borderColor : '#C0C0C0'} : {borderColor: '#ff9090'};

  }

  private acessHomePage() {

    Navigation.push('Login', {
      component: {
        id: 'Home',
        name: 'Home',
        options: {
          topBar: {
            title: {
              text: 'Home'
            },
            backButton: {
              visible : false
            }
          }
        }
      }
    });

  }

  private handleButtonTap = async () => {

    const validacaoInput : loginValidate =  validateLoginInput(this.state, this.acessHomePage);
    this.changeStateInput(validacaoInput);

    if(validacaoInput.isEmailValid && validacaoInput.isPasswordValid){
    
      this.getConnection();
    
    }
  }

  private handleChangeTextInputEmail = (text) =>{
    
    this.setState({ emailInput: text });
    if (!this.state.isEmailValid) {
      this.setState({ isEmailValid: this.validate.email(text) });
    }
  }

  private handleChangeTextInputPassword = (text) =>{
    
    this.setState({ passwordInput: text });
    if (!this.state.isPasswordValid) {
      this.setState({ isPasswordValid: this.validate.password(text) });
    }
  }

  private changeStateInput(validacaoInput : loginValidate){
    
    this.setState({
      isEmailValid: validacaoInput.isEmailValid,
      isPasswordValid: validacaoInput.isPasswordValid,
    });

  }

  private async getConnection(){
    
    try{

      this.setState({ loading: true });  
      await signIn(this.state.emailInput, this.state.passwordInput);
      this.acessHomePage();
    
    }catch(error){
      
      const messageError =  JSON.stringify(error.graphQLErrors[0].message) || "Não foi possivel conectar ao servidor";
      Alert.alert(messageError);

    }finally{
      this.setState({ loading: false });
    }

  }

  componentDidMount() {

    getToken()
      .then(result => {
        if (result != 'none') {
          this.acessHomePage()
        }
      })
      .catch(error => console.log(error));

  }
};

const styles = StyleSheet.create({
  borderInput : {
    height: 40,
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 20,
  },
  sectionTextInput: {
    height: 40,
    borderColor: "#C0C0C0",
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 20,
  },
  sectionViewInput: {
    padding: "5%",
    flex: 1
  },
  sectionButtonInput: {
    backgroundColor: "#8A2BE2",
    borderRadius: 15,
    height: 45,
    justifyContent: "center",
  },
  sectionText: {
    height: 25,
    fontSize: 20
  }

});