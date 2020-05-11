
import {AsyncStorage} from 'react-native';

export async function getToken() : Promise<string> {

    let userId = '';

    try {

      userId = await AsyncStorage.getItem('userId') || 'none';
    
    } catch (error) {
    
      console.log(error.message);
    
    }
    
    return userId;
}
