import {
    TextInput,
    StyleSheet,
    View,
    Text,
    BackHandler
  } from 'react-native';

import React, { Component } from 'react';
import { deleteToken } from '../validate/deleteToken';
import { getToken } from '../validate/getToken';
import { Navigation } from "react-native-navigation"
 
export class Home extends Component{

    constructor(props:any){
    
        super(props);
    
    }
      
    // Se o usuário desfizer o Login
    render(){
        return(
            <View style = {styles.sectionView} > 
                <Text style = {styles.sectionText}>Bem vindo usuário!</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    sectionView: {
        padding: "5%",
        flex: 0.60,
        justifyContent: "center"
    },
    sectionText: {
        textAlign: 'center',
        fontSize: 32,
    },
});