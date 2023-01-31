import { React, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const PickPet = () => {
  return (
    <LinearGradient
      className="h-screen w-screen items-center justify-center flex"
      colors={["#E4E5E3", "#FFB2B2", "#C3C3F0"]}
      start={{ x: 0, y: 0 }}
    >
      <View
        className="w-9/12 h-5/6 bg-tan items-center justiy-center rounded-xl flex"
        style={styles.shadowProp}
      >
        <View
          className="w-2/3 font-fredoka bg-offwhite items-center rounded-xl mt-4"
          style={styles.shadowProp}
        >
          <Text className="font-fredoka text-2xl mx-4 my-2">
            Choose your StudyMate!
          </Text>
        </View>
        <View className="h-5/6 w-full py-4">
          <Image
            style={styles.image}
            source={require("../assets/pinkFox.png")}
          />
          <Image
            style={styles.image}
            source={require("../assets/redTiger.png")}
          />
          <Image
            style={styles.image}
            source={require("../assets/greenHyena2.png")}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: "contain"
  },
  shadowProp: {
    shadowColor: "#00000",
    shadowOffset: { height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 2
  }
});

export default PickPet;
