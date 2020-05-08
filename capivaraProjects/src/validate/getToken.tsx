
import {AsyncStorage} from 'react-native';

export const getToken = async () => {

    let userId = '';

    try {

      userId = await AsyncStorage.getItem('userId') || 'none';
    
    } catch (error) {
    
      console.log(error.message);
    
    }
    
    return userId;
}
