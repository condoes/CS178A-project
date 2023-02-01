import { StoreContext } from "nativewind/dist/style-sheet";
import React from "react";
import { View, Text, StyleSheet, Pressable, Image, ImageBackground} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import customButton from "../customButton";
import { MaterialCommunityIcons, SimpleLineIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { CurrentRenderContext } from "@react-navigation/native";


const Store = ({ navigation }) =>{
    return (   
    <View>

    <ImageBackground source={require('../assets/shop.png')} resizeMode="cover" style={styles.image}>

      <Pressable
      className="mr-auto mt-10 mb-auto ml-5"
      onPress={() => navigation.navigate("Landing")}>
        <AntDesign name="back" size={32} color="black" />
      </Pressable>

      <Text className="mt-24" style={styles.text}> Girly Pop Shop</Text>

      <View style={styles.foodContainer}>
        {/* SHELF 1 */}
        <Image source={require('../assets/food/banana.png')}></Image>
        <Image source={require('../assets/food/cherry.png')}></Image>
        <Image source={require('../assets/food/kiwi.png')}></Image>
      </View>
    
      <View style={styles.foodContainer}>
        {/* SHELF 2 */}
        <Image source={require('../assets/food/waffles.png')}></Image>
        <Image source={require('../assets/food/hotDog.png')}></Image>
      </View>

    </ImageBackground>

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
  text:{
    flex: 1,
    fontFamily: "FredokaMedium",
    fontSize: 52,
    color: 'white',
    textShadowOffset: {width: 2, height: 2},
    textShadowColor:"black",
    textShadowRadius: 1
  }, 
});

export default Store;