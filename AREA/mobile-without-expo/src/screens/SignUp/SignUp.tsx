import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {login, register} from '../../services/AuthApi/AuthApi';
import React from 'react';
import Auth from '../../contexts/Auth/Auth';
import {useNavigation, CommonActions} from '@react-navigation/native';

type Nav = {
  navigate: (value: string) => void;
  dispatch: (value: any) => void;
};

const SignUp = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [username, setUsername] = React.useState<string>('');

  const navigation = useNavigation<Nav>();

  const handleSubmit = async () => {
    try {
      const response = await register({
        email: email,
        password: password,
        username: username,
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      );
    } catch (response) {
      console.log(response);
      alert('Failed to register');
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle1}>Enter your credentials to continue</Text>
      <Text>OR</Text>
      <Text style={styles.subtitle2}>Sign up with email address</Text>
      <View style={styles.txtfield}>
        <Text style={styles.txtfieldlabel}>Username</Text>
        <TextInput
          style={styles.txtfieldinput}
          onChangeText={text => setUsername(text)}
        />
      </View>
      <View style={styles.txtfield}>
        <Text style={styles.txtfieldlabel}>Email</Text>
        <TextInput
          style={styles.txtfieldinput}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.txtfield}>
        <Text style={styles.txtfieldlabel}>Password</Text>
        <TextInput
          style={styles.txtfieldinput}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <Pressable onPress={handleSubmit} style={styles.container}>
        <Text style={styles.text}>Sign Up</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'SignIn'}],
            }),
          );
        }}>
        <Text style={styles.signin}>Already have an account?</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingTop: '50%',
    backgroundColor: '#E3F2FD',
    height: '100%',
  },
  title: {
    color: '#673AB7',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle1: {
    color: '#9E9E9E',
    fontSize: 16,
  },
  subtitle2: {
    color: '#212121',
    fontSize: 16,
    fontWeight: '900',
  },
  signin: {
    color: '#212121',
    fontSize: 16,
    fontWeight: '900',
    padding: 16,
  },
  txtfield: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#9E9E9E',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 8,
    marginRight: 8,
    height: 64,
    width: '80%',
    marginTop: 16,
  },
  txtfieldinput: {
    width: '99%',
    height: 30,
    paddingBottom: 5,
    paddingLeft: 5,
    fontSize: 18,
    margin: 'auto',
  },
  txtfieldlabel: {
    color: '#9E9E9E',
    textAlign: 'left',
    fontSize: 14,
    paddingLeft: 8,
    paddingTop: 8,
  },
  container: {
    width: '80%',
    backgroundColor: '#3B71F3',
    padding: 15,
    marginVertical: 5,

    alignItems: 'center',
    borderRadius: 5,
  },
  text: {},
});

export default SignUp;
