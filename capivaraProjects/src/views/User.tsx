import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { getUser } from '../apolloConfig/getUser';
import {UserInterface} from '../interface/userInterface';

interface UserProps{
    id : number;
}

export const User: React.FC<UserProps> = (props) => {
    
    const [loading , setLoading] = React.useState<boolean>(true);
    const [error , setError] = React.useState<boolean>(false);
    const [User , setUser] = React.useState<UserInterface>();

    React.useEffect(() =>{

        if(loading){
            userConnection();
        }

    });

    const userConnection = async () => {
        
        try {

            const userData : any = await getUser(props.id);
            setUser(userData.user);

        }catch{
            setError(true);
        }finally{
            setLoading(false);
        }

    }

    function renderUserInformation(){
        return (
            <View style = {styles.sectionUserData}>
                <View style = {styles.sectionImageView}>
                    <Image
                        style = {styles.ImageUser}
                        source={require('../images/user-icon-vector.png')}
                    />
                </View>
                <View style = {styles.sectionTextUser}>
                    <View style = {[styles.sectionTextView, styles.borderBottomText]}>
                        <Text style = {styles.textMain} >Nome</Text>
                        <Text style = {styles.textInformation}>{User.name}</Text>
                    </View>
                    <View style = {[styles.sectionTextView, styles.borderBottomText]}>
                        <Text style = {styles.textMain}>Email</Text>
                        <Text style = {styles.textInformation}>{User.email}</Text>
                    </View>
                    <View style = {[styles.sectionTextView, styles.borderBottomText]}>
                        <Text style = {styles.textMain}>Data de Aniversário</Text>
                        <Text style = {styles.textInformation}>{dateFormatBR()}</Text>
                    </View>
                    <View style = {[styles.sectionTextView, styles.borderBottomText]}>
                        <Text style = {styles.textMain}>Telefone </Text>
                        <Text style = {styles.textInformation}>{User.phone}</Text>
                    </View>
                    <View style = {styles.sectionTextView}>
                        <Text style = {styles.textMain}>Tipo de Usuário</Text>
                        <Text style = {styles.textInformation}>{User.role}</Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderUserError(){
        return (
            <Text>Error de conexão</Text>
        )
    }

    function renderUserLoading(){
        return (
            <ActivityIndicator/>
        )
    }
    function dateFormatBR() : string {
        
        const dateBirthSplit : string[] = User.birthDate.split('-');
        return dateBirthSplit[2]+'/'+dateBirthSplit[1]+'/'+dateBirthSplit[0];

    }
    return (
        <View style = {styles.sectionContainerUser} >
            {
                loading ?
                    renderUserLoading:
                    error ?
                        renderUserError():
                        renderUserInformation()
            }
        </View>
    )

}

const styles = StyleSheet.create({
    sectionContainerUser: {
        flex: 1,
        backgroundColor: '#dcdcdc'
    },
    sectionUserData :{
        marginHorizontal : 20,
        marginVertical : '25%',
        height : 400,
        backgroundColor : '#ffffff',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#C0C0C0",
    },
    sectionImageView : {
        height : '25%',
        alignItems : 'center'
    },
    borderBottomText :{ 
        borderBottomWidth : 1,
        borderBottomColor: '#DCDCDC',
    },
    sectionTextView :{ 
        flexDirection : "row",
        marginBottom: 7,
        marginHorizontal: 15
    },
    ImageUser :{
        width: 175,
        height: 175,
        position: "absolute",
        bottom: 1
    },
    sectionTextUser :{
        height : '75%',
    },
    textMain : {
        fontWeight: 'bold',
        fontSize : 18,
        padding : 12,
    },
    textInformation : {
        fontSize : 16,
        textAlign : 'center',
        color: '#BCBEC0',
        fontStyle: 'italic',
        padding : 12,
    }

})

