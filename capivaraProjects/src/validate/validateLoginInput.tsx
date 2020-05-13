import { Alert } from 'react-native';
import {ValidateRegex} from './regexValidation';

interface LoginState {
    emailInput: string,
    passwordInput: string
}
interface loginValidate {
    isEmailValid: boolean,
    isPasswordValid: boolean
}

export function validateLoginInput(inputLoginState: LoginState, acessHomePage : any ) : loginValidate {

    const email: string = inputLoginState.emailInput;
    const password: string = inputLoginState.passwordInput;
    const validation = new ValidateRegex();
    const check : loginValidate = {
        isEmailValid : validation.email(email),
        isPasswordValid : validation.password(password)
    };

   if (check.isPasswordValid && !check.isEmailValid) {

        Alert.alert("Email inválido");

    } else if (!check.isPasswordValid && check.isEmailValid) {

        Alert.alert("Senha inválida");

    } else if(!check.isPasswordValid  && !check.isPasswordValid){

        Alert.alert("Senha e usuário inválidos");

    }

    return check;
}


