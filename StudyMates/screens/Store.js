import { StoreContext } from "nativewind/dist/style-sheet";
import { React, useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, ImageBackground, TouchableOpacity,Modal} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import customButton from "../customButton";
import { MaterialCommunityIcons, SimpleLineIcons, Ionicons, AntDesign , Entypo} from "@expo/vector-icons";
import { CurrentRenderContext } from "@react-navigation/native";
import { BlurView } from "expo-blur";


const Store = ({ navigation }) =>{
  const [modalVisible, setModalVisible] = useState(false);
    return (   
    <View>

    <ImageBackground source={require('../assets/shop.png')} resizeMode="cover" style={styles.image}>

      <Pressable
      className="mr-auto mt-10 mb-auto ml-5"
      onPress={() => navigation.navigate("Landing")}>
        <AntDesign name="back" size={32} color="black" />
      </Pressable>

      <Text className="mt-24" style={styles.shopName}> Girly Pop Shop</Text>

      <View style={styles.foodContainer}>
        {/* SHELF 1 */}
        <TouchableOpacity onPress={() => {setModalVisible(!modalVisible);}}>
          <Image source={require('../assets/food/banana.png')}></Image>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
          <Image source={require('../assets/food/cherry.png')}></Image>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
          <Image source={require('../assets/food/kiwi.png')}></Image>
        </TouchableOpacity>

      </View>
    
      <View style={styles.foodContainer}>
        {/* SHELF 2 */}
        <Image source={require('../assets/food/waffles.png')}></Image>
        <Image source={require('../assets/food/hotDog.png')}></Image>
      </View>

    </ImageBackground>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>

        <View style={styles.container}>
          <View style={styles.modalView}>
            <Image
              source={require("../assets/food/banana.png")}
              resizeMode="contain"
            />
            <Text style={styles.description}> A spicy bunch of bananas found in the deepest grottos of the forest. {"\n"}</Text>
           
            <Text style={styles.description}> Would you like to buy?</Text>

            <View className="flex flex-row items-center justify-center"> 
              <TouchableOpacity className = "bg-[#D1EBCB] items-center justify-center" style = {styles.button} onPress={()=> {setModalVisible(!modalVisible);}}>
                <Entypo  name="check" size={32} color="white" alignItems="center"/>
              </TouchableOpacity>
              <TouchableOpacity className = "bg-red items-center justify-center" style = {styles.button} onPress={()=> {setModalVisible(!modalVisible);}}>
                <Entypo name="cross" size={32} color="white" alignItems="center"/>
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
  foodContainer:{
    flex:1,
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom:50
  },
  image: {
    height:'100%',
    width: '100%',
  },  
  shopName:{
    flex: 1,
    fontFamily: "FredokaMedium",
    fontSize: 52,
    color: 'white',
    textShadowOffset: {width: 2, height: 2},
    textShadowColor:"black",
    textShadowRadius: 1
  }, 
  modalView:{
    //backgroundColor: "#D1EBCB",
    backgroundColor: "#FFF2D4",
    borderColor: "#505050",
    borderRadius: 20,
    padding: 30,
    alignItems:"center",
    fontFamily: "FredokaMedium",
    width:300
  },
  exitButton:{
    backgroundColor: "#E6E0FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    padding: 10
  },
  description:{
    color:"black",
    fontFamily: "FredokaMedium",
    textAlign:"center",
    fontSize:18
  },
  button:{
    borderRadius:42,
    elevation:5,
    // paddingTop: 24,
    // paddingBottom: 24,
    // paddingLeft: 64,
    // paddingRight: 64,
    height: 50,
    width:110,
    margin: 6,
    marginTop:10
  }
});

export default Store;