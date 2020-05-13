import {
    TextInput,
    StyleSheet,
    View,
    Text,
    Button,
    ActivityIndicator,
} from 'react-native';
import React, { Component } from 'react';
import {validateRegex} from '../validate/regexValidation';

interface AddUserState {
    idInput : string,
    nameInput : string,
    phoneInput : string,
    birthDateInput : string,
    emailInput: string,
    passwordInput: string,
    roleInput: string,
    loading: boolean,
    idIsValid : boolean,
    nameIsValid : boolean,
    phoneIsValid : boolean,
    birthDateIsValid : boolean,
    emailIsValid: boolean,
    passwordIsValid : boolean,
    roleIsValid : boolean
}

const styleValid  : any = {
    height: 40,
    borderColor: "#C0C0C0",
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 20,
}

const styleInValid  : any = {
    height: 40,
    borderColor: '#ff9090',
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 20,
}

export class addUser extends React.Component<{},AddUserState>{

    validate = new validateRegex();

    constructor(props : any){
        super(props);
    
        this.state = {
            idInput : '',
            nameInput : '',
            phoneInput : '',
            birthDateInput : '',
            emailInput : '',
            passwordInput : '',
            roleInput : '',
            loading : false,
            idIsValid : true,
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
                
                <Text>Id</Text>
                <TextInput
                    style ={this.changesStyleInput('Id')}
                    onChangeText={(text) => this.changeStringInput(text,'Id')}
                />
                <Text>Nome</Text>
                <TextInput
                    style ={this.changesStyleInput('Name')}
                    onChangeText={(text) => this.changeStringInput(text,'Name')}
                />
                <Text>Phone</Text>
                <TextInput
                    style ={this.changesStyleInput('Phone')}
                    onChangeText={(text) => this.changeStringInput  (text,'Phone')}
                    defaultValue={'(##) ##### ####'}
                />
                <Text>Data de Aniversário</Text>
                <TextInput
                    style ={this.changesStyleInput('DateBirth')}
                    onChangeText={(text) => this.changeStringInput(text,'DateBirth')}
                    defaultValue={'dd/mm/yyyy'}
                />
                <Text>E-mail</Text>
                <TextInput
                    style ={this.changesStyleInput('Email')}
                    onChangeText={(text) => this.changeStringInput(text,'Email')}
                />
                <Text>Senha</Text>
                <TextInput
                    style ={this.changesStyleInput('password')}
                    onChangeText={(text) => this.changeStringInput(text,'password')}
                    secureTextEntry={true}
                />
                <Text>Role</Text>
                <TextInput
                    style ={this.changesStyleInput('Role')}
                    onChangeText={(text) => this.changeStringInput(text,'Role')}
                />
                <View style={styles.sectionButtonInput}>
                    {this.state.loading ?
                    <ActivityIndicator size="small" color="#0000ff" /> :
                    <Button
                    color="#FFFFFF"
                    onPress={this.checkInput}
                    title='finish'
                    >
                    </Button>}
                </View>
            </View>
        );
    }

    private checkInput = () =>{

        this.setState( { idIsValid : this.validate.Id(this.state.idInput)} );
        this.setState( { phoneIsValid : this.validate.Phone(this.state.phoneInput)} );
        this.setState( { emailIsValid : this.validate.Email(this.state.emailInput)} );
        this.setState( { birthDateIsValid : this.validate.dateBirth(this.state.birthDateInput)} );
        this.setState( { nameIsValid : this.validate.Name(this.state.nameInput)} );
        this.setState( { passwordIsValid : this.validate.Password(this.state.passwordInput)} );
        this.setState( { roleIsValid : this.validate.Name(this.state.roleInput)} );

        if(this.state.idIsValid && this.state.phoneIsValid && this.state.emailIsValid && this.state.birthDateIsValid){
            return true;
        }
        return false;

    }

    private changeStringInput(text : string,typeOfInput : string){

        switch(typeOfInput){
            case 'Id' :
                this.setState({idInput : text});
                
                if (!this.state.idIsValid) {
                    this.setState( { idIsValid : this.validate.Id(text)} );
                }

                break;
            case 'Name' :
                this.setState({nameInput : text});

                if (!this.state.nameIsValid) {
                    this.setState( { nameIsValid : this.validate.Name(text)} );
                }

                break;
            case 'Phone' :
                this.setState({phoneInput : text});

                if (!this.state.phoneIsValid) {
                    this.setState( { phoneIsValid : this.validate.Phone(text)} );
                }

                break;
            case 'Email' :
                this.setState({emailInput : text})

                if (!this.state.emailIsValid) {
                    this.setState( { emailIsValid : this.validate.Email(text)} );
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
                    this.setState( { passwordIsValid : this.validate.Password(text)} );
                }

                break;
            case 'Role':
                this.setState({roleInput : text})
                
                if (!this.state.roleIsValid) {
                    this.setState( { roleIsValid : this.validate.UserRole(text)} );
                }

                break;
        }
    }

    private changesStyleInput(typeOfInput : string){

        switch(typeOfInput){
            case 'Id' :
                if(this.state.idIsValid){
                    return styleValid;
                }
                return styleInValid;
            case 'Name' :
                if(this.state.nameIsValid){
                    return styleValid;
                }
                return styleInValid;    
            case 'Phone' :
                if(this.state.phoneIsValid){
                    return styleValid;
                }
                return styleInValid;
            case 'Email' :
                if(this.state.emailIsValid){
                    return styleValid;
                }
                return styleInValid;
            case 'DateBirth':
                if(this.state.birthDateIsValid){
                    return styleValid;
                }
                return styleInValid;
            case 'password':
                if(this.state.passwordIsValid){
                    return styleValid;
                }
                return styleInValid;
            case 'Role':
                if(this.state.roleIsValid){
                    return styleValid;
                }
                return styleInValid;
        }

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
