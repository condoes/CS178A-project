import { React, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SimpleLineIcons, Ionicons, AntDesign } from "@expo/vector-icons";


const Settings = ({ navigation }) => {
    const [musicEnabled, setMusicEnabled] = useState(true);
    const [soundsEnabled, setSoundsEnabled] = useState(true);
    const [vibrationsEnabled, setVibrationEnabled] = useState(true);
    const toggleMusic = () => setMusicEnabled(previousState => !previousState);
    const toggleSounds = () => setSoundsEnabled(previousState => !previousState);
    const toggleVibrations = () => setVibrationEnabled(previousState => !previousState);

    return (
        <LinearGradient
        style={styles.linGrad}
        colors={["#FFE4E4", "#FFB2B2", "#B0B0F8", "#588046", "#206003"]}
        start={{ x: 0, y: 0 }}
        locations={["0.77%", "37.93%", "60.5%", "65.94%", "96.15%"]}
        >
            <Pressable
            className="mr-auto mb-5 ml-5"
            onPress={() => navigation.navigate("Landing")}
            >
                <AntDesign name="back" size={32} color="black" />
            </Pressable>

            
            <View style={styles.title}>
                <Text style={styles.text}>Settings</Text>
            </View>

            <View style={styles.container}>
                <View style={styles.backgroundBox}>
                    <Text style={styles.text}>music</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        // thumbColor={musicEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleMusic}
                        value={musicEnabled}
                    />
                </View>

                <View style={styles.backgroundBox}>
                    <Text style={styles.text}>sounds</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        // thumbColor={soundsEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSounds}
                        value={soundsEnabled}
                    />
                </View>

                <View style={styles.backgroundBox}>
                    <Text style={styles.text}>vibrations</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        // thumbColor={vibrationsEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleVibrations}
                        value={vibrationsEnabled}
                    />
                </View>
            </View>
            
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
  linGrad: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    backgroundColor: '#FFF2d4',
    borderRadius: 15,
    width: '75%',
    height: '7%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '7%',
  },
  text: {
    fontFamily: 'FredokaMedium',
    fontSize: 30,
    color: '#505050',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    // backgroundColor: 'red',
    height: '70%',
  },
  backgroundBox: {
    backgroundColor: '#FFF2D4',
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '18%',
    width: '75%',
    paddingLeft: '5%',
    paddingRight: '5%',
    flexDirection: 'row',
  }
});

export default Settings;