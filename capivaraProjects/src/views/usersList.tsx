import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    Alert,
    Button,
    ActivityIndicator,
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
    errorData : boolean,
    loadButton : boolean,
}

export class UserList extends React.Component<{},UsersListState>{

    constructor(props : any){
        
        super(props);

        this.state = {
            users : [],
            errorData : false,
            loadButton : false,
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
                    extraData = {this.state.users}
                />
                }
                <View style = {styles.viewButtonLoad}>
                    <View style = {styles.ButtonLoad} >
                        {this.state.loadButton ?
                        <ActivityIndicator style ={styles.activityLoadButton} color="#0000ff" /> :
                        <Button
                            title = 'Load More'
                            onPress = {this.renderMoreItems}
                            color = "#FFFFFF"
                        />
                        }   
                    </View>
                </View>
            </View>
        );
    };

    componentDidMount(){
        
        this.getUsers();

    }   

    private async getUsers() : Promise<void>{ 
        
        try{
            
            const dataUsers : ListUser = await getUserList(this.state.users);
            this.setState({users : dataUsers})

        }catch{
            this.setState({errorData : true})
        }

    }

    private renderMoreItems = async () => {

        try{
        
            this.setState({ loadButton : true })
            const newDataUsers :  ListUser = await getUserList(this.state.users);
            this.setState({ users : this.state.users.concat(newDataUsers)});
        
        }
        catch{
            this.setState({errorData : true});
        }
        finally{
            this.setState({ loadButton : false });
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
    viewButtonLoad :{
        alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonLoad :{
        marginTop: 10,
        width: 120,
        backgroundColor: "#8A2BE2",
        borderRadius: 7,
    },
    sectionUsuario : {
        padding: '5%',
        height: 100 ,
        margin: 7,
        backgroundColor: '#FFFFFF',
        borderRadius: 4
    },
    activityLoadButton : {
        height : 37 
    }
});