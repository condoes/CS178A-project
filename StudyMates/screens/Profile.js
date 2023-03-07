import { React, useState, useEffect } from "react";
import FadeInOut from 'react-native-fade-in-out';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
  useContext,
  Button,
  Modal,
  modalVisible,
  TouchableOpacity
} from "react-native";
import {
  MaterialCommunityIcons,
  SimpleLineIcons,
  Ionicons,
  AntDesign,
  Entypo
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { db, auth } from "../firebase";

const Profile = ({ route, navigation }) => {
  const [user, setUser] = useState(null);
  const [newUsername, setNewUsername] = useState(null);
  // const [newEmail, setNewEmail] = useState(null);
  // const [newPassword, setNewPassword] = useState(null);

  const getUser = async () => {
    const { uid } = auth.currentUser;
    if (!uid) return;
    const userRef = db.collection("users").doc(uid);
    const doc = await userRef.get();
    const userData = doc.data();
    setUser(userData);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleUpdate = () => {
    const { uid } = auth.currentUser;
    if (newUsername) {
      db.collection("users")
        .doc(uid)
        .update({
          username: newUsername
        });
      getUser();
      console.log('username updated')
    }
  };

  const handleSignout = () => {
    auth.signOut(auth)
    .then(() => {
      navigation.replace("Login");
      console.log("User signed out!");
    })
    .catch(error => alert(error.message))
  }

  const handlePasswordChange = () => {
    auth.sendPasswordResetEmail(user && user.email)
    .catch(error => alert(error.message))
    console.log('password change email sent')
  }

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="flex items-center justify-center">
      <LinearGradient
        className="h-screen w-screen items-center justify-center flex"
        colors={["#E4E5E3", "#FFB2B2", "#C3C3F0"]}
        start={{ x: 0, y: 0 }}
      >
        <Pressable
          className="mr-auto mt-10 mb-auto ml-5"
          onPress={() => navigation.navigate("Landing")}
        >
          <AntDesign name="back" size={32} color="black" />
        </Pressable>

        <View style={styles.topRow}>
          <Text className="text-4xl font-fredoka text-black m-1.5 text-center">
            {user && user.username}'s Profile
          </Text>
        </View>

        
        {/*  */}

        <View style={styles.infoContainer}> 
          <View style={styles.infoView}> 
            {/* <View>
              <Text className="text-6xl font-fredoka text-black m-1.5 text-center"> 
              {user && user.totalStudy}
              </Text>
              <Text className="text-2xl font-fredoka text-black m-1.5 text-center">
                Total Hours Studied
              </Text>

              <Text className="text-1xl font-fredoka text-black m-1.5 text-center">
                Email: {user && user.email}
              </Text>

            </View> */}
            <View>
              <TextInput
                className="text-2xl border border-1 border-darkgray/50 font-worksans p-2 rounded-xl w-1/2 bg-tan/25"
                placeholder="Username"
                autoCorrect={false}
                defaultValue={user && user.username}
                value={newUsername}
                maxLength={10}
                onChangeText={txt => setNewUsername(txt)}
              />
            </View>
              <View style={styles.updateRow}>
                <TouchableOpacity
                  style={[styles.updatebutton, styles.shadowProp]}
                  onPress={handleUpdate}
                >
                  <Text className="text-1xl font-fredoka text-white m-1.5 text-center">
                    update username
                  </Text>
                </TouchableOpacity>
              </View>
            {/* <Text className="text-1xl font-fredoka text-black m-1.5 text-center">
              change username
            </Text> */}

            <View style={styles.emailcontainer}>
              {/* <TextInput
                className="text-1xl border border-1 border-darkgray/50 font-worksans p-2 rounded-xl w-1/2 bg-tan/25"
                placeholder="Email"
                autoCorrect={false}
                defaultValue={user && user.email}
                value={newEmail}
                textContentType="emailAddress"
                // onChangeText={txt => setNewEmail(txt)}
              /> */}
              <Text className="text-2xl font-fredoka text-black m-1.5 text-center">
                your email:
              </Text>
              <Text className="text-2xl font-fredoka text-black m-1.5 text-center">
                {user && user.email}
              </Text>
            </View>
            {/* <Text className="text-1xl font-fredoka text-black m-1.5 text-center">
              change email
            </Text> */}

            {/* <View>
              <TextInput
                className="text-2xl border border-1 border-darkgray/50 font-worksans p-2 rounded-xl w-1/2 bg-tan/25"
                placeholder="Password"
                autoCorrect={false}
                value={newPassword}
                onChangeText={(txt) => setNewPassword(txt)}
              />
            </View>
            <Text className="text-1xl font-fredoka text-black m-1.5 text-center">
              Change Password
            </Text> */}
            <View style={styles.buttomRow}>
              <TouchableOpacity
                style={[styles.longbutton, styles.shadowProp]}
                onPress={handlePasswordChange}>
                <Text className="text-3xl font-fredoka text-white m-1.5 text-center">
                  change password
                </Text>
              </TouchableOpacity> 
            </View>
            {/* <Pressable
              style={[styles.button, styles.shadowProp]}
              onPress={() => changeEmail()}
            >
              <Text className="text-1xl font-fredoka text-black m-1.5 text-center">
                Change Email
              </Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.shadowProp]}
              onPress={() => changePassword()}
            >
              <Text className="text-1xl font-fredoka text-black m-1.5 text-center">
                Change Password
              </Text>
            </Pressable> */}

            <View style={styles.buttomRow}>
              <TouchableOpacity
                style={[styles.button, styles.shadowProp]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text className="text-3xl font-fredoka text-red m-1.5 text-center">
                  sign out
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </LinearGradient>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        
          <View style={styles.container}>
            <View style={styles.modalView}>
              
              <View className="flex flex-row items-center justify-center">
                <Text className="text-2xl font-fredoka text-black m-1.5 text-center">
                  are you sure you want to sign out? :T {'\n'}
                </Text>

              </View>

              <View className="flex flex-row items-center justify-center">
                <TouchableOpacity
                  className="bg-[#D1EBCB] items-center justify-center"
                  style={styles.smallbutton}
                  onPress={handleSignout}
                >
                  <Entypo
                    name="check"
                    size={32}
                    color="white"
                    alignItems="center"
                  />
                </TouchableOpacity>
                <Text>            </Text>
                <TouchableOpacity
                  className="bg-red items-center justify-center"
                  style={styles.smallbutton}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <Entypo
                    name="cross"
                    size={32}
                    color="white"
                    alignItems="center"
                  />
                </TouchableOpacity>
              </View>

            </View>

            {/* </View> :

          actionTriggered === 'EMAIL' ?
          <View style={styles.container}>    

            <View style={styles.modalView}>

              <View className="flex flex-row items-center justify-center"> 
                  <Text className="text-2xl font-fredoka text-black m-1.5 text-center">
                    Are you sure you want to sign out? :T
                  </Text>
                  
                  <Pressable 
                  className = "bg-[#D1EBCB] items-center justify-center" 
                  style = {styles.button} 
                  onPress={()=> {navigation.navigate("Landing")}}>
                    <Entypo  name="check" size={32} color="white" alignItems="center"/>
                  </Pressable>

                  <Pressable 
                  className = "bg-red items-center justify-center" 
                  style = {styles.button} 
                  onPress={()=> {navigation.navigate("Landing")}}>
                    <Entypo name="cross" size={32} color="white" alignItems="center"/>
                  </Pressable>
              </View>

            </View>

          </View> :

          actionTriggered === 'PASSWORD' ?
          <View style={styles.container}>    

          <View style={styles.modalView}>

            <View className="flex flex-row items-center justify-center"> 
                <Text className="text-2xl font-fredoka text-black m-1.5 text-center">
                  Are you sure you want to sign out? :T
                </Text>
                
                <Pressable 
                className = "bg-[#D1EBCB] items-center justify-center" 
                style = {styles.button} 
                onPress={()=> {navigation.navigate("Landing")}}>
                  <Entypo  name="check" size={32} color="white" alignItems="center"/>
                </Pressable>
                <Pressable 
                className = "bg-red items-center justify-center" 
                style = {styles.button} 
                onPress={()=> {navigation.navigate("Landing")}}>
                  <Entypo name="cross" size={32} color="white" alignItems="center"/>
                </Pressable>
            </View>

          </View> */}
          </View>
        
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  linGrad: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1
  },
  topRow: {
    paddingTop: 10,
    paddingBottom: 1
  },
  buttomRow: {
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: 30,
    paddingBottom: 1
  },
  updateRow: {
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: 10,
    paddingBottom: 40
  },
  infoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    top: "15%",
    paddingBottom: 250
  },
  emailcontainer: {
    borderRadius: 20,
    backgroundColor: "#fee7b1",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10,
    width: 280
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: 50
  },
  shadowProp: {
    shadowColor: "#00000",
    shadowOffset: { height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 2
  },
  infoView: {
    backgroundColor: "#FFF2D4",
    borderColor: "#505050",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    fontFamily: "FredokaMedium",
    width: 320,
    height: 550
  },
  modalView: {
    backgroundColor: "#C3C3F0",
    borderColor: "#A7B0E7",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    fontFamily: "FredokaMedium",
    width: 300
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5
  },
  button: {
    backgroundColor: "#E6E0FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    height: 56,
    width: 151,
    zIndex: 3,
  },
  longbutton: {
    backgroundColor: "#E6E0FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    height: 56,
    width: 281,
    zIndex: 3
  },
  smallbutton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    height: 56,
    width: 81,
    zIndex: 3
  },
  updatebutton: {
    backgroundColor: "#E6E0FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    height: 36,
    width: 150,
    zIndex: 3
  },
  buttonText: {
    fontFamily: "Fredoka",
    fontSize: 24,
    color: "#4D558A"
  },
});

export default Profile;
