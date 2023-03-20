import { React, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import {increment} from "@firebase/firestore";
import { db, auth } from "../firebase";

const InventoryItem = (props) => {
    const [amount, setAmount] = useState(props.amount);
    const [item, setItem] = useState(null);
    const [display, setDisplay] = useState(true);

    const updateUser = () => {
        const { uid } = auth.currentUser;

        var inventoryUpdate = {};
        inventoryUpdate[`inventory2.${props.item}`] = increment(-1);

        db.collection("users")
        .doc(uid)
        .update(inventoryUpdate);
    };
   
    useEffect(() => {
        if (props.amount === undefined) {
            setDisplay(false);
        } 
        if (props.amount <= 0) {
            setDisplay(false);
        }  
        props.item === "cherry" ? setItem(require("../assets/food/cherry.png"))
        : props.item === "banana" ? setItem(require("../assets/food/banana.png"))
        : props.item === "hotDog" ? setItem(require("../assets/food/hotDog.png"))
        : props.item === "kiwi" ? setItem(require("../assets/food/kiwi.png"))
        : setItem(require("../assets/food/waffles.png"))
    }, []);

    const decAmount = () => {
        if (amount > 0) {
            setAmount(amount-1);
        } else {
            setDisplay(false);
        }
    };

    return (
        <View>
        {display?
            <View style={styles.container}>
                <TouchableOpacity style={styles.fruit}
                onPress={() => {updateUser(); 
                if(amount == 1) {
                    setDisplay(false);
                } else {
                    decAmount();
                }
                }}>
                    {/* {console.log(item)} */}
                    <Image source={item}
                    resizeMode="cover"/>
                </TouchableOpacity>

                {/* <Pressable style={styles.amountContainer}
                onPress={() => decAmount(amount-1)}> */}
                <View style={styles.amountContainer} >
                <Text className="text-2xl"style={styles.amountText}>
                        x{amount}
                    </Text>
                </View>
                {/* </Pressable> */}
            </View> 
        :null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        marginHorizontal: 30,
        marginTop: 40,
    },
    fruit: {
        zIndex: 2,
        position: 'absolute',
        marginBottom: 10,
    },
    amountContainer:{
        backgroundColor: 'rgba(250,250,250, 0.75)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 45,
        borderRadius: '100%',
        flexDirection: 'row',
        zIndex: 3,
        top: '111%',
        left: '110%',
    },
    amountText: {
        fontFamily: 'FredokaMedium',
        fontSize: '19%',
        color: 'black',
        paddingHorizontal: '10%',
        zIndex: 3,
        position: 'absolute',
    },
});

export default InventoryItem;