import { Component } from 'react';
import { Alert } from 'react-native';
import { validate } from 'graphql';
import validateServer from "./validateServer";
import {AsyncStorage} from 'react-native';

interface LoginState {
    emailInput: string,
    passwordInput: string
}

const reEmail:RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const rePassword:RegExp = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z$*&@#]{7,}$/;

const loginToken = async () => {

    let userId = '';
    try {

      userId = await AsyncStorage.getItem('userId') || 'none';
    
    } catch (error) {
    
      console.log(error.message);
    
    }
    
    return userId;
}

const registerToken = async (token : string) => {
                       
    try {
        await AsyncStorage.setItem('userId', token);

    } catch (error) {
        console.log(error.message);
    
    }
};

function validateLoginInput (inputLoginState : LoginState) {

    //Caso seja necessario logar, fiz uns testes e funcionou fechei e abrir o app e deu baum
    //loginToken();

    const email : string = inputLoginState.emailInput;
    const password : string = inputLoginState.passwordInput;

    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    //Aparentemente esse é o tipo do regex https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp

    let isEmailValid : boolean = reEmail.test(String(email).toLowerCase()) ;
    let isPasswordValid : boolean = rePassword.test(password);

    if ( isPasswordValid && isEmailValid) {

        validateServer(email, password)
            .then(result => {
            
                const token : string = result.data.login.token;
            
                Alert.alert("Login feito com sucesso!");
                registerToken(token);    
            
            })
            .catch((erro) => {

                // Eu acredito estar feio mas ele pediu uma mensagem do que eu recebi do server , então seria isso?
                const typeError : string = JSON.stringify(erro.graphQLErrors);
                Alert.alert(typeError);
                
            })
        
    }else if(isPasswordValid){
    
        Alert.alert("Email inválido");
    
    }else if(isEmailValid){
    
        Alert.alert("Senha inválida");
    
    }else{

        Alert.alert("Senha e usuario inválidos");
    
    }

}


export default validateLoginInput;