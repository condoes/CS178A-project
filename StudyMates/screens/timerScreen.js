import { React, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable, Modal, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { SimpleLineIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { increment } from "@firebase/firestore";
import { auth, db } from "../firebase";

const TimerScreen = ({ route, navigation }) => {
  const { pomoT, shortT, longT, count } = route.params;

  const [isPlaying, setIsPlaying] = useState(true); // countdown timer functions 
  const [key, setKey] = useState(0);
  const [complete, setComplete] = useState(false);
  const [duration, setTime] = useState(pomoT);
  const [PomoModalVisible, setPomoModalVisible] = useState(false);  // modal functions
  const [breakModalVisible, setBreakModalVisible] = useState(false);
  const [compModalVisible, setCompModalVisibe] = useState(false);
  const [endModalVisible, setEndModalVisible] = useState(false); 
  const [currCycleName, setCycleName] = useState('pomodoro'); // cycle naming functions
  const [cycleCount, incCycleCount] = useState(1);
  const [pausePlay, setPausePlay] = useState(false); // pause button 0 - pause 1 - play
  const [currTime, setCurrTime] = useState(0); // current cycle time

  const handleStudyTime = (time) => {
    console.log("time/exp: ", time);
    db.collection("users")
      .doc(auth.currentUser.uid)
      .update({
        totalStudy: increment(time),
        exp: increment(time)
      });
  };

  const handleCoins = (time) => {
    console.log("coins: ", time);
    db.collection("users")
      .doc(auth.currentUser.uid)
      .update({
        coins: increment(time)
      });
  };

  const handlePomoComp = () => {
    // console.log("time/exp: ", time);
    db.collection("users")
      .doc(auth.currentUser.uid)
      .update({
        pomoCycles: increment(1),
      });
  };

  return (
    <View className="flex items-center justify-center">
      <LinearGradient
        className="h-screen w-screen items-center flex z-[1]"
        colors={["#E4E5E3", "#FFB2B2", "#C3C3F0"]}
        start={{ x: 0, y: 0 }}
      >
        <Pressable
          className="mr-auto mt-12 ml-5 z-[3]"
          onPress={() => navigation.navigate("TimerPick")}
        >
          <AntDesign name="back" size={32} color="black" />
        </Pressable>

        <View className="mt-8 mb-16 w-2/3 bg-tan rounded-xl shadow z-[3]">
          <Text className="tracking-widest text-darkgray font-fredoka text-3xl text-center p-2 z-[3]">
            {currCycleName}
          </Text>
        </View>

        <View className="z-[3] mt-[10%] mb-[20%]">
        <CountdownCircleTimer
          key={key}
          isPlaying={isPlaying}
          duration={duration}
          colors={["#E4E5E3"]}
          trailColor={"#B0B0F8"}
          size={230}
          //   colorsTime={[7, 5, 2, 0]}
          strokeWidth={16}
        >
          {({ remainingTime }) => {
            setCurrTime(remainingTime);
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            // const temp_sec = seconds;
            if (minutes == 0 && seconds == 0) {
              if (currCycleName === 'pomodoro') {
                setComplete(true);
                if (complete) {
                  handleStudyTime(pomoT);
                  handleCoins(pomoT);
                }

                //console.log(cycleCount);
                if (cycleCount == 4) {
                  return setCompModalVisibe(true);
                } else {
                  return setPomoModalVisible(true);
                }
              } else if (currCycleName === 'long break') {
                return setBreakModalVisible(true); 
              } else {
                return setBreakModalVisible(true);
              }
            } else if (seconds < 10) {
              setComplete(false);
              return (
                <Text className="text-[#505050] text-5xl font-fredoka">
                  {minutes}:0{seconds}
                </Text>
              );
            } else {
              setComplete(false);
              return (
                <Text className="text-darkgray text-5xl font-fredoka">
                  {minutes}:{seconds}
                </Text>
              );
            }
          }}
          {/* if (remainingTime == 0)
          {
            <Modal>
              <Text>hi</Text>
            </Modal>
          } */}
        </CountdownCircleTimer>
        </View>

        <View className="m-auto flex-row items-center justify-center z-[3]">
          <TouchableOpacity
            className="mx-6 w-1/3 bg-lightpurple rounded-2xl shadow-sm flex-row items-center justify-center z-[3]"
            onPress={() => {
              setIsPlaying(prevPlaying => !prevPlaying);
              setPausePlay(!pausePlay);
            }}
          >
            <SimpleLineIcons name="control-pause" size={18} color="black" />
            <Text className=" font-worksans text-2xl text-center p-2 justify z-[3]">
              {pausePlay? 'play' : 'pause'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="w-1/3 bg-red rounded-2xl shadow flex-row items-center justify-center z-[3]"
          onPress={() => {
            setIsPlaying(prevPlaying => !prevPlaying);
            setEndModalVisible(true);
          }}
          >
            <Ionicons name="stop-outline" size={24} color="black" />
            <Text className="font-worksans text-2xl text-center p-2 justify z-[3]">
              end
            </Text>
          </TouchableOpacity>
        </View>

        <Image
        className="z-[2] absolute top-[15%] right-[40%] w-[70%] h-[13%]"
        source={require("../assets/clouds_1.png")}
        resizeMode="contain"
        />
        <Image
          className="z-[2] absolute top-[40%] left-[76%] w-[57%] h-[13%]"
          source={require("../assets/clouds_2.png")}
          resizeMode="contain"
        />
        <Image
          className="z-[2] absolute bottom-[20%] right-[30%] w-[92%] h-[14%]"
          source={require("../assets/clouds_3.png")}
          resizeMode="contain"
        />
      </LinearGradient>

      <Modal
      animationType="fade"
      transparent={true}
      visible={endModalVisible}
      onRequestClose={() => {
        setEndModalVisible(!endModalVisible);
      }}>
        <BlurView intensity={10} tint="light" style={styles.container}>
          {currCycleName==='pomodoro'?
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Are you sure you want to end?</Text>
              <Text style={styles.textStyle}>You will only earn {pomoT-currTime+(pomoT*(cycleCount-1))} coins if you do.</Text>

              <View style={styles.row1Buttons}>
                <TouchableOpacity style={[styles.buttonYellow, styles.shadowProp]}
                onPress={() => {
                  navigation.navigate("Landing");
                  {handleStudyTime(pomoT-currTime);}
                  {handleCoins(pomoT-currTime);}}}
                >
                  <Text style={styles.buttonTextStyle}>return home</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.buttonYellow, styles.shadowProp]}
                onPress={() => {
                    setEndModalVisible(!endModalVisible);
                    setIsPlaying(!isPlaying);
                  }}
                >
                  <Text style={styles.buttonTextStyle}>continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          : 
            <View style={styles.modalView}>
              <Text style={styles.modalText}>End break?</Text>
              <Text>You will only earn {pomoT*(cycleCount-1)} coins.</Text>

              {/* <View style={styles.row1Buttons}> */}
                <TouchableOpacity style={[styles.buttonYellow, styles.shadowProp]}
                onPress={() => {
                  navigation.navigate("Landing");
                  }}
                >
                  <Text style={styles.buttonTextStyle}>yes, return home</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.buttonYellow, styles.shadowProp]}
                onPress={() => {
                    setEndModalVisible(!endModalVisible);
                    setIsPlaying(!isPlaying);
                  }}
                >
                  <Text style={styles.buttonTextStyle}>no, continue break</Text>
                </TouchableOpacity>
              {/* </View> */}
            </View>
          }
        </BlurView>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={compModalVisible}
        onRequestClose={() => {
          setCompModalVisibe(!compModalVisible);
        }} 
      >
        <BlurView intensity={10} tint="light" style={styles.container}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Cycle Complete!</Text>
            <Text style={styles.textStyle}>You earned {(pomoT * 4)*2} coins for completing a full session.</Text>

            <View style={styles.row1Buttons}>
              <TouchableOpacity style={[styles.buttonYellow, styles.shadowProp]}
              onPress={() => {
                navigation.navigate("Landing")
                {handleCoins((pomoT * 4)); handlePomoComp();}}}
              >
                <Text style={styles.buttonTextStyle}>return home</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.buttonYellow, styles.shadowProp]}
              onPress={() => {
                  setCompModalVisibe(!compModalVisible);
                  setTime(pomoT);
                  setKey(key => !key);
                  setCycleName('pomodoro');
                  incCycleCount(1);
                  {handleCoins((pomoT * 4)); handlePomoComp();}
                }}
              >
                <Text style={styles.buttonTextStyle}>continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={breakModalVisible}
        onRequestClose={() => {
          setBreakModalVisible(!breakModalVisible);
        }}
      >
        <BlurView intensity={10} tint="light" style={styles.container}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{currCycleName} done!</Text>
            <Text style={styles.textStyle}>{4-cycleCount+1} more to complete your focus cycle.</Text>

            <TouchableOpacity
            style={[styles.buttonYellow, styles.shadowProp]}
            onPress={() => {
                setBreakModalVisible(!breakModalVisible);
                setTime(pomoT);
                setKey(key => !key);
                setCycleName('pomodoro');
              }}
              >
              <Text style={styles.buttonTextStyle}>continue</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={PomoModalVisible}
        onRequestClose={() => {
          setPomoModalVisible(!PomoModalVisible);
        }}
      >
        <BlurView intensity={10} tint="light" style={styles.container}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Pomodoro Complete!</Text>
            <Text style={styles.textStyle}>choose your break:</Text>

            <Image
              source={require("../assets/greenHyena2.png")}
              resizeMode="contain"
            />

            <View style={styles.row1Buttons}>
              <TouchableOpacity
                style={[styles.buttonYellow, styles.shadowProp]}
                onPress={() => {
                  setPomoModalVisible(!PomoModalVisible);
                  setTime(shortT);
                  setKey(key => !key);
                  setCycleName('short break');
                  incCycleCount(cycleCount + 1);
                }}
              >
                <Text style={styles.buttonTextStyle}>short break</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.buttonYellow, styles.shadowProp]}
                onPress={() => {
                  setPomoModalVisible(!PomoModalVisible);
                  setTime(longT);
                  setKey(key => !key);
                  setCycleName('long break');
                  incCycleCount(cycleCount + 1);
                }}
              >
                <Text style={styles.buttonTextStyle}>long break</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.buttonRed, styles.shadowProp]}
              onPress={() => {
                setPomoModalVisible(!PomoModalVisible);
                setTime(pomoT);
                setKey(key => !key);
                setCycleName('pomodoro');
                incCycleCount(cycleCount + 1);
              }}
            >
              <Text style={styles.buttonTextStyle}>skip</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 250, 0.2)"
  },
  modalView: {
    backgroundColor: "#D1EBCB",
    borderColor: "#505050",
    borderRadius: 20,
    padding: 26,
    alignItems: "center",
    maxWidth: '80%',
  },
  shadowProp: {
    shadowColor: "#00000",
    shadowOffset: { height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  row1Buttons: {
    flexDirection: "row",
    margin: 4,
  },
  buttonYellow: {
    borderRadius: 24,
    elevation: 2,
    backgroundColor: "#FFF2D4",
    padding: 12,
    margin: 4,
  },
  buttonRed: {
    borderRadius: 24,
    elevation: 2,
    backgroundColor: "#FFDADA",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 32,
    paddingRight: 32,
    margin: 4,
  },
  textStyle: {
    color: "#505050",
    fontFamily: "FredokaMedium",
    fontSize: 17,
    textAlign: "center",
    margin: 15,
  },
  buttonTextStyle: {
    color: "#505050",
    fontFamily: "FredokaMedium",
    fontSize: 17,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 0,
    textAlign: "center",
    fontFamily: "FredokaMedium",
    fontSize: 25,
  }
});

export default TimerScreen;
