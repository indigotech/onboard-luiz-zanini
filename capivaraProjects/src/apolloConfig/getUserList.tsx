import { gql } from 'apollo-boost';
import { getToken } from '../storage/getToken';
import ApolloClient from 'apollo-boost';




interface QueryListUsers {
    users : {
        nodes : Array<ListUsers>
    }
}

interface ListUsers{
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


export async function getUserList() : Promise<Array<ListUsers>> {

    try {

        const token = await getToken();
        console.log(token);

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


        const dados = await client.query<QueryListUsers>({
            query: queryUsers
        })

        console.log(dados.data?.users.nodes);

        return dados.data?.users.nodes;
    }catch(error){
       
        console.log(error);
       return []

   }
   

}

