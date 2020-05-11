import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    Alert,
} from 'react-native';

import React, { Component } from 'react';
import { getUserList } from '../apolloConfig/getUserList';

interface ListUser {
    id : number,
    name : string,
    email : string,
}

interface UsersListState{
    usuarios : ListUser[]
}

export class UserList extends React.Component<{},UsersListState>{

    constructor(props : any){
        
        super(props);

        this.state = {
            usuarios : []
        }
    }

    render(){
        return(
            <View style ={styles.sectionContainer}>
                {this.componentWillMount()}
            </View>
        );
    };

    componentWillMount(){
        
        this.getUsers();

        if(this.state.usuarios == []){
            <View style = {styles.sectionUsuario} >
                <Text style={styles.textName}>Erro com a conexão do servidor</Text>
            </View>
        }

        return (
            <FlatList
                data = { this.state.usuarios} 
                renderItem= {this.renderItems}
                keyExtractor = {(item) => 'key'+item.id}
            />
        )
    }

    private async getUsers() { 
        
        try {
            const dados  = await getUserList();
            this.setState({usuarios : dados})
        }catch(error){
            Alert.alert('erro no carregamento dos usuários');
            return error;
        }
    
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