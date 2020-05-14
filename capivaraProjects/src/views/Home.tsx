import {
    TextInput,
    StyleSheet,
    View,
    Text,
    Button,
    ScrollView,
    Alert
} from 'react-native';

import React from 'react';
import { deleteToken } from '../storage/deleteToken';
import { Navigation } from "react-native-navigation";
import { UserList } from './usersList';

export class Home extends React.Component {

    constructor(props: any) {

        super(props);
    }

    render() {
        return (
            <View style = { styles.sectionViewHome}>
                <ScrollView>
                    <View style={styles.sectionContaineir}>
                        <View style={styles.sectionCabecalho}>
                            <View style={styles.sectionViewButton}>
                                <Button
                                    title={'LogOut'}
                                    onPress={this.logOut}
                                    color='#FFFFFF'
                                />
                            </View>
                        </View>
                        <View style={styles.sectionViewText} >
                            <UserList />
                        </View>
                    </View>
                </ScrollView>
                <View style = {styles.buttonAddMoreView}>
                    <Button
                        color='#FFFFFF'
                        onPress = {this.acesUserAddPage}
                        title = '+'
                    />
                </View>
            </View>
        );
    }



    private logOut = async () => {

        try {

            await deleteToken();
            this.acessLoginPage();

        }
        catch{
            Alert.alert('Problemas para deslogar');
        }
    }
    
    private acessLoginPage(){
        Navigation.push('Home', {
            component: {
                id: 'Login',
                name: 'Login',
                options: {
                    topBar: {
                        title: {
                            text: 'Login'
                        },
                        backButton: {
                            visible: false
                        }
                    }
                }
            }
        });
    }

    private acesUserAddPage() {

        Navigation.push('Home', {
          component: {
            id: 'User',
            name: 'addUser',
            options: {
              topBar: {
                title: {
                  text: 'Novo usuário'
                }
              }
            }
          }
        });
    
    }
    
}


const styles = StyleSheet.create({
    sectionViewHome :{
        backgroundColor: '#dcdcdc',
    },
    sectionContaineir: {
        flex: 1,
    },
    sectionViewText: {
        flex: 0.9,
        justifyContent: "center",
    },
    sectionCabecalho: {
        height: 60,
        flexDirection: 'row-reverse'
    },
    sectionViewButton: {
        height: 40,
        width: 100,
        borderRadius: 10,
        backgroundColor: 'black',
        margin: '2%'
    },
    sectionText: {
        textAlign: 'center',
        fontSize: 32,
    },
    buttonAddMoreView :{
        width: 50,  
        height: 50,   
        borderRadius: 30,
        backgroundColor : 'black',                                              
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 20,                                                    
        right: 20, 
    }
});