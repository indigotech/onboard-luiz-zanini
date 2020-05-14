/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import App from './App';
import {Home} from './src/views/Home';
import {addUser} from './src/views/addUser';
import {User} from './src/views/User';

Navigation.registerComponent('Login', () => App);
Navigation.registerComponent('Home', () => Home);
Navigation.registerComponent('addUser', () => addUser);
Navigation.registerComponent('User', () => User);

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

const UserPage = {
  root: {
    stack: {
      id: 'User',
      children: [
        {
          component: {
            name: 'User'
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

const userAddPage = {
  root: {
    stack: {
      id: 'User',
      children: [
        {
          component: {
            name: 'UserAdd'
          }
        }
      ]
    }
  }
};

User.options = {
  topBar: {
    title: {
      text: 'Adicionar novo Usuário',
    }
  }
};

addUser.options = {
  topBar: {
    title: {
      text: 'Adicionar novo Usuário',
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
