import client from '../apolloConfig/apollo';
import { gql } from 'apollo-boost';
import { Alert } from 'react-native';
import { validate } from 'json-schema';

function validateServer(email: string, password : string){

    // Eu ia usar variaveis auxiliares($email, $password), mas n encontrei a documentacao utilizando nesse formato, apenas useQuery.
    return (
        client.mutate({
            mutation: gql`
                mutation login {
                    login(data : {email : "${email}", password : "${password}"}) {
                    token
                    user {
                        id
                    }
                    }
                }
                `
            })
    )
}

export default validateServer;