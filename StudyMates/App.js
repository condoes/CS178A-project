import React from "react";
import RNDateTimeSelector from "react-native-date-time-scroll-picker";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { NavigationContainer } from "@react-navigation/native";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import { Button, View, Text, StyleSheet } from "react-native";
import Routes from "./routes/Routes";

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Routes />
    </View>
  );
};

export default App;

/* <View style={styles.container}>
        {/* <StatusBar style="auto" /> */

// <CountdownCircleTimer
//   isPlaying
//   duration={7}
//   colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
//   colorsTime={[7, 5, 2, 0]}
// >
//   {({ remainingTime }) => <Text>{remainingTime}</Text>}
// </CountdownCircleTimer>
// </View> */}
