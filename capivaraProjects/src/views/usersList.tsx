import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
  } from 'react-native';

const usuarios : ListUser[] = [
    {email : 'leandro@gmail.com' , name : 'Leandro'},
    {email : 'leandro@gmail.com' , name : 'Leandro'},
    {email : 'leandro@gmail.com' , name : 'Leandro'},
    {email : 'leandro@gmail.com' , name : 'Leandro'},
    {email : 'leandro@gmail.com' , name : 'Leandro'},
    {email : 'leandro@gmail.com' , name : 'Leandro'},
    {email : 'leandro@gmail.com' , name : 'Leandro'},
    {email : 'leandro@gmail.com' , name : 'Leandro'},
    {email : 'leandro@gmail.com' , name : 'Leandro'},
    {email : 'leandro@gmail.com' , name : 'Leandro'},
  ]
 
interface ListUser {
    name : string,
    email : string,
}

import React, { Component } from 'react';

export class UserList extends React.Component{

    constructor(props : any){
        
        super(props);

    }

    render(){
        return(
            <View style ={styles.sectionContainer}>
                <FlatList
                    data = {usuarios}
                    renderItem= {this.renderItems}
                    keyExtractor = {(item, index) => 'key'+index}
                />
            </View>
        );
    };

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