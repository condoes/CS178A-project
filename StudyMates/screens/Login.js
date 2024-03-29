import { React, useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, AsyncStorage } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { auth, db } from "../firebase";

const Login = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const username = route.params;

  const handleScreen = async () => {
    const { uid } = auth.currentUser;
    const userRef = db.collection("users").doc(uid);
    const doc = await userRef.get();
    const userData = doc.data();
    console.log("user pet id:", userData.petid);

    if (userData.petid === "") {
      navigation.navigate("PickPet");
    } else {
      navigation.navigate("Landing");
    }
  };

  useEffect(() => {
    const loggedIn = auth.onAuthStateChanged(user => {
      // const { uid } = auth.currentUser;
      // console.log(user.petid);
      if (user) {
        // navigation.navigate("Landing");
        handleScreen();
      }
    });
    return loggedIn;
  }, []);

  const handleLogIn = () => {
    auth
      .signInWithEmailAndPassword(email.trim(), password)
      .then(userCredentials => {
        const user = userCredentials.user;
        // console.log("logged in with:", user.email);
        // console.log("username: ", user.username);
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
        <Text className="text-5xl font-fredoka p-2">StudyMates!</Text>
        <TextInput
          className="text-2xl border border-1 border-darkgray/50 font-worksans p-2 rounded-xl w-1/2 bg-tan/25"
          placeholder="email"
          onChangeText={text => setEmail(text)}
          value={email}
          autoComplete="email"
        />
        <TextInput
          className="mt-2 mb-4 text-2xl border border-1 border-darkgray/50 font-worksans p-2 rounded-xl w-1/2 bg-tan/25"
          placeholder="password"
          autoComplete="email"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
        />
        <Pressable
          className="border border-1 p-2 rounded-xl px-4"
          onPress={handleLogIn}
        >
          <Text className="text-3xl font-fredoka text-darkgray">login</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text className="pt-6 underline text-2xl font-fredoka">sign up</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
          <Text className="pt-6 underline text-2xl font-fredoka">forgot password</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

export default Login;
