import { AsyncStorage } from "react-native";

export const deleteToken = async () => {

    try {

        await AsyncStorage.removeItem('userId');

    } catch (error) {
      
        console.log(error.message);
    
    }

}