import {
    TextInput,
    StyleSheet,
    View,
    Text,
    Button,
    ActivityIndicator,
} from 'react-native';
import React, { Component } from 'react';
import {ValidateRegex} from '../validate/regexValidation';

interface AddUserState {
    nameInput : string,
    phoneInput : string,
    birthDateInput : string,
    emailInput: string,
    passwordInput: string,
    roleInput: string,
    loading: boolean,
    nameIsValid : boolean,
    phoneIsValid : boolean,
    birthDateIsValid : boolean,
    emailIsValid: boolean,
    passwordIsValid : boolean,
    roleIsValid : boolean
}

const styleBorder  : any = {
    height: 40,
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 20,
    borderColor: "#C0C0C0",
}


export class addUser extends React.Component<{},AddUserState>{

    validate = new ValidateRegex();

    constructor(props : any){
        super(props);
    
        this.state = {
            nameInput : '',
            phoneInput : '',
            birthDateInput : '',
            emailInput : '',
            passwordInput : '',
            roleInput : '',
            loading : false,
            nameIsValid : true,
            phoneIsValid : true,
            birthDateIsValid : true,
            emailIsValid : true,
            passwordIsValid : true,
            roleIsValid : true,
        }
    }

    render(){
        return(
            <View style={styles.sectionViewInput}>
                <Text>Nome</Text>
                <TextInput
                    style ={this.decideStyle(this.state.nameIsValid)}
                    onChangeText={(text) => this.changeStringInput(text,'Name')}
                />
                <Text>Phone</Text>
                <TextInput
                    style ={this.decideStyle(this.state.phoneIsValid)}
                    onChangeText={(text) => this.changeStringInput  (text,'Phone')}
                    defaultValue={'(##) ##### ####'}
                />
                <Text>Data de Aniversário</Text>
                <TextInput
                    style ={this.decideStyle(this.state.birthDateIsValid)}
                    onChangeText={(text) => this.changeStringInput(text,'DateBirth')}
                    defaultValue={'dd/mm/yyyy'}
                />
                <Text>E-mail</Text>
                <TextInput
                    style ={this.decideStyle(this.state.emailIsValid)}
                    onChangeText={(text) => this.changeStringInput(text,'Email')}
                />
                <Text>Senha</Text>
                <TextInput
                    style ={this.decideStyle(this.state.passwordIsValid)}
                    onChangeText={(text) => this.changeStringInput(text,'password')}
                    secureTextEntry={true}
                />
                <Text>Role</Text>
                <TextInput
                    style ={this.decideStyle(this.state.roleIsValid)}
                    onChangeText={(text) => this.changeStringInput(text,'Role')}
                />
                <View style={styles.sectionButtonInput}>
                    {this.state.loading ?
                    <ActivityIndicator size="small" color="#0000ff" /> :
                    <Button
                    color="#FFFFFF"
                    onPress={this.handleButtonPress}
                    title='finish'
                    >
                    </Button>}
                </View>
            </View>
        );
    }

    private handleButtonPress = () =>{

        this.setState({ 
                        phoneIsValid       : this.validate.phone(this.state.phoneInput),
                        emailIsValid       : this.validate.email(this.state.emailInput),
                        birthDateIsValid   : this.validate.dateBirth(this.state.birthDateInput),
                        nameIsValid        : this.validate.name(this.state.nameInput),
                        passwordIsValid    : this.validate.password(this.state.passwordInput),
                        roleIsValid        : this.validate.name(this.state.roleInput), 
                    });

        return  this.state.phoneIsValid && this.state.emailIsValid && this.state.birthDateIsValid  && this.state.passwordIsValid && this.state.roleIsValid;

    }

    private changeStringInput(text : string,typeOfInput : string){

        switch(typeOfInput){
            case 'Name' :
                this.setState({nameInput : text});

                if (!this.state.nameIsValid) {
                    this.setState( { nameIsValid : this.validate.name(text)} );
                }

                break;
            case 'Phone' :
                this.setState({phoneInput : text});

                if (!this.state.phoneIsValid) {
                    this.setState( { phoneIsValid : this.validate.phone(text)} );
                }

                break;
            case 'Email' :
                this.setState({emailInput : text})

                if (!this.state.emailIsValid) {
                    this.setState( { emailIsValid : this.validate.email(text)} );
                }

                break;
            case 'DateBirth':
                this.setState({birthDateInput : text})
                
                if (!this.state.birthDateIsValid) {
                    this.setState( { birthDateIsValid : this.validate.dateBirth(text)} );
                }

                break;
            case 'password':
                this.setState({passwordInput : text})
                
                if (!this.state.passwordIsValid) {
                    this.setState( { passwordIsValid : this.validate.password(text)} );
                }

                break;
            case 'Role':
                this.setState({roleInput : text})
                
                if (!this.state.roleIsValid) {
                    this.setState( { roleIsValid : this.validate.userRole(text)} );
                }

                break;
        }
    }

    private decideStyle(typeOfStyle : boolean){

        if(typeOfStyle){
            styleBorder.borderColor = '#ff9090';
        }
        return styleBorder;
    }

}

const styles = StyleSheet.create({
    sectionTextInput: {
        height: 40,
        borderColor: "#C0C0C0",
        borderWidth: 2,
        borderRadius: 15,
        marginBottom: 20,
    },
    sectionButtonInput: {
        backgroundColor: "#8A2BE2",
        borderRadius: 15,
        height: 45,
        justifyContent: "center",
    },
    sectionViewInput: {
        padding: "5%",
        flex: 1
    },
});
