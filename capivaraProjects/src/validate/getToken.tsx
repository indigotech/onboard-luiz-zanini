
import {AsyncStorage} from 'react-native';

const Token = async () => {

    let userId = '';

    try {

      userId = await AsyncStorage.getItem('userId') || 'none';
    
    } catch (error) {
    
      console.log(error.message);
    
    }
    
    return userId;
}

export function getToken(){

    return (
        Token()
            .then( (result) =>{

                console.log(result);
                
                //Aqui eu posso mudar pra verificar se o servidor recebeu o token e esta correto, eu so nao implementei pq nao foi pedido
                if(result.length == 0){
                
                    return false;
                
                }

                return true;
            
            })
            .catch( erro => {

                console.log(erro)
                return false;

            })
    );
}