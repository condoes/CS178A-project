import { StoreContext } from "nativewind/dist/style-sheet";
import { React, useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image, ImageBackground, TouchableOpacity,Modal} from "react-native";
import { MaterialCommunityIcons, SimpleLineIcons, Ionicons, AntDesign , Entypo} from "@expo/vector-icons";
import { db, auth } from "../firebase";
import Coins from "./coins";

const ShopItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState(null);
  const [desc, setDesc] = useState(null);
  const [img, setImg] = useState(null);
  const [cost, setCost] = useState(null);
  const [userCoins, setUserCoins] = useState(null);

  const getItem = async () => {
    const itemRef = db.collection("fruits").doc(props.id);
    const itemDoc = await itemRef.get();
    const itemData = itemDoc.data();

    setItem(itemData);
    setDesc(itemData.description);
    setCost(itemData.cost);
    //setImg(itemData.imgSrc);

    switch (itemData.name){
      case 'banana':
        setImg(require("../assets/food/banana.png"))
        break;
      case 'cherry':
        setImg(require("../assets/food/cherry.png"))
        break;
      case 'kiwi':
        setImg(require("../assets/food/kiwi.png"))
        break;
      case 'waffles':
        setImg(require("../assets/food/waffles.png"))
        break;
      case 'hotDog':
        setImg(require("../assets/food/hotDog.png"))
        break;
    }
  };

  const UserCoins = async () => {
    const { uid }  = auth.currentUser;
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();
    const userData = userDoc.data();

    setUserCoins(userData.coins);
  };

  const updateUserCoins  = () => {
    const { uid }  = auth.currentUser;
    db.collection("users").doc(uid).update({coins: userCoins - cost});
    };
  
  useEffect(() => {
    getItem();
    UserCoins();
  }, []);
  
  return (
    <View>
      <TouchableOpacity onPress={() => {setModalVisible(!modalVisible);}}>
        <Image source={img}/>
      </TouchableOpacity>
      
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Image source={img} resizeMode="contain"/>
              <Text style={styles.description}> {desc} {"\n"}</Text>
              <Text style={styles.description}> Would you like to buy for {<Coins numCoins = {cost}/>} ?</Text>

              {/* HELP WHY DOESNT THIS WORK */}
              <View className = "flex flex-row items-center justify-center">
                <TouchableOpacity style = {styles.button} 
                  onPress={()=> {
                    if(userCoins >= cost){
                      updateUserCoins();
                    }
                    setModalVisible(!modalVisible);
                    }}>
                  <Entypo  name="check" size={32} color="white" alignItems="center"/>

                </TouchableOpacity>

                <TouchableOpacity style = {styles.button} onPress={()=> {setModalVisible(!modalVisible);}}>
                  <Entypo  name="cross" size={32} color="white" alignItems="center"/>
                </TouchableOpacity>
              </View>
          </View>
        </View>
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
  button:{
    color: "green",
    borderRadius:42,
    elevation:5,
    height: 50,
    width:110,
    margin: 6,
    marginTop:10
  },
  modalView:{
    backgroundColor: "#FFF2D4",
    borderColor: "#505050",
    borderRadius: 20,
    padding: 30,
    alignItems:"center",
    fontFamily: "FredokaMedium",
    width:300
  },
  description:{
    color:"#505050",
    fontFamily: "FredokaMedium",
    textAlign:"center",
    fontSize:20
  }
});

export default ShopItem;