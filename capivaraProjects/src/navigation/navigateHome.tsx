import { Navigation } from "react-native-navigation"

export const navigateHome = () => {
    
    Navigation.push('Login', {
        component: {
            name: 'Home',
            options: {
                topBar: {
                    title: {
                        text: 'Home'
                    }
                }
            }
        }
    });

};