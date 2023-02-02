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
import LifeBar from "../Components/lifeBar";
import Coins from "../Components/coins";
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
      
      <View style={styles.topRow}>
        <View style={styles.topLeft}>
          <Text className="text-3xl font-fredoka text-white m-1.5">
            {user && user.username}
          </Text> 

          <LifeBar percent={0.9}/>
          <Coins numCoins = {165}/>
        </View>

        <View style={styles.topRight}>
          <BurgerMenu navigation={navigation}/>
        </View>
      </View>

      <View style='styles.midRow'>
        <Text className="text-4xl font-fredoka text-white mb-10">
          Welcome, {user && user.username}
        </Text> 

        {/* https://reactnative.dev/docs/images */}
        <Image source={require('../assets/greenHyena2.png')} />
      </View>

      <View style={styles.buttonRow}>
        <Pressable style={[styles.roundButton, styles.shadowProp]}>
          <MaterialCommunityIcons name="hanger" size={30} color="black" />
        </Pressable>

        <Pressable
        style={[styles.button, styles.shadowProp]}
        onPress={() => navigation.navigate("TimerPick")}>
          <Text style={styles.buttonText}>study</Text>
        </Pressable>

        <Pressable 
        style={[styles.roundButton, styles.shadowProp]}
        onPress={() => navigation.navigate("Store")}>
          <MaterialCommunityIcons name="storefront-outline" size={30} color="black" />
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linGrad: {
    alignItems: "center",
    justifyContent: 'space-evenly',
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    backgroundColor: "red"
  },
  topRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    paddingLeft: 22,
    paddingRight: 22,
    zIndex: 2,
  },
  topLeft: {
    alignItems: 'flex-start',
    // backgroundColor: 'yellow',
  },
  topRight: {
    // backgroundColor: "blue",
    position: 'absolute',
    top: '15%',
    right: '7%',
  },
  midRow: {
    zIndex: 1,
  },
  buttonRow: {
    // backgroundColor: 'red',
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: "row",
    zIndex: 2,
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
    padding: 10,
    marginTop: 45,
    height:56,
    width: 56,
  },
  buttonText: {
    fontFamily: "WorkSansMedium",
    fontSize: 24,
    color: "#4D558A"
  }
});

export default Landing;
