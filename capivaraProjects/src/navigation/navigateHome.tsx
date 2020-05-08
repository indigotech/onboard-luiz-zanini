import { Navigation } from "react-native-navigation"

export const navigateHome = () => {
    
    Navigation.push('Component2', {
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