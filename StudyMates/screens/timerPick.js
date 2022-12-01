import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Pressable, Alert } from "react-native";
import { Timer } from "../Timer";

const TimerPick = () => {
  const [pomoTime, setPomo] = useState(30);
  const [shortBreak, setShort] = useState(5);
  const [longBreak, setLong] = useState(15);
  const increment = () => {
    if (shortBreak < pomoTime) {
      // console.log("short break:" + shortBreak);
      // console.log("\n pomo time: " + pomoTime);

      setShort(shortBreak + 5);
    } else {
      Alert.alert("hold on!", "you can't break longer than you study!");
    }
  };
  const decrement = props => {
    if (props == pomoTime && props > 15) {
      setPomo(props - 5);
    } else if (props == shortBreak && props > 5) {
      setShort(props - 5);
    }
    // if (props == longBreak && props > 5) {
    //   setLong(props - 5);
    // }
  };
  return (
    <View style={styles.container}>
      {/* TIMER SETTINGS TITLE */}
      <View style={styles.titleBackground}>
        <Text style={styles.sectionTitle}>timer settings</Text>
      </View>

      {/* POMODORO SETTINGS SECTION */}
      <View style={styles.popUp}>
        <View style={styles.timerContainer}>
          <Text style={styles.sectionTitle}>pomodoro:</Text>

          <View style={styles.timerSelect}>
            {/* <Button
              onPress={() => {setPomo(pomoTime - 5)}}
              title="-"
            /> */}
            <Pressable
              style={styles.timeModifiers}
              onPress={() => decrement(pomoTime)}
            >
              <Text style={styles.timeModifiers}>-</Text>
            </Pressable>

            <View style={styles.timeTextContainer}>
              <Text style={styles.timeText}>{pomoTime}:00</Text>
            </View>

            <Pressable
              style={styles.timeModifiers}
              onPress={() => setPomo(pomoTime + 5)}
            >
              <Text style={styles.timeModifiers}>+</Text>
            </Pressable>
            {/* <Button
              onPress={() => {setPomo(pomoTime + 5)}}
              title="+"
            /> */}
          </View>
        </View>

        <View style={styles.timerContainer}>
          <Text style={styles.sectionTitle}>short break:</Text>

          <View style={styles.timerSelect}>
            {/* <Button
              onPress={() => {setShort(shortBreak - 5)}}
              title="-"
            /> */}
            <Pressable
              style={styles.timeModifiers}
              onPress={() => decrement(shortBreak)}
            >
              <Text style={styles.timeModifiers}>-</Text>
            </Pressable>

            <View style={styles.timeTextContainer}>
              <Text style={styles.timeText}>{shortBreak}:00</Text>
            </View>

            <Pressable
              style={styles.timeModifiers}
              onPress={() => increment(shortBreak)}
            >
              <Text style={styles.timeModifiers}>+</Text>
            </Pressable>
            {/* <Button
              onPress={() => {setShort(shortBreak + 5)}}
              title="+"
            /> */}
          </View>
        </View>

        <View style={styles.timerContainer}>
          <Text style={styles.sectionTitle}>long break:</Text>

          <View style={styles.timerSelect}>
            {/* <Button
              onPress={() => {
                setLong(longBreak - 5);
              }}
              title="-"
            /> */}
            <Pressable
              style={styles.timeModifiers}
              onPress={() => decrement(longBreak)}
            >
              <Text style={styles.timeModifiers}>-</Text>
            </Pressable>

            <View style={styles.timeTextContainer}>
              <Text style={styles.timeText}>{longBreak}:00</Text>
            </View>

            <Pressable
              style={styles.timeModifiers}
              onPress={() => setLong(longBreak + 5)}
            >
              <Text style={styles.timeModifiers}>+</Text>
            </Pressable>
            {/* <Button
              onPress={() => {
                setLong(longBreak + 5);
              }}
              title="+"
            /> */}
          </View>
        </View>
      </View>

      {/* BUTTONS AT THE END */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>reset</Text>
        </Pressable>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>start</Text>
        </Pressable>
      </View>
      {/* onPress={() => navigation.navigate("TimerPick")} */}
    </View>
  );
};

const styles = StyleSheet.create({
  // FULL PAGE STYLING
  container: {
    flex: 1,
    backgroundColor: "#FFB2B2",
    alignItems: "center",
    justifyContent: "center"
  },

  // "timer settings" POP-UP STYLING
  titleBackground: {
    backgroundColor: "#FFF2D4",
    borderRadius: 15,
    height: 60,
    width: 285,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50
  },

  // POP-UP STLYING
  popUp: {
    backgroundColor: "#FFF2D4",
    borderRadius: 15,
    paddingTop: 7,
    paddingLeft: 16,
    height: 456,
    width: 285
  },
  // EACH TIMER OPTION, INCLUDING TITLE (I.E. "POMODORO:")
  timerContainer: {
    marginBottom: 19
    //backgroundColor: 'red',
  },
  sectionTitle: {
    // TITLE OF EACH MENU SETTING (I.E. "POMODORO:")
    fontFamily: "FredokaMedium",
    fontSize: 28,
    color: "#505050"
  },
  timerSelect: {
    // just the - and + section of the menu options
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
    //backgroundColor: "blue",
  },
  timeTextContainer: {
    // THE TIME CONTAINER
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D7E4F8",
    height: 71,
    width: 108,
    borderRadius: 15,
    marginTop: 19
  },
  timeText: {
    // JUST THE TIME ITSELF
    fontFamily: "FredokaMedium",
    fontSize: 32,
    color: "#505050"
  },
  timeModifiers: {
    margin: 7,
    fontFamily: "FredokaMedium",
    fontSize: 25,
    color: "#505050"
  },

  // BUTTONS AT THE END
  buttonContainer: {
    width: 285,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between"
    //backgroundColor: 'red',
  },
  button: {
    backgroundColor: "#D1EBCB",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    height: 56,
    width: 132
  },
  buttonText: {
    fontFamily: "WorkSansMedium",
    fontSize: 24,
    color: "#4D558A"
  }
});

export default TimerPick;
