import { React, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
} from "react-native";

const LifeBar = (props) => {
    return (
        <View style={styles.fullBar}>
            <View style={styles.currBar} width = {props.percent * 170}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    fullBar: {
    // BCBCBC
    backgroundColor: '#BCBCBC',
    height: 32,
    width: 170,
    maxWidth: 170,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  currBar: {
    // FFE456
    backgroundColor: '#FFE456',
    borderRadius: 10,
    height: 32,
    maxWidth: 170,
    borderColor: '#BCBCBC',
    borderWidth: 2,
  },
});

export default LifeBar;