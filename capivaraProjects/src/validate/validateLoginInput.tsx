import { Component } from 'react';
import { Alert } from 'react-native';

interface LoginState {
    emailInput: string,
    passwordInput: string
}

const reEmail:RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const rePassword:RegExp = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z$*&@#]{7,}$/;

function validateLoginInput (inputLoginState : LoginState) {

    const email : string = inputLoginState.emailInput;
    const password : string = inputLoginState.passwordInput;

    // Copiei esse link do stack overflow, eu ja imaginava usar regex mas achei no stackoverflow entao acredito ser melhor 
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    // Eu fiz uma pequena modificação no final , pois ele aceitava .br .co etc. agora ele deve aceitar apenas .com

    //Aparentemente esse é o tipo do regex https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp

    let isEmailValid : boolean = reEmail.test(String(email).toLowerCase()) ;
    let isPasswordValid : boolean = rePassword.test(password);

    if ( isPasswordValid && isEmailValid) {
    
        Alert.alert("Senha e usuário válidos !");
    
    }else if(isPasswordValid ){
    
        Alert.alert("Senha inválida");
    
    }else if(isEmailValid){
    
        Alert.alert("Email inválido");
    
    }else{

        Alert.alert("Senha e usuario inválidos");
    
    }

}


export default validateLoginInput;