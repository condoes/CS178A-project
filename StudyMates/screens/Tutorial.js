import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Tutorial = ({ route, nvagigation }) => {
  return (
    <LinearGradient
      className="h-screen w-screen items-center justify-center flex"
      colors={["#E4E5E3", "#FFB2B2", "#C3C3F0"]}
      start={{ x: 0, y: 0 }}
    >
      <View
        className="w-9/12 h-1/2 bg-tan items-center justiy-center rounded-xl flex"
        style={styles.shadowProp}
      >
        <Text className="font-fredoka text-3xl">stay focused</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: "#00000",
    shadowOffset: { height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 2
  }
});

export default Tutorial;
