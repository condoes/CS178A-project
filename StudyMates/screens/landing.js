import React from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import customButton from "../customButton";

const Landing = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <Pressable style={styles.button} onPress={() => navigation.navigate("TimerPick")}>
        <Text style={styles.buttonText}>Study</Text> 
      </Pressable>

      {/* <customButton onPressFunction={navigation.navigate("TimerPick")}
      title = "study"/> */}
      {/* <Text>Landing</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFB2B2",
    alignItems: "center",
    justifyContent: "center"
  },
  button: { 
    backgroundColor: "#E6E0FF",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    height: 56,
    width: 181,
  },
  buttonText: {
    fontFamily: 'WorkSansMedium',
    fontSize: 24,
    color: '#4D558A',
  }
});

export default Landing;
