import { React, useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../firebase";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email.trim(), password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch(error => alert(error.message));
  };
  return (
    <View className="absolute flex items-center justify-center m-auto">
      <LinearGradient
        className="h-screen w-screen items-center justify-center flex"
        colors={["#E4E5E3", "#FFB2B2", "#C3C3F0"]}
        start={{ x: 0, y: 0 }}
      >
        <Text className="text-5xl font-fredoka p-2">sign up</Text>
        <TextInput
          className="text-3xl border border-1 border-darkgray/50 font-worksans p-2 rounded-xl w-1/2 bg-tan/25"
          placeholder="username"
          onChangeText={text => setUsername(text)}
          value={username}
          maxLength={15}
        />
        <TextInput
          className="mt-2 text-3xl border border-1 border-darkgray/50 font-worksans p-2 rounded-xl w-1/2 bg-tan/25"
          placeholder="email"
          onChangeText={text => setEmail(text)}
          value={email}
          autoComplete="email"
        />
        <TextInput
          className="mt-2 mb-4 text-3xl border border-1 border-darkgray/50 font-worksans p-2 rounded-xl w-1/2 bg-tan/25"
          placeholder="password"
          onChangeText={text => setPassword(text)}
          value={password}
          autoComplete="email"
          secureTextEntry
        />
        <Pressable
          className="border border-1 p-2 rounded-xl px-4"
          onPress={handleSignUp}
        >
          <Text className="text-3xl font-fredoka text-darkgray">sign up</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

export default Register;
