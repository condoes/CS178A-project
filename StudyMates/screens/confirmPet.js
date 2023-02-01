import { React, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const ConfirmPet = ({ route, navigation }) => {
  const { name, img } = route.params;
  //   console.log("image:", img);

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
        <View
          className="w-2/3 font-fredoka bg-offwhite items-center rounded-xl mt-4"
          style={styles.shadowProp}
        >
          <Text className="font-fredoka text-2xl mx-4 my-2 text-center">
            {name}
          </Text>
        </View>
        <Image className="my-4" source={img} />

        <View style={styles.buttonContain}>
          <Pressable style={[styles.yesButton, styles.shadowProp]}>
            <Text className="p-4 font-fredoka text-3xl">yes</Text>
          </Pressable>
          <Pressable
            style={[styles.noButton, styles.shadowProp]}
            onPress={() => navigation.navigate("PickPet")}
          >
            <Text className="p-4 font-fredoka text-3xl">no</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  buttonContain: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  yesButton: {
    borderRadius: 24,
    backgroundColor: "#D1EBCB",
    marginRight: 24,
    paddingHorizontal: 6
  },
  noButton: {
    borderRadius: 24,
    backgroundColor: "#FF9F9F",
    paddingHorizontal: 6
  },
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

export default ConfirmPet;
