import { Alert } from 'react-native';
import signIn from "./signIn";
import {registerToken} from './registerToken';
import {validateRegex} from './regexValidation';

interface LoginState {
    emailInput: string,
    passwordInput: string
}
interface loginValidate {
    isEmailValid: boolean,
    isPasswordValid: boolean
}

function validateLoginInput(inputLoginState: LoginState, acessHomePage : any ) : loginValidate {

    const email: string = inputLoginState.emailInput;
    const password: string = inputLoginState.passwordInput;
    const validation = new validateRegex();

    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    //Aparentemente esse é o tipo do regex https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp

    const check : loginValidate = {
        isEmailValid : validation.Email(email),
        isPasswordValid : validation.Password(password)
    };

    if(check.isPasswordValid && check.isEmailValid) {

        signIn(email, password)
            .then( async (result : any) => {

                try {
                
                    const token: string = result.data.login.token;
                    await registerToken(token);                
                    acessHomePage();
                    
                }catch{

                    Alert.alert('Erro na criacao de token');

                }
            })
            .catch( (erro : any) => {

                // Eu acredito estar feio mas ele pediu uma mensagem do que eu recebi do server , então seria isso?
                const typeError: string = JSON.stringify(erro.graphQLErrors[0].message);
                Alert.alert(typeError);

            })

    } else if (check.isPasswordValid) {

        Alert.alert("Email inválido");

    } else if (check.isEmailValid) {

        Alert.alert("Senha inválida");

    } else {

        Alert.alert("Senha e usuário inválidos");

    }

    return check;

}


export default validateLoginInput;