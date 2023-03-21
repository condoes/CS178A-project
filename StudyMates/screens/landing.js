import { React, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
  ImageBackground,
  useContext,
  TouchableOpacity,
  Modal,
  ScrollView,
  Animated,
  PanResponder,
  TouchableNativeFeedback
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BurgerMenu from "../Components/burgerMenu";
import LifeBar from "../Components/lifeBar";
import Coins from "../Components/coins";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
// import Routes from "../routes/Routes";
// import { collection, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import FadeInOut from "react-native-fade-in-out";
// import inventory from "../Components/inventory";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import InventoryItem from "../Components/inventoryItem";
import { getKey, increment } from "@firebase/firestore";
import { abs } from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Landing = ({ route, navigation }) => {
  const [uid, getUid] = useState(null);
  const [user, setUser] = useState(null);
  const [img, setImg] = useState(null);
  const [pet, setPet] = useState(null);
  const [welcome, setWelcome] = useState(true);
  const [openInventory, setInventoryVisible] = useState(false);
  const [foodScreen, setFoodScreen] = useState(false);
  const [fruits, setFruits] = useState([]);
  const [currFood, setCurrFood] = useState(null);
  const [currFoodImg, setCurrFoodImg] = useState(null);
  const [inv, setInv] = useState([]);

  const getPet = async petid => {
    const petRef = db.collection("pets").doc(petid);
    const petDoc = await petRef.get();

    const petData = petDoc.data();
    setPet(petData);
    petData.type === "fox"
      ? setImg(require("../assets/pinkFox.png"))
      : petData.type === "tiger"
      ? setImg(require("../assets/redTiger.png"))
      : setImg(require("../assets/greenHyena2.png"));

    console.log("pet type", petData.type);
  };

  useEffect(() => {
    setWelcome(true);
    setTimeout(() => {
      setWelcome(false);
    }, 5000);
    //console.log(user);
    const { uid } = auth.currentUser;
    if (!uid) return;

    console.log("user id: ", uid);

    const userSub = db
      .collection("users")
      .doc(uid)
      .onSnapshot(doc => {
        // includeMetadataChanges: true;
        setUser(doc.data());
        if (pet === null) {
          getPet(doc.data().petid);
        }
        setFruits([
          {key: 'banana', amount: (doc.data().inventory.banana)},
          {key: 'cherry', amount: (doc.data().inventory.cherry)},
          {key: 'hotDog', amount: (doc.data().inventory.hotDog)},
          {key: 'kiwi', amount: (doc.data().inventory.kiwi)},
          {key: 'waffles', amount: (doc.data().inventory.waffles)}
        ]);
      });

    // console.log(user.username);

    // setInv(user.inventory2);

    // setFruitAmount();

    return () => {
      userSub;
    };
  }, []);

  function setFruitAmount() {
    setFruits([
          {key: 'banana', amount: (user.inventory2 && user.inventory2.banana)},
          {key: 'cherry', amount: (user.inventory2 && user.inventory2.cherry)},
          {key: 'hotDog', amount: (user.inventory2 && user.inventory2.hotDog)},
          {key: 'kiwi', amount: (user.inventory2 && user.inventory2.kiwi)},
          {key: 'waffles', amount: (user.inventory2 && user.inventory2.waffles)}
        ]);
  }

    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}],
            {useNativeDriver: false},
            ),
        onPanResponderRelease: (e, gesture) => {
         Animated.spring(
          pan,{toValue:{x:0,y:0}, useNativeDriver: false}
          
          ).start();
      }
        }),
    ).current;

    const handleFoodPress = (item) => {
      setInventoryVisible(!openInventory);
      setFoodScreen(!foodScreen);
      setCurrFood(item);

      switch (item) {
        case "banana":
          setCurrFoodImg(require("../assets/food/banana.png"));
          break;
        case "cherry":
          setCurrFoodImg(require("../assets/food/cherry.png"));
          break;
        case "kiwi":
          setCurrFoodImg(require("../assets/food/kiwi.png"));
          break;
        case "waffles":
          setCurrFoodImg(require("../assets/food/waffles.png"));
          break;
        case "hotDog":
          setCurrFoodImg(require("../assets/food/hotDog.png"));
          break;
      }
    };

    const handleFoodDec = () => {
      const { uid } = auth.currentUser;
      var inventoryUpdate = {};
        inventoryUpdate[`inventory.${currFood}`] = increment(-1);

        db.collection("users")
        .doc(uid)
        .update(inventoryUpdate);

        setFoodScreen(!foodScreen);
    }

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

          <LifeBar
            percent={(user && user.exp) > 0 ? (user && user.exp) / 100 : 0.1}
          />
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

        <View >
          {/* https://reactnative.dev/docs/images */}
          <Image source={img} />
        </View>
      </View>
       
      {!foodScreen? 
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

                <FlatList 
                  showsHorizontalScrollIndicator={false}
                  style = {styles.itemList}
                  horizontal={true}
                  data={fruits}
                  renderItem={({item}) =>
                  
                  <View>
                    <TouchableOpacity onPress={ () => handleFoodPress(item.key)
                    }>
                      <InventoryItem amount={item.amount} item={item.key}
                      ></InventoryItem>
                    </TouchableOpacity>
                    </View>
                  }
                />
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={[styles.button, styles.shadowProp]}
          onPress={() => navigation.navigate("TimerPick")}
        >
          <Text style={styles.buttonText}>study</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roundButton, styles.shadowProp]}
          onPress={() =>
            navigation.navigate("Store", { coins: user && user.coins })
          }
        >
          <MaterialCommunityIcons
            name="storefront-outline"
            size={30}
            color="black"
          />
        </TouchableOpacity>
        </View>
        :
        <View style = {{zIndex: 3, paddingBottom: '13%'}}>
          <Animated.View 
                  scrollEnabled={false}
                  style={{
                    transform: [{translateX: pan.x}, {translateY: pan.y}],
                    position:'relative',
                  overflow:"visible"
                }}
                {...panResponder.panHandlers}>
          <TouchableOpacity style ={styles.food}
                    onPress={ () => handleFoodDec()}>
                  <Image source = {currFoodImg}/>
                </TouchableOpacity>
                </Animated.View>
                <View style = {{marginLeft:165, position: 'absolute'}}>
                    <TouchableOpacity style = {styles.roundButton}
                      onPress={ () => setFoodScreen(!foodScreen)}
                    >
                      <Entypo
                      name="cross"
                      size={32}
                      color="black"
                      alignItems="center"
                      />
                    </TouchableOpacity>
                </View>
        </View>
      }   

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
    backgroundColor: "red",
  },
  topRow: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: 'red',
    paddingLeft: 22,
    paddingRight: 22,
    zIndex: 6
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
    zIndex: 6
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
    marginTop: "auto",
  },
  inventoryView: {
    backgroundColor: "#9F9FDC",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "FredokaMedium",
    height: "25%",
    width: "100%",
  },
  innerInventory: {
    backgroundColor: "#CBCBF7",
    borderRadius: 20,
    height: "80%",
    width: "90%",
  },
  closeButton: {
    backgroundColor: "#9F9FDC",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 50,
    width: "25%",
    marginLeft: 20,
    marginTop: "auto",
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
  },
  itemList:{
    paddingRight: 100,
    //position:"absolute",
    //overflow:'visible'
  },
  food:{
   //marginTop: '40%', 
   //backgroundColor : 'black',
  
  },
});

export default Landing;
