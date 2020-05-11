import {client} from './apollo';
import { gql } from 'apollo-boost';
import { registerToken } from '../storage/registerToken';

interface mutaType {
    login :{
        token : string;
        user : {
            id : string;
        }
    }
}

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
export async function signIn(email: string, password : string): Promise<void>{

    

    const dados = await client.mutate<mutaType>({
        mutation: mutateLogin,
        variables : {
            data: { email, password }
        }
    })

    const token : string = dados.data?.login.token;
    await registerToken(token);

}

