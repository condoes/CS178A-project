import { React, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { SimpleLineIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { BlurView } from 'expo-blur';

const TimerScreen = ({ route, navigation }) => {
  const {pomoT, shortT, longT } = route.params;

  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(0);
  const [duration, setTime] = useState(pomoT);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="flex items-center justify-center">
      <LinearGradient
        className="h-screen w-screen items-center flex"
        colors={["#E4E5E3", "#FFB2B2", "#C3C3F0"]}
        start={{ x: 0, y: 0 }}
      >
        <Pressable
          className="mr-auto mt-10 ml-5"
          onPress={() => navigation.navigate("TimerPick")}
        >
          <AntDesign name="back" size={32} color="black" />
        </Pressable>

        <Pressable className="mt-8 mb-16 w-2/3 bg-tan rounded-xl shadow">
          <Text className="tracking-widest text-darkgray font-fredoka text-3xl text-center p-2 ">
            pomodoro
          </Text>
        </Pressable>

        <CountdownCircleTimer
          key={key}
          isPlaying={isPlaying}
          duration={duration}
          colors={["#E4E5E3"]}
          trailColor={"#B0B0F8"}
          size={200}
          //   colorsTime={[7, 5, 2, 0]}
          strokeWidth={16}
        >
          {({ remainingTime }) => {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            if ((minutes == 0) && (seconds == 0)) {
              return (
                setModalVisible(true)
              );
            } else 
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
            className="mx-6 w-1/3 bg-lightpurple rounded-2xl shadow-sm flex-row items-center justify-center"
            onPress={() => setIsPlaying(prevPlaying => !prevPlaying)}
          >
            <SimpleLineIcons name="control-pause" size={18} color="black" />
            <Text className=" font-worksans text-2xl text-center p-2 justify">
              pause
            </Text>
          </Pressable>
          <Pressable className="w-1/3 bg-red rounded-2xl shadow flex-row items-center justify-center">
            <Ionicons name="stop-outline" size={24} color="black" />
            <Text className="font-worksans text-2xl text-center p-2 justify">
              end
            </Text>
          </Pressable>
        </View>
      </LinearGradient>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <BlurView intensity={10} tint='light' style={styles.container}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Pomodoro Complete!</Text>
            <Text style={styles.textStyle}>choose your break:</Text>

            <Image source={require('../assets/greenHyena2.png')} resizeMode="contain"/>

            <View style={styles.row1Buttons}>
              <Pressable
                style={[styles.buttonYellow, styles.shadowProp]}
                onPress={() => {setModalVisible(!modalVisible); setTime(shortT); setKey(key => !key);}}>
                <Text style={styles.textStyle}>short break</Text>
              </Pressable>

              <Pressable
                style={[styles.buttonYellow, styles.shadowProp]}
                onPress={() => {setModalVisible(!modalVisible); setTime(longT); setKey(key => !key);}}>
                <Text style={styles.textStyle}>long break</Text>
              </Pressable>
            </View>

            <Pressable
              style={[styles.buttonRed, styles.shadowProp]}
              onPress={() => {setModalVisible(!modalVisible); setTime(pomoT); setKey(key => !key);}}>
              <Text style={styles.textStyle}>skip</Text>
            </Pressable>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 250, 0.2)",
  },
  modalView: {
    backgroundColor: '#D1EBCB',
    borderColor: '#505050',
    borderRadius: 20,
    padding: 26,
    alignItems: 'center',
  },
  shadowProp: {
    shadowColor: '#00000',
    shadowOffset: {height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  row1Buttons: {
    flexDirection: 'row',
    margin: 4,
  },
  buttonYellow: {
    borderRadius: 24,
    elevation: 2,
    backgroundColor: '#FFF2D4',
    padding: 12,
    margin: 4,
  },
  buttonRed: {
    borderRadius: 24,
    elevation: 2,
    backgroundColor: '#FFDADA',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 32,
    paddingRight: 32,
    margin: 4,
  },
  textStyle: {
    color: '#505050',
    fontFamily: 'FredokaMedium',
    fontSize: 17,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 0,
    textAlign: 'center',
    fontFamily: 'FredokaMedium',
    fontSize: 25,
  },
});

export default TimerScreen;
