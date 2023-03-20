import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "../Components/Slider";
import { AntDesign } from "@expo/vector-icons";

const Tutorial = ({ route, navigation }) => {
  const { img } = route.params;
  return (
    // <LinearGradient
    //   className="h-screen w-screen"
    //   colors={["#E4E5E3", "#FFB2B2", "#C3C3F0"]}
    //   start={{ x: 0, y: 0 }}
    // >
    <View style={styles.contain}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Landing", { img: img })}
      >
        <AntDesign name="close" size={36} style={styles.close} />
      </TouchableOpacity>
      <Slider />
    </View>
    //<Slider />
    // </LinearGradient>
  );
};

const styles = StyleSheet.create({
  contain: {
    backgroundColor: "#FFF2D4"
  },
  close: {
    textAlign: "right",
    marginTop: 70,
    marginRight: 30
  }
});

export default Tutorial;
