import {
    TextInput,
    StyleSheet,
    View,
    Text,
    Button
  } from 'react-native';
  
  import React, { Component } from 'react';
  import validateLoginInput from "../validate/validateLoginInput";
 
export class Home extends Component{

    constructor(props:any){
    
        super(props);
    
    }
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