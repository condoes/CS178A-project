import React from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Login = ({ route, navigation }) => {
  return (
    <View className="absolute flex bg-pink items-center justify-center m-auto">
      <LinearGradient
        className="h-screen w-screen items-center justify-center flex"
        colors={["#E4E5E3", "#FFB2B2", "#C3C3F0"]}
        start={{ x: 0, y: 0 }}
      >
        <Text className="text-5xl font-fredoka p-2">StudyMates!</Text>
        <TextInput
          className="text-3xl border border-1 border-darkgray/50 font-worksans p-2 rounded-xl w-1/2 bg-tan/25"
          placeholder="email"
          autoComplete="email"
        />
        <TextInput
          className="mt-2 mb-4 text-3xl border border-1 border-darkgray/50 font-worksans p-2 rounded-xl w-1/2 bg-tan/25"
          placeholder="password"
          autoComplete="email"
        />
        <Pressable className="border border-1 p-2 rounded-xl px-4">
          <Text className="text-3xl font-fredoka text-darkgray">login</Text>
        </Pressable>
        <Pressable>
          <Text className="pt-6 underline text-2xl font-fredoka">sign up</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

export default Login;
