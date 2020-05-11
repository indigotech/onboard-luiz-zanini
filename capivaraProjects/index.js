/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import App from './App';
import {Home} from './src/views/Home';

Navigation.registerComponent('Login', () => App);
Navigation.registerComponent('Home', () => Home);


const loginPage = {
  root: {
    stack: {
      id: 'Login',
      children: [
        {
          component: {
            name: 'Login'
          }
        }
      ]
    }
  }
};

const homePage = {
  root: {
    stack: {
      id: 'Home',
      children: [
        {
          component: {
            name: 'Home'
          }
        }
      ]
    }
  }
};


Home.options = {
  topBar: {
    title: {
      text: 'Home',
    }
  }
};

Navigation.events().registerAppLaunchedListener(() => {

  Navigation.setDefaultOptions({
    statusBar: {
      backgroundColor: '#4d089a'
    },
    topBar: {
      title: {
        color: 'white'
      },
      backButton: {
        color: 'white'
      },
      background: {
        color: '#8A2BE2'
      }
    }
  })


  Navigation.setRoot(loginPage);

});
