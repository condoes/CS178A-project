import { React, useState, useEffect } from "react";
import {
  View,
  Pressable,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons, Entypo, Ionicons } from "@expo/vector-icons";

const BurgerMenu = ({ navigation }) => {
    const [openMenu, setMenu] = useState(false);

    return(
        <View>
        {openMenu ? 
            <View style={[styles.dropDownCont, styles.shadowProp]}>
                <Pressable style={({pressed}) => [styles.menuCont, styles.shadowProp, {backgroundColor: pressed? "#9A9AEC" : "#9F9FDC"}]} 
                onPress={()=>setMenu(!openMenu)}>
                    <Entypo name="menu" size={45} color="#505050"/>
                </Pressable>

                <Pressable 
                style={({pressed}) => [styles.menuItem]}
                onPress={() => {navigation.navigate("TimerPick"); setMenu(!openMenu);}}>
                    <MaterialCommunityIcons name="storefront-outline" size={35} color="#505050" />
                </Pressable> 

                <Pressable
                style={({pressed}) => [styles.menuItem]}
                onPress={() => {navigation.navigate("TimerPick"); setMenu(!openMenu);}}>
                    <Ionicons name="bar-chart-outline" size={35} color="#505050"/>
                </Pressable>

                <Pressable
                style={({pressed}) => [styles.menuItem]}
                onPress={() => {navigation.navigate("TimerPick"); setMenu(!openMenu);}}>
                    <Ionicons name="person-circle-outline" size={35} color="#505050"/>
                </Pressable>  

                <Pressable
                style={({pressed}) => [styles.menuItem]}
                onPress={() => {navigation.navigate("TimerPick"); setMenu(!openMenu);}}>
                    <Ionicons name="settings-outline" size={35} color="#505050"/>
                </Pressable>
            </View> 
        : 
            <Pressable style={({pressed}) => [styles.menuCont, styles.shadowProp, {backgroundColor: pressed? "#9A9AEC" : "#9F9FDC"}]} 
            onPress={()=>setMenu(!openMenu)}>
                <Entypo name="menu" size={45} color="#505050"/>
            </Pressable>
        }
        </View>
    );
};

const styles = StyleSheet.create({
  menuCont: {
    height: 58,
    width: 58,
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 15,
  },
  shadowProp: {
    shadowColor: '#00000',
    shadowOffset: {height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  dropDownCont: {
    backgroundColor: "#CBCBF7",
    height: 58,
    width: 58,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 15, 
    width: 58,
    height: 340,
    paddingBottom: 20,
  },
});

export default BurgerMenu;