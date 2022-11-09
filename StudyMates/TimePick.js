import RNDateTimeSelector from "react-native-date-time-scroll-picker";
//import { ViewPropTypes } from "deprecated-react-native-prop-types";
import { Button, View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const dataSet = {
  data: {
    firstColumn: [...Array(6).keys()].map((item, idx) => {
      return { value: item, index: idx };
    }),
    secondColumn: [...Array(60).keys()].map((item, idx) => {
      return { value: item, index: idx };
    }),
    thirdColumn: [...Array(60).keys()].map((item, idx) => {
      return { value: item, index: idx };
    })
  },
  initials: [1, 2, 5]
};

const TimePick = () => {
  return (
    <RNDateTimeSelector
      dataSet={dataSet}
      onValueChange={value => {
        console.log(" On value Change : --->  ", value);
      }}
      containerStyle={{
        alignSelf: "center",
        borderWidth: 0,
        borderColor: "transparent",
        borderRadius: 0,
        height: wp(61.5)
      }}
    />
  );
};

export default TimePick;
