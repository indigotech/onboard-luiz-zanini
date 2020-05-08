import { AsyncStorage } from "react-native";

export const registerToken = async (token : string) => {
                       
    try {
        await AsyncStorage.setItem('userId', token);

    } catch (error) {
        console.log(error.message);
    
    }
};