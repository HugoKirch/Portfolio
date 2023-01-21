import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { login } from "../../services/AuthApi/AuthApi";
import React, { useEffect } from "react";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

type Nav = {
  navigate: (value: string) => void;
  dispatch: (value: any) => void;
};

const SignIn = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const navigation = useNavigation<Nav>();

  useEffect(() => {
    GoogleSignin.configure();
  }, [GoogleSignin]);

  const handleSubmit = async () => {
    try {
      const response = await login({
        email: email,
        password: password,
      });

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home" }],
        })
      );
    } catch (response) {
      console.log(response);
      alert("Wrong credentials");
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Hi, Welcome Back</Text>
      <Text style={styles.subtitle1}>Enter your credentials to continue</Text>
      <Text>OR</Text>
      <Text style={styles.subtitle2}>Sign in with email address</Text>
      <View style={styles.txtfield}>
        <Text style={styles.txtfieldlabel}>Email</Text>
        <TextInput
          style={styles.txtfieldinput}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.txtfield}>
        <Text style={styles.txtfieldlabel}>Password</Text>
        <TextInput
          style={styles.txtfieldinput}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate("Forgot");
        }}
      >
        <Text style={styles.forgot}>Forgot password?</Text>
      </Pressable>
      <Pressable onPress={handleSubmit} style={styles.container}>
        <Text style={styles.text}>Sign In</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Text style={styles.signup}>Don't have an account</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    paddingTop: "50%",
    backgroundColor: "#E3F2FD",
    height: "100%",
  },
  title: {
    color: "#673AB7",
    fontSize: 32,
    fontWeight: "bold",
  },
  forgot: {
    color: "#673AB7",
    padding: 16,
    fontSize: 16,
  },
  subtitle1: {
    color: "#9E9E9E",
    fontSize: 16,
  },
  subtitle2: {
    color: "#212121",
    fontSize: 16,
    fontWeight: "900",
  },
  signup: {
    color: "#212121",
    fontSize: 16,
    fontWeight: "900",
    padding: 16,
  },
  txtfield: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#9E9E9E",
    display: "flex",
    flexDirection: "column",
    marginLeft: 8,
    marginRight: 8,
    height: 64,
    width: "80%",
    marginTop: 16,
  },
  txtfieldinput: {
    width: "99%",
    height: 30,
    paddingBottom: 5,
    paddingLeft: 5,
    fontSize: 18,
    margin: "auto",
  },
  txtfieldlabel: {
    color: "#9E9E9E",
    textAlign: "left",
    fontSize: 14,
    paddingLeft: 8,
    paddingTop: 8,
  },
  container: {
    width: "80%",
    backgroundColor: "#3B71F3",
    padding: 15,
    marginVertical: 5,

    alignItems: "center",
    borderRadius: 5,
  },
  text: {},
});

export default SignIn;
