import { gql } from 'apollo-boost';
import { getToken } from '../storage/getToken';
import ApolloClient from 'apollo-boost';
interface User{
    id: number;
    name: string;
    email: string;
}

type ListUser = User[];

interface QueryListUsers {
    users : {
        nodes : ListUser
    }
}

const queryUsers = gql`
    query users($pageInfo: PageInputType){
        users(pageInfo : $pageInfo){
        nodes{
            id
            name
            email
        }
        }
    }
`;


export async function getUserList() : Promise<ListUser> {

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
    
    return query.data?.users.nodes;

}

