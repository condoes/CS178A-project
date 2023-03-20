import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const SlideItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={item.img} resizeMode="contain" style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.desc}>{item.desc}</Text>
      </View>
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: "center",
    marginTop: -70,
    justifyContent: "center"
  },
  content: {
    paddingHorizontal: 10
  },
  image: {
    flex: 0.3,
    width: "80%",
    marginBottom: "10%"
  },
  title: {
    fontFamily: "FredokaMedium",
    fontSize: 60,
    textAlign: "center"
    //fontWeight: "bold"
  },
  desc: {
    fontFamily: "WorkSansMedium",
    fontSize: 24,
    textAlign: "center",
    paddingHorizontal: 10
    // flex:
  }
});
