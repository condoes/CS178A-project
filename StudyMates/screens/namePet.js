import { React, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";

const NamePet = ({ route, navigation }) => {
  const { name, img } = route.params;
  //   console.log("img:", img);
  const [newName, setNewName] = useState({ name });
  //   console.log("name:", name);
  //   console.log("new name:", newName);

  return (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset="-200">
      <LinearGradient
        className="h-screen w-screen items-center justify-center flex"
        colors={["#E4E5E3", "#FFB2B2", "#C3C3F0"]}
        start={{ x: 0, y: 0 }}
      >
        <View
          className="w-9/12 h-3/5 bg-tan items-center justiy-center rounded-xl flex"
          style={styles.shadowProp}
        >
          <Text className="font-fredoka text-3xl p-4 mt-4 text-center">
            Choose a name for your StudyMate:
          </Text>
          <Image className="my-4" source={img} />
          <TextInput
            className="mt-2 mb-4 text-3xl border border-1 border-darkgray/50 font-worksans p-2 rounded-full w-2/3 bg-tan/25"
            defaultValue={name}
            onChangeText={text => setNewName(text)}
            value={newName}
            maxLength={15}
          />
          <Pressable
            style={[styles.confirmButton, styles.shadowProp]}
            onPress={() => navigation.navigate("Landing", { img: img })}
          >
            <Text className="font-fredoka text-3xl">confirm</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  confirmButton: {
    borderRadius: 24,
    backgroundColor: "#D1EBCB",
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginTop: 10
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

export default NamePet;
