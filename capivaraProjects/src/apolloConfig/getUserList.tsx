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
        nodes : ListUser,
        pageInfo :{
            hasNextPage: boolean
        }
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
        pageInfo{
            hasNextPage   
        }
        }
    }
`;


export async function getUserList(lengthListUsers : number) : Promise<QueryListUsers> {

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

    const offset : number = lengthListUsers;
    const limit : number = 10;

    const query = await client.query<QueryListUsers>({
        query: queryUsers,
        variables : {
            pageInfo : {offset,limit}
        }
    })

    return query.data;
}

