import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const Landing = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => navigation.navigate("TimerPick")}
        title="Start Studying"
      />
      <Text>Landing</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Landing;
