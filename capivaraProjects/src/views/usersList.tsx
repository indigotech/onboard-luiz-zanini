import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    Alert,
    Button,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';

import React, { Component, useDebugValue } from 'react';
import { getUserList } from '../apolloConfig/getUserList';
import { Navigation } from 'react-native-navigation';

interface User {
    id : number,
    name : string,
    email : string,
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
interface UsersListState{
    users : ListUser,
    errorData : boolean,
    loadButton : boolean,
    loadMoreButton : boolean,
}

export class UserList extends React.Component<{},UsersListState>{

    constructor(props : any){
        
        super(props);

        this.state = {
            users : [],
            errorData : false,
            loadButton : false,
            loadMoreButton : true,
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
                        {this.state.loadMoreButton ?
                            this.state.loadButton ?
                            <ActivityIndicator style ={styles.activityLoadButton} color="#0000ff" /> :
                            <Button
                                title = 'Load More'
                                onPress = {this.renderMoreItems}
                                color = "#FFFFFF"
                            />
                            :<View></View>
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
            
            await this.addUsersState();
            
        }catch{
            this.setState({errorData : true})
        }

    }

    private renderMoreItems = async () => {

        try{
        
            this.setState({ loadButton : true })
            await this.addUsersState();
        
        }
        catch{
            this.setState({errorData : true});
        }
        finally{
            this.setState({ loadButton : false });
        }

    }

    private async addUsersState() {

        const queryUsers : QueryListUsers = await getUserList(this.state.users.length);
        const newDataUsers : ListUser = queryUsers.users.nodes;
        const hasNextPage : boolean = queryUsers.users.pageInfo.hasNextPage;
        this.setState({ 
            users : this.state.users.concat(newDataUsers) , 
            loadMoreButton : hasNextPage
        });
    
    }

    private renderItems = ( {item} : any) => (
        <TouchableOpacity activeOpacity = { .5 } onPress={() => {this.acessUserPage(item.id)}}>
            <View style = {styles.sectionUser} >
                <View style = {styles.sectionImageUser}>
                    <Image
                        style = {styles.ImageUser}
                        source={require('../images/user-icon-vector.jpg')}
                    />
                </View>
                <View style = {styles.sectionTextUser}>
                    <Text style={styles.textName}>{item.name}</Text>
                    <Text style={styles.textEmail}>{item.email}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )


    private acessUserPage (idUser : number) : void{

        Navigation.push('Home', {
            component: {
              id: 'User',
              name: 'User',
              passProps : {
                id : idUser
              },
              options: {
                topBar: {
                  title: {
                    text: 'Usuário'
                  }
                }
              }
            }
        });
        
    }
    
}

const styles = StyleSheet.create({
    sectionContainer: {
        padding: "5%",
        flex: 1,
    },
    sectionUser :{
        padding: '5%',
        height: 100 ,
        margin: 7,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        flexDirection : 'row',
    },  
    sectionTextUser : {
        width: '75%',
        padding : 4
    },
    sectionImageUser : {
        width: '20%'
    },
    ImageUser : { 
        height : 60,
        width : 60,
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
    activityLoadButton : {
        height : 37 
    }
});