import { React, useState, useEffect } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { auth, db } from "../firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore/lite";

const Register = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    auth
      .createUserWithEmailAndPassword(email.trim(), password)
      .then(userCredentials => {
        const user = {
          username: username,
          email: email,
          coins: 0,
          totalStudy: 0
        };

        db.collection("users")
          .doc(userCredentials.user.uid)
          .set(user);
        const curr_user = userCredentials.user;
        console.log(curr_user.email);
        console.log(curr_user.username);
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
          className="text-3xl border border-1 border-darkgray/50 font-worksans p-2 rounded-xl w-3/5 bg-tan/25"
          placeholder="username"
          onChangeText={text => setUsername(text)}
          value={username}
          maxLength={15}
        />
        <TextInput
          className="mt-2 text-3xl border border-1 border-darkgray/50 font-worksans p-2 rounded-xl w-3/5 bg-tan/25"
          placeholder="email"
          onChangeText={text => setEmail(text)}
          value={email}
          textContentType="emailAddress"
        />
        <TextInput
          className="mt-2 mb-4 text-3xl border border-1 border-darkgray/50 font-worksans p-2 rounded-xl w-3/5 bg-tan/25"
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
