import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Timer } from "../Timer";

const TimerPick = () => {
  const [pomoTime, setPomo] = useState(30);
  const [shortBreak, setShort] = useState(5);
  const [longBreak, setLong] = useState(15);
  return (
    <View style={styles.container}>
      {/* <Text>TimerPick</Text> */}
      <Text>pomodoro:</Text>
      <View style = {{flexDirection:"row"}}>
        <Button
          onPress={() => {setPomo(pomoTime - 5)}}
          title="-"
        />
        <Text>{pomoTime}</Text>
        <Button
          onPress={() => {setPomo(pomoTime + 5)}}
          title="+"
        />
        </View>
      <Text></Text>
      <Text>short break:</Text>
      <View style = {{flexDirection:"row"}}>
        <Button
          onPress={() => {setShort(shortBreak - 5)}}
          title="-"
        />
        <Text>{shortBreak}</Text>
        <Button
          onPress={() => {setShort(shortBreak + 5)}}
          title="+"
        />
      </View>
      <Text></Text>
      <Text>long break:</Text>
      <View style = {{flexDirection:"row"}}>
        <Button
          onPress={() => {setLong(longBreak - 5)}}
          title="-"
        />
        <Text>{longBreak}</Text>
        <Button
          onPress={() => {setLong(longBreak + 5)}}
          title="+"
        />
      </View>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Button
        // onPress={() => navigation.navigate("Timer")}
        title="Start!"
      />
    </View>
  );
};

// const pomoDec = () => {
//   if(pomoTime > 0){
//       setControls({
//         pomoTime: pomoTime - 1,
//       });
//   }

// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default TimerPick;
