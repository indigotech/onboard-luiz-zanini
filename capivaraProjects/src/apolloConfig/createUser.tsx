import { gql } from 'apollo-boost';
import { getToken } from '../storage/getToken';
import ApolloClient from 'apollo-boost';

interface User {
    name : string,
    phone : string,
    birthDate : string,
    email : string,
    password : string,
    role : string,
}
interface MutationCreateUser {
    createUser : {
        name : string,
        email : string,
    }
}

const mutateCreateUser = gql`
    mutation createUser($data : UserInputType!) {
        createUser( data : $data){
            id
            name
            phone
            birthDate
            email
            role
        }
    }
`;

export async function createUser(user : User) : Promise<any> {

    const token = await getToken();
    const client = new ApolloClient({
        uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
        request: (operation) => {
            operation.setContext({
                headers: {
                    authorization: token
                }
            })
        }
    });

    user.role = user.role.toLowerCase();

    const query = await client.mutate<MutationCreateUser>({
        mutation: mutateCreateUser,
        variables : {
            data : user,
        }
    })

    return query;

}

