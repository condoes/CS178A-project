import { React, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
  useContext,
  TouchableOpacity,
  Modal,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BurgerMenu from "../Components/burgerMenu";
import LifeBar from "../Components/lifeBar";
import Coins from "../Components/coins";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
// import Routes from "../routes/Routes";
// import { collection, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
// import inventory from "../Components/inventory";
import { useSafeAreaFrame } from "react-native-safe-area-context";

const Landing = ({ route, navigation }) => {
  const [user, setUser] = useState(null);
  const [img, setImg] = useState(null);
  const [openInventory, setInventoryVisible] = useState(false);

  const getUser = async () => {
    const { uid } = auth.currentUser;
    // Discard fetch when user ID not defined
    if (!uid) return;
    const userRef = db.collection("users").doc(uid);
    const doc = await userRef.get();
    const userData = doc.data();
    setUser(userData);
    // console.log(userData);

    const petid = userData.petid;
    // console.log("user pet id:", petid);

    const petRef = db.collection("pets").doc(petid);

    const petDoc = await petRef.get();
    const petData = petDoc.data();

    // console.log("pet type", petData.type);
    petData.type === "fox"
      ? setImg(require("../assets/pinkFox.png"))
      : petData.type === "tiger"
      ? setImg(require("../assets/redTiger.png"))
      : setImg(require("../assets/greenHyena2.png"));
  };

  useEffect(() => {
    getUser();
    // imgCheck();
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

          <LifeBar percent={9} />
          {/* {console.log("user pet id:", user.totalStudy)} */}
          {/* <Coins numCoins={user.coins} /> */}
        </View>

        <View style={styles.topRight}>
          <BurgerMenu navigation={navigation} />
        </View>
      </View>

      <View className="z-[3]">
        <Text className="text-4xl font-fredoka text-white mb-[20%]">
          Welcome, {user && user.username}
        </Text>

        {/* https://reactnative.dev/docs/images */}
        <Image source={img} />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.roundButton, styles.shadowProp]}
          onPress={() => setInventoryVisible(!openInventory)}
        >
          <MaterialCommunityIcons
            name="treasure-chest"
            size={30}
            color="black"
          />
        </TouchableOpacity>

        {/* <GestureHandler style={{flex: 1}}
          onSwipeDown={ ()=> setInventoryVisible(!openInventory)}>  */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={openInventory}
          onRequestClose={() => setInventoryVisible(!openInventory)}
        >
          <View className="flex flex-row" style={styles.inventoryStyle}>
            <Pressable
              onPress={() => {
                setInventoryVisible(!openInventory);
              }}
              style={styles.closeButton}
            >
              <Entypo
                name="chevron-down"
                size={40}
                color="white"
                alignItems="center"
              />
            </Pressable>
            <Pressable style={styles.toggleButtonBack}>
              <View style={styles.toggleButtons}>
                <TouchableOpacity style={styles.foodButton}>
                  <MaterialCommunityIcons
                    name="food-apple-outline"
                    size={40}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.clothesButton}>
                  <MaterialCommunityIcons
                    name="hanger"
                    size={40}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </Pressable>
          </View>
          <View style={styles.inventoryView}>
            <View style={styles.innerInventory}>
              <ScrollView horizontal={true} alignItems="center">
                {/* DUMMY ITEMS. PUT GABYS COMPONENTS HERE */}
                <TouchableOpacity>
                  <Image source={require("../assets/food/banana.png")}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={require("../assets/food/cherry.png")}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={require("../assets/food/kiwi.png")}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={require("../assets/food/waffles.png")}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={require("../assets/food/hotDog.png")}></Image>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
        {/* </GestureHandler> */}

        <TouchableOpacity
          style={[styles.button, styles.shadowProp]}
          onPress={() => navigation.navigate("TimerPick")}
        >
          <Text style={styles.buttonText}>study</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roundButton, styles.shadowProp]}
          onPress={() => navigation.navigate("Store", { user: user })}
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
    zIndex: 1
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
    zIndex: 3
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
    zIndex: 4
  },
  buttonRow: {
    // backgroundColor: 'red',
    alignSelf: "stretch",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "10%",
    zIndex: 3
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
    zIndex: 3
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
    zIndex: 3
  },
  buttonText: {
    fontFamily: "WorkSansMedium",
    fontSize: 24,
    color: "#4D558A"
  },
  inventoryStyle: {
    marginTop: "auto"
  },
  inventoryView: {
    backgroundColor: "#9F9FDC",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "FredokaMedium",
    height: "25%",
    width: "100%"
    //marginTop: 'auto',
    //overflow: 'visible'
  },
  innerInventory: {
    backgroundColor: "#CBCBF7",
    borderRadius: 20,
    //alignItems: "center",
    // justifyContent: "center",
    height: "80%",
    width: "90%"
  },
  // scrollView:{
  //   borderRadius:20,
  //   width:'100%',
  // },
  closeButton: {
    backgroundColor: "#9F9FDC",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 50,
    width: "25%",
    marginLeft: 20,
    marginTop: "auto",
    //marginTop: '100%',
    alignItems: "center",
    justifyContent: "center"
  },
  toggleButtonBack: {
    backgroundColor: "transparent",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 50,
    width: "40%",
    marginLeft: "auto",
    marginRight: 20,
    //marginTop: 'auto',
    alignItems: "center",
    justifyContent: "flex-end"
  },
  toggleButtons: {
    flexDirection: "row",
    height: "100%",
    width: "100%"
  },
  foodButton: {
    backgroundColor: "#9F9FDC",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: "auto",
    height: "100%",
    width: "49%"
  },
  clothesButton: {
    backgroundColor: "#9F9FDC",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    height: "100%",
    width: "49%"
  }
});

export default Landing;
