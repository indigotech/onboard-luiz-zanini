import client from '../apolloConfig/apollo';
import { gql } from 'apollo-boost';

const mutateLogin = gql`
    mutation login($data: LoginInputType!) {
        login(data : $data) {
        token
        user {
            id
        }
        }
    }
`
function signIn(email: string, password : string){

    return (
        client.mutate({
            mutation: mutateLogin,
            variables : {
                data: { email, password }
            }
        })
    )

}

export default signIn; 
