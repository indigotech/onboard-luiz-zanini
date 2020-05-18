import {
    StyleSheet,
    View,
    Alert,
} from 'react-native';
import React from 'react';
import {ValidateRegex} from '../validate/regexValidation';
import {createUser} from '../apolloConfig/createUser';
import { ButtonStyle } from '../components/Button';
import { FormField } from '../components/FormField';

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
                <FormField
                    title={'Nome'}
                    validate = {this.validate.name}
                    handleText = {this.handleChangeInputName}
                    inputText = {this.state.nameInput}
                />
                <FormField
                    title={'Telefone'}
                    validate = {this.validate.phone}
                    handleText = {this.handleChangeInputPhone}
                    inputText = {this.state.phoneInput}
                />
                <FormField
                    title={'Data de aniversário'}
                    validate = {this.validate.dateBirth}
                    handleText = {this.handleChangeBirthDateInput}
                    inputText = {this.state.birthDateInput}
                />
                <FormField
                    title={'E-mail'}
                    validate = {this.validate.email}
                    handleText = {this.handleChangeInputEmail}
                    inputText = {this.state.emailInput}
                />
                <FormField
                    title={'Senha'}
                    validate = {this.validate.password}
                    handleText = {this.handleChangePasswordInput}
                    inputText = {this.state.passwordInput}
                    password = {true}
                />
                <FormField
                    title={'Role'}
                    validate = {this.validate.userRole}
                    handleText = {this.handleChangeRoleInput}
                    inputText = {this.state.passwordInput}
                />
                <ButtonStyle 
                    title='Enviar' 
                    pressButton={this.handleButtonPress} 
                    loading={this.state.loading} 
                />
            </View>
        );
    }

    private handleButtonPress = () => {

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

    private handleChangeInputName = (text) =>{
        this.setState({ nameInput: text });
    }
    
    private handleChangeInputPhone = (text) =>{
        this.setState({ phoneInput: text });
    }
    
    private handleChangeInputEmail= (text) =>{
        this.setState({ emailInput : text });
    }

    private handleChangeBirthDateInput= (text) =>{
        this.setState({ birthDateInput : text });
    }

    private handleChangePasswordInput= (text) =>{
        this.setState({ passwordInput : text });
    }

    private handleChangeRoleInput= (text) =>{
        this.setState({ roleInput : text });
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
