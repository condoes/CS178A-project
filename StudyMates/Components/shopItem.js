import { StoreContext } from "nativewind/dist/style-sheet";
import { React, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal
} from "react-native";
import {
  MaterialCommunityIcons,
  SimpleLineIcons,
  Ionicons,
  AntDesign,
  Entypo
} from "@expo/vector-icons";
import { db, auth } from "../firebase";
import "firebase/firestore";

import firebase from "firebase/compat/app";

import "firebase/firestore";
import Coins from "./coins";
import { array } from "prop-types";
import { FieldValue, Firestore, increment, where } from "firebase/firestore";


const ShopItem = ({ id, userCoins, itemToShop }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  //const [modalType, setModalType] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [item, setItem] = useState(null);
  const [desc, setDesc] = useState(null);
  const [img, setImg] = useState(null);
  const [cost, setCost] = useState(null);
  //const [userCoins, setUserCoins] = useState(null);

  const getItem = async () => {
    const itemRef = db.collection("fruits").doc(id);
    //console.log(id);
    const itemDoc = await itemRef.get();
    const itemData = itemDoc.data();

    setItem(itemData.name);
    setDesc(itemData.description);
    setCost(itemData.cost);
    //setImg(itemData.imgSrc);

    switch (itemData.name) {
      case "banana":
        setImg(require("../assets/food/banana.png"));
        break;
      case "cherry":
        setImg(require("../assets/food/cherry.png"));
        break;
      case "kiwi":
        setImg(require("../assets/food/kiwi.png"));
        break;
      case "waffles":
        setImg(require("../assets/food/waffles.png"));
        break;
      case "hotDog":
        setImg(require("../assets/food/hotDog.png"));
        break;
    }
  };

  // const UserCoins = async () => {
  //   const { uid } = auth.currentUser;
  //   const userRef = db.collection("users").doc(uid);
  //   const userDoc = await userRef.get();
  //   const userData = userDoc.data();

  //   setUserCoins(userData.coins);
  // };

  const updateUser = () => {
    const { uid } = auth.currentUser;
    itemToShop(userCoins - cost);
    db.collection("users")
      .doc(uid)
      .update({ coins: userCoins - cost });
      
    var inventoryUpdate = {};
    inventoryUpdate[`inventory.${item}`] = increment(1);

    db.collection("users")
      .doc(uid)
      .update(inventoryUpdate);
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Image source={img}/>
      </TouchableOpacity>

      <View style={styles.costContainer} >
               <Text className="text-2xl"style={styles.CostText}>
               • {cost}c
                </Text>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Image source={img} resizeMode="contain" />
            <Text style={styles.description}>
              {" "}
              {desc} {"\n"}
            </Text>
            <Text style={styles.description}>
              {" "}
              Would you like to buy for {<Coins numCoins={cost} />} ?
            </Text>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.yesButton}
                onPress={() => {
                  if (userCoins >= cost) {
                    updateUser();
                    setModalVisible(!modalVisible);
                  } else {
                    setModal2Visible(!modal2Visible);
                  }
                }}
              >
                <Entypo
                  name="check"
                  size={32}
                  color="white"
                  alignItems="center"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.noButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Entypo
                  name="cross"
                  size={32}
                  color="white"
                  alignItems="center"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modal2Visible}
          onRequestClose={() => {
            setModal2Visible(!modal2Visible);
          }}
        >
          <View style={styles.container}>
            <View style={styles.modal2View}>
              <Text style={styles.description}>
                {" "}
                Not enough coins! {"\n"}
                You only have {<Coins numCoins={userCoins} />}
              </Text>
              <TouchableOpacity
                style={styles.downButton}
                onPress={() => {
                  setModal2Visible(!modal2Visible);
                }}
              >
                <Entypo
                  name="chevron-down"
                  size={40}
                  color="white"
                  alignItems="center"
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: 50
  },
  downButton: {
    backgroundColor: "#4D558A",
    borderRadius: 42,
    elevation: 5,
    height: 50,
    width: 110,
    margin: 6,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  yesButton: {
    backgroundColor: "#D1EBCB",
    borderRadius: 42,
    elevation: 5,
    height: 50,
    width: 110,
    margin: 6,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  noButton: {
    backgroundColor: "#FF9F9F",
    borderRadius: 42,
    elevation: 5,
    height: 50,
    width: 110,
    margin: 6,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  modalView: {
    backgroundColor: "#FFF2D4",
    borderColor: "#505050",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    fontFamily: "FredokaMedium",
    width: 350,
    marginTop:160
  },
  modal2View: {
    backgroundColor: "#DAF0F7",
    borderColor: "#505050",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    fontFamily: "FredokaMedium",
    width: 300,
    marginTop:160
  },
  description: {
    color: "#505050",
    fontFamily: "FredokaMedium",
    textAlign: "center",
    fontSize: 20
  },
  costContainer:{
    //backgroundColor:"#FFF2D4",
    backgroundColor: 'rgba(255, 242, 212, .80)',
    position:"absolute",
    borderTopLeftRadius:15,
    borderBottomLeftRadius:15,
    height:35,
    width:55,
    // height:'15%',
    // width: "60%",
    alignItems:"center",
    justifyContent:"center",
    marginLeft:60,
  },
  CostText:{
    color: "#505050",
    fontFamily: "FredokaMedium",
    fontSize:20,
  },

});

export default ShopItem;
