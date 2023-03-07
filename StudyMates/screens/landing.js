import { React, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
  useContext,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BurgerMenu from "../Components/burgerMenu";
import LifeBar from "../Components/lifeBar";
import Coins from "../Components/coins";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import Routes from "../routes/Routes";
// import { collection, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import FadeInOut from 'react-native-fade-in-out';

const Landing = ({ route, navigation }) => {
  const [uid, getUid] = useState(null);
  const [user, setUser] = useState(null);
  const [img, setImg] = useState(null);
  const [pet, setPet] = useState(null);
  const [welcome, setWelcome] = useState(true);

  const getUser = async () => {
    const { uid } = auth.currentUser;
    // Discard fetch when user ID not defined
    if (!uid) return
    
    const userRef = db.collection("users").doc(uid);
    const doc = await userRef.get();
    const userData = doc.data();
    setUser(userData); 
    console.log(userData);

    const petid = userData.petid;
    // console.log("user pet id:", petid);

    const petRef = db.collection("pets").doc(petid);

    const petDoc = await petRef.get();
    const petData = petDoc.data();
    setPet(petData); 

    console.log("pet type", petData.type);
    petData.type === "fox"
      ? setImg(require("../assets/pinkFox.png"))
      : petData.type === "tiger"
      ? setImg(require("../assets/redTiger.png"))
      : setImg(require("../assets/greenHyena2.png"));
  };

  useEffect(() => {
    setWelcome(true)
    setTimeout(() => {
      setWelcome(false)
    }, 5000)
  }, [])

  useEffect(() => {
    getUser();
    // const { uid } = auth.currentUser;
    // if (!uid) return;

    // console.log("user id: ", uid);

    // const userSub = db.collection("users")
    // .doc(uid)
    // .onSnapshot(doc => {
    //   setUser(doc.data());
    // });
    // console.log("cur pet: ", user && user.petid);

    // const petSub = db.collection("pets")
    // .doc(user && user.petid)
    // .onSnapshot(doc => {
    //   setPet(doc.data());
    // });
    // console.log("pet type: ", pet && pet.type);

    // (pet && pet.type) === "fox"
    //   ? setImg(require("../assets/pinkFox.png"))
    //   : (pet && pet.type) === "tiger"
    //   ? setImg(require("../assets/redTiger.png"))
    //   : setImg(require("../assets/greenHyena2.png"));

    // return () => { userSub(); petSub(); }
  }, []);

  return (
    <LinearGradient
      style={styles.linGrad}
      colors={["#FFE4E4", "#FFB2B2", "#B0B0F8", "#588046"]}
      start={{ x: 0, y: 0 }}
      locations={["0.77%", "37.93%", "60.5%", "65.94%"]}
    >
      <View style={styles.topRow}>
        <View style={styles.topLeft}>
          <Text className="text-3xl font-fredoka text-white m-1.5">
            {pet && pet.name}
          </Text>
 
          <LifeBar percent={(user && user.exp) > 0? (user && user.exp)/100 : 0.1} />
          {/* {console.log("user pet id:", user.totalStudy)} */}
          <Coins numCoins={user && user.coins} />
        </View>

        <View style={styles.topRight}>
          <BurgerMenu navigation={navigation} />
        </View>
      </View>

      
      <View className="z-[3] flex flex-end justify-start items-center">
        <View>
          <FadeInOut visible={welcome} duration={2500}>
            <Text className="text-4xl font-fredoka text-white mb-[20%] text-center">
              Welcome, {user && user.username}
            </Text>
          </FadeInOut>
        </View>

        <View>
          {/* https://reactnative.dev/docs/images */}
          <Image source={img} />
        </View>
      </View>
        
    
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.roundButton, styles.shadowProp]}>
          <MaterialCommunityIcons name="hanger" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.shadowProp]}
          onPress={() => navigation.navigate("TimerPick")}
        >
          <Text style={styles.buttonText}>study</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roundButton, styles.shadowProp]}
          onPress={() => navigation.navigate("Store")}
        >
          <MaterialCommunityIcons
            name="storefront-outline"
            size={30}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <Image
      className="z-[2] absolute top-[35%] right-[50%] w-[70%] h-[13%]"
      source={require("../assets/clouds_1.png")}
      resizeMode="contain"
      />
      <Image
        className="z-[2] absolute left-[50%] top-[10%] w-[57%] h-[13%]"
        source={require("../assets/clouds_2.png")}
        resizeMode="contain"
      />
      <Image
        className="z-[2] absolute top-[-42%] w-[170%] h-[170%]"
        source={require("../assets/Grass.png")}
        resizeMode="contain"
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linGrad: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
    zIndex: 1,
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
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: 'red',
    paddingLeft: 22,
    paddingRight: 22,
    zIndex: 6,
  },
  topLeft: {
    alignItems: "flex-start"
    // backgroundColor: 'yellow',
  },
  topRight: {
    // backgroundColor: "blue",
    position: "absolute",
    top: "30%",
    right: "7%",
    zIndex: 6,
  },
  buttonRow: {
    // backgroundColor: 'red',
    alignSelf: "stretch",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "10%",
    zIndex: 3,
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
    width: 181,
    zIndex: 3,
  },
  roundButton: {
    backgroundColor: "#E6E0FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    padding: 10,
    marginTop: 45,
    height: 56,
    width: 56,
    zIndex: 3,
  },
  buttonText: {
    fontFamily: "WorkSansMedium",
    fontSize: 24,
    color: "#4D558A"
  }
});

export default Landing;
