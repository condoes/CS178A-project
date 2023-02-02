import { React, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import {FontAwesome5, MaterialIcons} from "@expo/vector-icons"

const Coins = (props) => {
    return (
        <View style={styles.container}>
            {/* <FontAwesome5 name='coins' size={25} color='#505050'></FontAwesome5> */}
            <MaterialIcons name='attach-money' size={20} color='#505050' style={styles.icon}/>
            <Text style={styles.coinText}>{props.numCoins} c</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: 100,
        marginTop: 8,
        // backgroundColor: 'red',
    },
    coinText: {
        fontFamily: "FredokaMedium",
        fontSize: 23,
        color: "#505050",
    },
    icon: {
        borderColor: '#505050',
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Coins;