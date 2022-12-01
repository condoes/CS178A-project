import { React, useState } from "react";
import { View, Text, StatusBar, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
// import { pomoTime } from "./timerPick";

const TimerScreen = ({ route, navigation }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  return (
    <View className="flex items-center justify-center">
      <LinearGradient
        className="h-screen w-screen items-center flex"
        colors={["#E4E5E3", "#FFB2B2", "#C3C3F0"]}
        start={{ x: 0, y: 0 }}
      >
        <Pressable className="m-16 w-1/2 bg-tan rounded-xl shadow">
          <Text className="tracking-widest text-darkgray font-fredoka text-2xl text-center p-2 ">
            pomodoro
          </Text>
        </Pressable>
        <CountdownCircleTimer
          isPlaying={isPlaying}
          duration={route.params}
          colors={["#E4E5E3"]}
          trailColor={"#B0B0F8"}
          size={200}
          //   colorsTime={[7, 5, 2, 0]}
          strokeWidth={16}
        >
          {({ remainingTime }) => {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            if (seconds < 10) {
              return (
                <Text className="text-[#505050] text-5xl font-fredoka">
                  {minutes}:0{seconds}
                </Text>
              );
            } else {
              return (
                <Text className="text-darkgray text-5xl font-fredoka">
                  {minutes}:{seconds}
                </Text>
              );
            }
          }}
        </CountdownCircleTimer>
        <View className="m-auto flex-row items-center justify-center">
          <Pressable
            className="mx-6 w-1/3 bg-lightpurple rounded-2xl shadow"
            onPress={() => setIsPlaying(prevPlaying => !prevPlaying)}
          >
            <Text className=" font-worksans text-2xl text-center p-2 justify">
              pause
            </Text>
          </Pressable>
          <Pressable className="w-1/3 bg-red rounded-2xl shadow">
            <Text className="font-worksans text-2xl text-center p-2 justify">
              end
            </Text>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
};

export default TimerScreen;
