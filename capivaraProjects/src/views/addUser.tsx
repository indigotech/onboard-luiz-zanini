import {
    TextInput,
    StyleSheet,
    View,
    Text,
    Button,
    ScrollView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import React, { Component } from 'react';
import {ValidateRegex} from '../validate/regexValidation';
import {createUser} from '../apolloConfig/createUser';

interface AddUserState {
    idInput : string,
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

interface User {
    name : string,
    phone : string,
    dateBirth : string,
    email : string,
    password : string,
    role : string,
}

export class addUser extends React.Component<{},AddUserState>{

    validate = new ValidateRegex();

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
                    style ={[styles.borderInput ,this.decideBorderStyle(this.state.nameIsValid)]}
                    onChangeText={(text) => this.changeStringInput(text,'Name')}
                />
                <Text>Phone</Text>
                <TextInput
                    style ={[styles.borderInput ,this.decideBorderStyle(this.state.phoneIsValid)]}
                    onChangeText={(text) => this.changeStringInput  (text,'Phone')}
                    defaultValue={'(##) ##### ####'}
                />
                <Text>Data de Aniversário</Text>
                <TextInput
                    style ={[styles.borderInput ,this.decideBorderStyle(this.state.birthDateIsValid)]}
                    onChangeText={(text) => this.changeStringInput(text,'DateBirth')}
                    defaultValue={'dd/mm/yyyy'}
                />
                <Text>E-mail</Text>
                <TextInput
                    style ={[styles.borderInput ,this.decideBorderStyle(this.state.emailIsValid)]}
                    onChangeText={(text) => this.changeStringInput(text,'Email')}
                />
                <Text>Senha</Text>
                <TextInput
                    style ={[styles.borderInput ,this.decideBorderStyle(this.state.passwordIsValid)]}
                    onChangeText={(text) => this.changeStringInput(text,'password')}
                    secureTextEntry={true}
                />
                <Text>Role</Text>
                <TextInput
                    style ={[styles.borderInput ,this.decideBorderStyle(this.state.roleIsValid)]}
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

        if(this.checkInputState()){
            
            const DateFormat : string = this.dateFormat();
            console.log(DateFormat);
            const newUser : User = {
                 name : this.state.nameInput,
                 phone : this.state.phoneInput,
                 email : this.state.emailInput,
                 dateBirth : DateFormat,
                 password : this.state.passwordInput,
                 role : this.state.roleInput,
            }

            this.createUserInServer(newUser);
            return;
        }   
        
        Alert.alert("Campos inválidos")


    }

    private checkInputState() : boolean{
        return this.validate.phone(this.state.phoneInput) && this.validate.email(this.state.emailInput) && this.validate.dateBirth(this.state.birthDateInput)
        && this.validate.name(this.state.nameInput) && this.validate.password(this.state.passwordInput) && this.validate.name(this.state.roleInput);
    }

    private dateFormat() : string{

        const birthDateSplit : string[] = this.state.birthDateInput.split('/');
        if((+birthDateSplit[1])< 10 ){
            return (birthDateSplit[2]+'-0'+(+birthDateSplit[1])+'-'+birthDateSplit[0])
        }
        return (birthDateSplit[2]+'-'+(+birthDateSplit[1])+'-'+birthDateSplit[0]);
            
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

    private decideBorderStyle(typeOfStyle : boolean) : any{
        
        return typeOfStyle ? {borderColor : '#C0C0C0'} : {borderColor : '#ff9090' };

    }

    private async createUserInServer(newUser : User) : Promise<void>{
        try{
            
            const dados : any= await createUser(newUser);

            Alert.alert('Usuário criado com sucesso!');
            
        }catch(error){

            if(error.graphQLErrors[0] == undefined){
                Alert.alert('Problema de conexão com o servidor');
                return;
            }
            Alert.alert(error.graphQLErrors[0].message);

        }

    }
}

const styles = StyleSheet.create({
    borderInput : {
        height: 40,
        borderWidth: 2,
        borderRadius: 15,
        marginBottom: 20,
    },
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
