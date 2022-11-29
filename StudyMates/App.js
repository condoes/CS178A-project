import React, { useState, useEffect } from "react";
import RNDateTimeSelector from "react-native-date-time-scroll-picker";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { NavigationContainer } from "@react-navigation/native";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import { ImageBackground, Button, View, Text, StyleSheet } from "react-native";
import Routes from "./routes/Routes";
import { AppRegistry } from 'react-native';
import { useFonts } from 'expo-font';
//import customButton from "./customButton";

const App = () => {
  const [loadingApp, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])

  const [loadedFonts] = useFonts ({
    WorkSansMedium: require('./assets/fonts/WorkSans-Medium.ttf'),
    FredokaMedium: require('./assets/fonts/Fredoka-Medium.ttf'),
    FredokaOne: require('./assets/fonts/FredokaOne-Regular.ttf'),
  });

  if(!loadedFonts) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* {loadingApp? 
        <ImageBackground source={require('./assets/loading.png')} resizeMode="cover" 
        style={styles.image}>
          <Text style={styles.title}>StudyMates!</Text>
        </ImageBackground>
        : */}
        <Routes />
      {/* } */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FFB2B2",
    // alignItems: "center",
    // justifyContent: "center"
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 48,
    fontFamily: 'FredokaOne',
    color: '#4D558A',
    paddingBottom: '40%',
  }
});

export default App;

// AppRegistry.registerComponent('StudyMates', () => App);

{/* <View style={styles.container}>
        {<StatusBar style="auto" /> */}

{/* <CountdownCircleTimer
  isPlaying
  duration={7}
  colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
  colorsTime={[7, 5, 2, 0]}
>
  {({ remainingTime }) => <Text>{remainingTime}</Text>}
</CountdownCircleTimer> */}
// </View>}
