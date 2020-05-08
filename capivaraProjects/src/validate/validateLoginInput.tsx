import { Alert } from 'react-native';
import validateServer from "./validateServer";
import { registerToken } from './registerToken';
import { navigateHome } from '../navigation/navigateHome';

interface LoginState {
    emailInput: string,
    passwordInput: string
}

const reEmail: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const rePassword: RegExp = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z$*&@#]{7,}$/;


function validateLoginInput(inputLoginState: LoginState) {

    //Caso seja necessario logar, fiz uns testes e funcionou fechei e abrir o app e deu baum
    //loginToken();

    const email: string = inputLoginState.emailInput;
    const password: string = inputLoginState.passwordInput;

    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    //Aparentemente esse é o tipo do regex https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp

    let isEmailValid: boolean = reEmail.test(String(email).toLowerCase());
    let isPasswordValid: boolean = rePassword.test(password);

    if (isPasswordValid && isEmailValid) {

        validateServer(email, password)
            .then(result => {

                const token: string = result.data.login.token;
                registerToken(token);
                navigateHome();

            })
            .catch((erro) => {

                // Eu acredito estar feio mas ele pediu uma mensagem do que eu recebi do server , então seria isso?
                const typeError: string = JSON.stringify(erro.graphQLErrors);
                Alert.alert(typeError);

            })

    } else if (isPasswordValid) {

        Alert.alert("Email inválido");

    } else if (isEmailValid) {

        Alert.alert("Senha inválida");

    } else {

        Alert.alert("Senha e usuário inválidos");

    }

}


export default validateLoginInput;