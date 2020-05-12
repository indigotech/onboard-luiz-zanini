import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    Alert,
} from 'react-native';

import React, { Component, useDebugValue } from 'react';
import { getUserList } from '../apolloConfig/getUserList';

interface User {
    id : number,
    name : string,
    email : string,
}

type ListUser = User[];

interface UsersListState{
    users : ListUser,
    errorData : boolean
}

export class UserList extends React.Component<{},UsersListState>{

    constructor(props : any){
        
        super(props);

        this.state = {
            users : [],
            errorData : false,
        }

    }

    render(){
        return(
            <View style ={styles.sectionContainer}>
                {this.state.errorData ? 
                <Text> Falha no carregamento dos dados.</Text> :
                <FlatList
                    data = {this.state.users} 
                    renderItem= {this.renderItems}
                    keyExtractor = {(item) => 'key'+item.id}
                />
                }
            </View>
        );
    };

    componentDidMount(){
        this.getUsers()
            .then((result : ListUser) => this.setState({users : result}) )
            .catch(() => this.setState({errorData : true}) )
    }   

    private async getUsers() : Promise<ListUser>{ 
        
        const data : ListUser = await getUserList();
        return data;

    }

    private renderItems = ( {item} : any) => (
        <View style = {styles.sectionUsuario} >
            <Text style={styles.textName}>{item.name}</Text>
            <Text style={styles.textEmail}>{item.email}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        padding: "5%",
        flex: 1,
    },
    textName :{
        fontWeight: 'bold',
        fontSize : 18,
        borderTopWidth : 4,
    },
    textEmail : {
        fontSize : 16,
        textAlign : 'center',
        color: '#BCBEC0',
        fontStyle: 'italic',
        marginTop: 20
    },
    sectionUsuario : {
        padding: '5%',
        height: 100 ,
        margin: 7,
        backgroundColor: '#FFFFFF',
        borderRadius: 4
    }

});