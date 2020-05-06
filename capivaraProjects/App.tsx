/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import  Login from './src/views/Login';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
      <View style={styles.container}>
        <View style={styles.sectionViewTitle}>
          <Text style={styles.sectionTextTitle}> Bem-vindo(a) à Taqtile!</Text>
        </View>
        <Login/>
      </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  sectionTextTitle: {
    fontSize: 30,
    fontWeight: '600',
    color: Colors.black,
    textAlign: "center",  
  },
  sectionViewTitle:{
    flex:0.20,
    flexDirection: "column-reverse"
  },
  container:{
    flex:1,
    flexDirection: 'column'
  }

});

export default App;
