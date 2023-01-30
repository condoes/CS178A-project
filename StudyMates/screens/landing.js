import { React, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
  useContext,
  Button
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BurgerMenu from "../Components/burgerMenu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import Routes from "../routes/Routes";
// import { collection, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

const Landing = ({ navigation }) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const { uid } = auth.currentUser;
    // Discard fetch when user ID not defined
    if (!uid) return;
    const userRef = db.collection("users").doc(uid);
    const doc = await userRef.get();
    const userData = doc.data();
    // console.log(userData);
    setUser(userData);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <LinearGradient
      style={styles.linGrad}
      colors={["#FFE4E4", "#FFB2B2", "#B0B0F8", "#588046", "#206003"]}
      start={{ x: 0, y: 0 }}
      locations={["0.77%", "37.93%", "60.5%", "65.94%", "96.15%"]}
    >
      <BurgerMenu navigation={navigation}/>

      <Text className="text-4xl font-fredoka text-white">
        Welcome, {user && user.username}
      </Text>
      {/* <ImageBackground source={require('../assets/callout.png')} resizeMode="cover" style={styles.image}>
      </ImageBackground> */}

      {/* https://reactnative.dev/docs/images */}
      <Image source={require('../assets/greenHyena2.png')} />

      {/* <ImageBackground source={require('../assets/calloutBubble.png')} 
        style={styles.image}>
          <Text>hey lol</Text>
      </ImageBackground> */}

      <Pressable
        style={[styles.button, styles.shadowProp]}
        onPress={() => navigation.navigate("TimerPick")}
      >
        <Text style={styles.buttonText}>study</Text>
      </Pressable>

      <Pressable style={[styles.roundButton, styles.shadowProp]}>
        <MaterialCommunityIcons name="hanger" size={24} color="black" />
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linGrad: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    backgroundColor: "red"
  },
  shadowProp: {
    shadowColor: "#00000",
    shadowOffset: { height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 2
  },
  button: {
    backgroundColor: "#E6E0FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    height: 56,
    width: 181
  },
  roundButton: {
    backgroundColor: "#E6E0FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    padding: 10
  },
  buttonText: {
    fontFamily: "WorkSansMedium",
    fontSize: 24,
    color: "#4D558A"
  }
});

export default Landing;
