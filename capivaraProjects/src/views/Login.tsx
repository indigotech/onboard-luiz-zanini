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
import { validateRegex } from '../validate/regexValidation';
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

class Login extends React.Component<{}, LoginState>{

  validate: validateRegex;

  constructor(props: any) {

    super(props);

    this.validate = new validateRegex();
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
          style={this.inputStyle('Email')}
          onChangeText={this.changeTextInputEmail}
        />
        <Text style={styles.sectionText} >Senha</Text>
        <TextInput
          secureTextEntry={true}
          style={this.inputStyle('Password')}
          onChangeText={this.changeTextInputPassword}
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

  private inputStyle(typeOfInput : string): any {

    let isValidStyle : boolean;
    typeOfInput == 'Email' ? isValidStyle = this.state.isEmailValid : isValidStyle = this.state.isPasswordValid;

    if (isValidStyle) {
      return {
        height: 40,
        borderColor: '#C0C0C0',
        borderWidth: 2,
        borderRadius: 15,
        marginBottom: 20,
      }
    }

    return {
      height: 40,
      borderColor: '#ff9090',
      borderWidth: 2,
      borderRadius: 15,
      marginBottom: 20,
    }

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

    this.setState({
      isEmailValid: validacaoInput.isEmailValid,
      isPasswordValid: validacaoInput.isPasswordValid,
    });

    if(!validacaoInput.isEmailValid || !validacaoInput.isPasswordValid){
      return;
    }

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

  private changeTextInputEmail = (text) =>{
    
    this.setState({ emailInput: text });
    if (!this.state.isEmailValid) {
      this.setState({ isEmailValid: this.validate.Email(text) });
    }
  }

  private changeTextInputPassword = (text) =>{
    
    this.setState({ passwordInput: text });
    if (!this.state.isPasswordValid) {
      this.setState({ isPasswordValid: this.validate.Password(text) });
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

export default Login;