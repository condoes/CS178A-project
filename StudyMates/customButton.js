import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const customButton = (props) => {
    return (
        <Pressable 
            style={styles.button} 
            onPress={props.onPressFunction}>
            <Text style={styles.buttonText}>
                {props.title}
            </Text> 
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: { 
      backgroundColor: "#E6E0FF",
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 24,
      height: 56,
      width: 181,
    },
    buttonText: {
      fontFamily: 'WorkSansMedium',
      fontSize: 24,
      color: '#4D558A',
    }
});

export default customButton;