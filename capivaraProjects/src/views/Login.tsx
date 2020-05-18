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
import {ButtonStyle} from '../components/Button';
import {FormField} from '../components/FormField';

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
        <FormField
          title={'Email'}
          validate = {this.validate.email}
          handleText = {this.handleChangeInputEmail}
          inputText = {this.state.emailInput}
        />
        <FormField
          title={'Senha'}
          validate = {this.validate.password}
          handleText = {this.handleChangeInputPassword}
          inputText = {this.state.passwordInput}
          password = {true}
        />
        <ButtonStyle 
          title='Login' 
          pressButton={this.handleButtonTap} 
          loading={this.state.loading} 
        />
      </View>
    );
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

  private handleChangeInputEmail = (text) =>{
    this.setState({ emailInput: text });
  }

  private handleChangeInputPassword = (text) =>{
    this.setState({ passwordInput: text });
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