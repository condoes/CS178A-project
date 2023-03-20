import { React, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useContext,
  Button,
  Modal,
  modalVisible,
  TouchableOpacity ,
  TextInput
} from "react-native";
import { MaterialCommunityIcons, SimpleLineIcons, Ionicons, AntDesign , Entypo} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { db, auth } from "../firebase";

const ForgotPassword = ({ route, navigation }) => {

    const [email, setEmail] = useState("");

    const handlePasswordChange = () => {
        auth.sendPasswordResetEmail(email)
        .then(navigation.replace("Login"))
        .catch(error => alert(error.message))
        console.log('password change email sent')
    }

    return(
    <View className="flex items-center justify-center">
        <LinearGradient
        className="h-screen w-screen items-center justify-center flex"
        colors={["#E4E5E3", "#FFB2B2", "#C3C3F0"]}
        start={{ x: 0, y: 0 }}
        >
        {/* <Pressable
        className="mr-auto mt-10 mb-auto ml-5"
        onPress={() => navigation.navigate("Profile")}>
            <AntDesign name="back" size={32} color="black" />
        </Pressable> */}
        <Text className="text-4xl font-fredoka text-black m-1.5 text-center">password reset</Text>
        <Text></Text>
        <TextInput
        className="text-2xl border border-1 border-darkgray/50 font-worksans p-2 rounded-xl w-1/2 bg-tan/25"
        placeholder="email"
        onChangeText={text => setEmail(text)}
        value={email}
        autoComplete="email"
        />
        <Text></Text>
        <Pressable
          className="border border-1 p-2 rounded-xl px-4"
          onPress={handlePasswordChange}
        >
          <Text className="text-3xl font-fredoka text-darkgray">send email</Text>
        </Pressable>

        </LinearGradient>
    </View>
    );
    
};

const styles = StyleSheet.create({
    
});


export default ForgotPassword;