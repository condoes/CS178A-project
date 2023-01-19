import React from "react";
import { View, Text, StyleSheet, Pressable, Image, ImageBackground} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import customButton from "../customButton";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Landing = ({ navigation }) => {
  return (
    <LinearGradient
    style={styles.linGrad}
    colors={["#FFE4E4", "#FFB2B2", "#B0B0F8", "#588046", "#206003"]}
    start={{ x: 0, y: 0 }}
    locations={["0.77%", "37.93%", "60.5%", "65.94%", "96.15%"]}
    >
      {/* <ImageBackground source={require('../assets/callout.png')} resizeMode="cover" style={styles.image}>
      </ImageBackground> */}
      
      {/* https://reactnative.dev/docs/images */}
      <Image source={require('../assets/greenHyena2.png')} />

      {/* <ImageBackground source={require('../assets/calloutBubble.png')} 
        style={styles.image}>
          <Text>hey lol</Text>
      </ImageBackground> */}

      <Pressable style={[styles.button, styles.shadowProp]} onPress={() => navigation.navigate("TimerPick")}>
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
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    backgroundColor: "red",
  },
  shadowProp: {
    shadowColor: '#00000',
    shadowOffset: {height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  button: { 
    backgroundColor: "#E6E0FF",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    height: 56,
    width: 181,
  },
  roundButton: {
    backgroundColor: "#E6E0FF",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:100,
    padding: 10,
  },
  buttonText: {
    fontFamily: 'WorkSansMedium',
    fontSize: 24,
    color: '#4D558A',
  }
});

export default Landing;
