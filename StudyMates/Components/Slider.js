import { React, useRef, useState } from "react";
import { View, Text, FlatList, StyleSheet, Animated } from "react-native";
import slides from "../data";
import SlideItem from "./SlideItem";
import Pagination from "./Pagination";

const Slider = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);

  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX
            }
          }
        }
      ],
      {
        useNativeDriver: false
      }
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    //console.log("viewableItems", viewableItems);
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current;

  return (
    <View style={styles.contain}>
      <FlatList
        data={slides}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={slides} scrollX={scrollX} index={index} />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  //   shadowProp: {
  //     shadowColor: "#00000",
  //     shadowOffset: { height: 4 },
  //     shadowOpacity: 0.25,
  //     shadowRadius: 2
  //   }
  contain: {
    justifyContent: "center",
    alignContent: "center"
  },
  card: {
    backgroundColor: "#FFF2D4",
    width: "75%",
    height: "80%",
    alignSelf: "center",
    margin: 20,
    borderRadius: 20
    //alignContent: "center"
    //justifySelf: "center"
  }
});
