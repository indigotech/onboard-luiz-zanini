import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

import React from 'react';

function click(){
  return (console.log(`clicou`));
}

const Login = () => {
  return (
    <View style={styles.sectionViewInput}>
      <Text style={styles.sectionText}>E-mail</Text>
      <TextInput style={styles.sectionTextInput} />
      <Text style={styles.sectionText} >Senha</Text>
      <TextInput style={styles.sectionTextInput} />
      <View style={styles.sectionButtonInput}>
        <Button  color="#FFFFFF" onPress={click} title="Entrar" />
      </View>
    </View>
    );
};

const styles = StyleSheet.create({
  sectionTextInput: {
    height: 40,
    borderColor: "#C0C0C0",
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 20
  },
  sectionViewInput: {
    padding: "5%",
    flex: 1
  },
  sectionButtonInput: {
    backgroundColor :"#8A2BE2",
    borderRadius: 15,
    minHeight: 20,
    height: 45,
  },
  sectionText: {
    height: 25,
    fontSize: 20
  }

});

export default Login;