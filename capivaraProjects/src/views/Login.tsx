import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Button,
  ActivityIndicator
} from 'react-native';

import React, { Component } from 'react';
import validateLoginInput from "../validate/validateLoginInput";
import { getToken } from '../validate/getToken';
import { Navigation } from 'react-native-navigation';

interface LoginState {
  emailInput: string,
  passwordInput: string
  pressButton: boolean
}

class Login extends React.Component<{}, LoginState>{

  constructor(props: any) {

    super(props);

    this.state = {
      emailInput: "",
      passwordInput: "",
      pressButton: false
    };

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

  componentDidMount() {

    getToken()
      .then(result => {
        if (result != 'none') {
          this.acessHomePage()
        }
      })
      .catch(erro => console.log(erro));

  }


  render() {
    return (
      <View style={styles.sectionViewInput}>
        <Text style={styles.sectionText}>E-mail</Text>
        <TextInput
          style={styles.sectionTextInput}
          onChangeText={(text) => this.setState({ emailInput: text })}
        />
        <Text style={styles.sectionText} >Senha</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.sectionTextInput}
          onChangeText={(text) => this.setState({ passwordInput: text })}
        />
        <View style={styles.sectionButtonInput}>
          { this.state.pressButton ? 
          <ActivityIndicator size="small" color="#0000ff"/> :
          <Button
            color="#FFFFFF"
            onPress={() => { 

              this.setState({pressButton : true});
              validateLoginInput(this.state, this.acessHomePage)
              
              setTimeout(() => { 
                this.setState({pressButton : false});
              }, 1000);

            }}
            title= 'login'
          >
          </Button>}
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