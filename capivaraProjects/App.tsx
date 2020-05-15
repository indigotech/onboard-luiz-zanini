import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import  Login from './src/views/Login';
import {H1} from './src/components/H1';

const App = () => {
  return (
      <View style={styles.container}>
        <H1 title={'Bem-vindo(a) à Taqtile!'} />
        <Login/>
      </View>
  );
};
App.options = {
  topBar: {
    title: {
      text: 'Login',
     }
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  sectionViewTitle:{
    flex:0.20,
    flexDirection: "column-reverse"
  },
  container:{
    flex:1,
    flexDirection: 'column',
    padding : 10,
  }

});

export default App;
