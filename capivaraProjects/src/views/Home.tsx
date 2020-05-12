import {
    TextInput,
    StyleSheet,
    View,
    Text,
    Button,
    ScrollView,
    Alert
} from 'react-native';

import React, { Component } from 'react';
import { deleteToken } from '../storage/deleteToken';
import { Navigation } from "react-native-navigation";
import { UserList } from './usersList';
import { getUserList } from '../apolloConfig/getUserList';

export class Home extends React.Component {

    constructor(props: any) {

        super(props);
    }

    render() {
        return (
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
                        <UserList/>
                    </View>
                </View>
            </ScrollView>
        );
    }

    private logOut = async () => {

        try {

            await deleteToken();
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
        catch{

            Alert.alert('Problemas para deslogar');

        }

    }
    
}


const styles = StyleSheet.create({
    sectionContaineir: {
        flex: 1,
        backgroundColor: '#dcdcdc',
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
});