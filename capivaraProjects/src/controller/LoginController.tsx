import React, { Component } from 'react';
import { Alert } from 'react-native';

type stateLogin = {
    emailInput: string,
    senhaInput: string
}

const LoginController = (resultados:stateLogin) => {

    var email : string = resultados.emailInput;
    var senha : string = resultados.senhaInput;
    var inputValido : boolean;

    console.log(resultados);

    inputValido = true; 

    // Copiei esse link do stack overflow, eu ja imaginava usar regex mas achei no stackoverflow entao acredito ser melhor 
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    // Eu fiz uma pequena modificação no final , pois ele aceitava .br .co etc. agora ele deve aceitar apenas .com

    //Aparentemente esse é o tipo do regex https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp
    var reEmail:RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)com))$/;
    var reSenha:RegExp = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z$*&@#]{7,}$/

    if( !reEmail.test(String(email).toLowerCase()) && !reSenha.test(String(senha).toLowerCase()) ){
        Alert.alert("Formato de email inválido e senha inválidos");
        inputValido = false;
    }

    if(!reEmail.test(String(email).toLowerCase())){
        Alert.alert("Email inválido");
        inputValido = false;
    }
    
    if(!reSenha.test(String(senha).toLowerCase())){
        Alert.alert("Senha inválida");
        inputValido = false;
    }

    if(inputValido)
        Alert.alert("Senha e usuário válidos!");
    

}


export default LoginController;