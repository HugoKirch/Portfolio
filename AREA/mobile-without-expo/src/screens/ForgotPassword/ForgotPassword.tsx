import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {forgot} from '../../services/AuthApi/AuthApi';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

type Nav = {
  navigate: (value: string) => void;
  dispatch: (value: any) => void;
};

const ForgotPassword = () => {
  const [email, setEmail] = React.useState<string>('');

  const navigation = useNavigation<Nav>();

  const handleSubmit = async () => {
    try {
      const response = await forgot(email);
      alert('Email sent');
    } catch (response) {
      console.log(response);
      alert('Email failed');
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Forgot password?</Text>
      <Text style={styles.subtitle1}>
        Enter your email address below and we'll send you your
      </Text>
      <Text style={styles.subtitle1}>new password</Text>
      <View style={styles.txtfield}>
        <Text style={styles.txtfieldlabel}>Email</Text>
        <TextInput
          style={styles.txtfieldinput}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <Pressable onPress={handleSubmit} style={styles.container}>
        <Text style={styles.text}>Send Mail</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('SignIn');
        }}>
        <Text style={styles.signup}>Already have an account?</Text>
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
  forgot: {
    color: '#673AB7',
    padding: 16,
    fontSize: 16,
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
  signup: {
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

export default ForgotPassword;
