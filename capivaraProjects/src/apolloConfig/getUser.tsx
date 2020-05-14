import { gql } from 'apollo-boost';
import { getToken } from '../storage/getToken';
import ApolloClient from 'apollo-boost';
import {UserInterface} from '../interface/userInterface';

interface QueryUser {
    data : {
        user : UserInterface
    }
}

const queryUser = gql`
    query user($id: ID!){
        user(id : $id){
        id
        name
        phone
        birthDate
        email
        role
        }
    }
`;


export async function getUser(idUser : number) : Promise<QueryUser> {

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

    const query = await client.query<QueryUser>({
        query: queryUser,
        variables : {
            id : idUser
        }
    })

    return query.data;
}

