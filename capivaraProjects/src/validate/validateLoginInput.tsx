import { Alert } from 'react-native';
import signIn from "./signIn";
import { registerToken } from './registerToken';

interface LoginState {
    emailInput: string,
    passwordInput: string
}

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
//Aparentemente esse é o tipo do regex https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp

const reEmail: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const rePassword: RegExp = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z$*&@#]{7,}$/;


function validateLoginInput(inputLoginState: LoginState, acessHomePage : any) {

    const email: string = inputLoginState.emailInput;
    const password: string = inputLoginState.passwordInput;   
    
    let isEmailValid: boolean = reEmail.test(String(email).toLowerCase());
    let isPasswordValid: boolean = rePassword.test(password);

    if (isPasswordValid && isEmailValid) {

        signIn(email, password)
            .then( async (result : any) => {

                const token: string = result.data.login.token;
                try {
                    
                    await registerToken(token)
                    acessHomePage();

                }catch{

                    Alert.alert('Erro ao obter o token');

                }

            })
            .catch( (erro : any) => {

                const typeError: string = JSON.stringify(erro.graphQLErrors[0].message);
                Alert.alert(typeError);
                return false;
            
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