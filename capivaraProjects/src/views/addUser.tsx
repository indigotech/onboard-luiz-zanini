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
interface UserValidation {
    isNameValid : boolean,
    isPhoneValid : boolean,
    isBirthDateValid : boolean,
    isEmailValid : boolean,
    isPasswordValid : boolean,
    isRoleValid : boolean,
}
interface User {
    name : string,
    phone : string,
    birthDate : string,
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
                    onChangeText={(text) => this.handleChangeStringInput(text,'Name')}
                />
                <Text>Phone</Text>
                <TextInput
                    style ={[styles.borderInput ,this.decideBorderStyle(this.state.phoneIsValid)]}
                    onChangeText={(text) => this.handleChangeStringInput  (text,'Phone')}
                    defaultValue={'#########'}
                />
                <Text>Data de Aniversário</Text>
                <TextInput
                    style ={[styles.borderInput ,this.decideBorderStyle(this.state.birthDateIsValid)]}
                    onChangeText={(text) => this.handleChangeStringInput(text,'DateBirth')}
                    defaultValue={'dd/mm/yyyy'}
                />
                <Text>E-mail</Text>
                <TextInput
                    style ={[styles.borderInput ,this.decideBorderStyle(this.state.emailIsValid)]}
                    onChangeText={(text) => this.handleChangeStringInput(text,'Email')}
                />
                <Text>Senha</Text>
                <TextInput
                    style ={[styles.borderInput ,this.decideBorderStyle(this.state.passwordIsValid)]}
                    onChangeText={(text) => this.handleChangeStringInput(text,'password')}
                    secureTextEntry={true}
                />
                <Text>Role</Text>
                <TextInput
                    style ={[styles.borderInput ,this.decideBorderStyle(this.state.roleIsValid)]}
                    onChangeText={(text) => this.handleChangeStringInput(text,'Role')}
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

        const check : UserValidation = this.checkInputState();

        this.setState({ 
            phoneIsValid       : check.isPhoneValid,
            emailIsValid       : check.isEmailValid,
            birthDateIsValid   : check.isBirthDateValid,
            nameIsValid        : check.isNameValid,
            passwordIsValid    : check.isPasswordValid,
            roleIsValid        : check.isRoleValid, 
        });

        if(check.isBirthDateValid && check.isEmailValid && check.isNameValid && check.isPasswordValid && check.isPhoneValid && check.isRoleValid){
            
            const DateFormat : string = this.dateFormat();
            const newUser : User = this.createUserType(DateFormat);
            this.createUserInServer(newUser);

            return;
        }   
        
        Alert.alert("Campos inválidos")

    }

    private createUserType( date : string) : User {
        return ({
            name : this.state.nameInput,
            phone : this.state.phoneInput,
            email : this.state.emailInput,
            birthDate : date,
            password : this.state.passwordInput,
            role : this.state.roleInput,
       });
    }

    private checkInputState() : UserValidation{
        
        return  {
            isPhoneValid : this.validate.phone(this.state.phoneInput),
            isNameValid  : this.validate.name(this.state.nameInput),
            isEmailValid : this.validate.email(this.state.emailInput),
            isBirthDateValid : this.validate.dateBirth(this.state.birthDateInput),
            isPasswordValid  : this.validate.password(this.state.passwordInput),
            isRoleValid :  this.validate.userRole(this.state.roleInput)
        };

    }

    private dateFormat() : string{

        const birthDateSplit : string[] = this.state.birthDateInput.split('/');
        const monthTen : number = 10;
        
        if((+birthDateSplit[1]) < monthTen ){
            return (birthDateSplit[2]+'-0'+(+birthDateSplit[1])+'-'+birthDateSplit[0])
        }

        return (birthDateSplit[2]+'-'+(+birthDateSplit[1])+'-'+birthDateSplit[0]);
            
    }

    private handleChangeStringInput(text : string,typeOfInput : string){

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
            
            this.setState({ loading : true} );
            await createUser(newUser);
            Alert.alert('Usuário criado com sucesso!');
            
        }catch(error){

            if(error.graphQLErrors[0] === undefined){
                Alert.alert('Problema de conexão com o servidor');
                return;
            }
            Alert.alert(error.graphQLErrors[0].message);

        }finally{   
            this.setState({ loading : false} );
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
