import { gql } from 'apollo-boost';
import { getToken } from '../storage/getToken';
import ApolloClient from 'apollo-boost';

interface QueryListUsers {
    users : {
        nodes : User[]
    }
}

interface User{
    id: number;
    name: string;
    email: string;
}

const queryUsers = gql`
    query users {
        users(pageInfo : {offset : 0, limit : 10}){
        nodes{
            id
            name
            email
        }
        }
    }
`;


export async function getUserList() : Promise<User[]> {

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

    const query = await client.query<QueryListUsers>({
        query: queryUsers
    })

    console.log(query.data?.users.nodes);

    return query.data?.users.nodes;

}

