import {React, useState, useEffect} from "react";
import { View, Text, Pressable, ScrollView, Image, StyleSheet, Line, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { auth, db } from "../firebase";
import {AntDesign} from "@expo/vector-icons";
import {
  ProgressChart,
  BarChart,
  ContributionGraph,
  PieChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const Analytics = ({ route, navigation }) => {
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
    };
    
    const [user, setUser] = useState(null);
    const [img, setImg] = useState(null);
    const [pet, setPet] = useState(null);

    const getUser = async () => {
        const { uid } = auth.currentUser;
        if (!uid) return
        
        const userRef = db.collection("users").doc(uid);
        const doc = await userRef.get();
        const userData = doc.data();
        setUser(userData);

        const petid = userData.petid;
        const petRef = db.collection("pets").doc(petid);
        const petDoc = await petRef.get();
        const petData = petDoc.data();
        setPet(petData); 

        petData.type === "fox"
        ? setImg(require("../assets/pinkFox.png"))
        : petData.type === "tiger"
        ? setImg(require("../assets/redTiger.png"))
        : setImg(require("../assets/greenHyena2.png"));
    };

    useEffect(() => {
        getUser();
    }, []);

    const data = {
        data: [user && user.pomoCycles/100, user && user.coins/100, user && user.totalStudy/100,]
    };

    const dataBar = {
        labels: ["Mun", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
        datasets: [{ data: [20, 45, 28, 80, 99, 43,20] }]
    };

    const commitsData = [
        { date: "2023-03-06", count: 1 },
        { date: "2023-03-03", count: 3 },
    ];

    const dataPie = [
    {
        name: "12",
        population: 3,
        color: "rgba(255, 255, 255, 0.8)",
    },
    {
        name: "blank12",
        population: 0.25,
        color: "rgba(255, 255, 255, 0)",
    },
    {
        name: "1",
        population: 3,
        color: "rgba(255, 255, 255, 0.16)",
    },
    {
        name: "blank1",
        population: 0.25,
        color: "rgba(255, 255, 255, 0)",
    },
    {
        name: "2",
        population: 3,
        color: "rgba(255, 255, 255, 0.24)",
    },
    {
        name: "blank2",
        population: 0.25,
        color: "rgba(255, 255, 255, 0)",
    },
    {
        name: "3",
        population: 3,
        color: "rgba(255, 255, 255, 0.32)",
    },
    {
        name: "blank3",
        population: 0.25,
        color: "rgba(255, 255, 255, 0)",
    },
    {
        name: "4",
        population: 3,
        color: "rgba(255, 255, 255, 0.4)",
    },
    {
        name: "blank4",
        population: 0.25,
        color: "rgba(255, 255, 255, 0)",
    },
    {
        name: "5",
        population: 3,
        color: "rgba(255, 255, 255, 0.48)",
    },
    {
        name: "blank5",
        population: 0.25,
        color: "rgba(255, 255, 255, 0)",
    },
    {
        name: "6",
        population: 3,
        color: "rgba(255, 255, 255, 0.56)",
    },
    {
        name: "blank6",
        population: 0.25,
        color: "rgba(255, 255, 255, 0)",
    },
    {
        name: "7",
        population: 3,
        color: "rgba(255, 255, 255, 0.64)",
    },
    {
        name: "blank7",
        population: 0.25,
        color: "rgba(255, 255, 255, 0)",
    },
    {
        name: "8",
        population: 3,
        color: "rgba(255, 255, 255, 0.72)",
    },
    {
        name: "blank8",
        population: 0.25,
        color: "rgba(255, 255, 255, 0)",
    },
    {
        name: "9",
        population: 3,
        color: "rgba(255, 255, 255, 0.8)",
    },
    {
        name: "blank9",
        population: 0.25,
        color: "rgba(255, 255, 255, 0)",
    },
    {
        name: "10",
        population: 3,
        color: "rgba(255, 255, 255, 0.88)",
    },
    {
        name: "blank10",
        population: 0.25,
        color: "rgba(255, 255, 255, 0)",
    },
    {
        name: "11",
        population: 3,
        color: "rgba(255, 255, 255, 0.96)",
    },
    {
        name: "blank11",
        population: 0.25,
        color: "rgba(255, 255, 255, 0)",
    }
    ];

    return (
        <LinearGradient
            className="h-screen w-screen flex z-[1]"
            colors={["#E4E5E3", "#FFB2B2", "#C3C3F0"]}
            start={{ x: 0, y: 0 }}
        >
        <Pressable
          className="mr-auto mt-12 ml-5 z-[3]"
          onPress={() => navigation.navigate("Landing")}
        >
          <AntDesign name="back" size={32} color="black" />
        </Pressable>
        <ScrollView>
        <View className="flex flex-col justify-center gap-y-5 ">
            {/* Top Info */}
            <View className="flex flex-row justify-around items-center">
                {/* Text */}
                <View className = "flex flex-col ml-[8%] justify-between">
                    <View className="mb-[20%]">
                        <Text className="text-3xl font-fredoka text-white text-left">
                            Hello, {user && user.username}
                        </Text>
                        <Text className="text-2xl font-fredoka text-white text-left">
                            and {pet && pet.name}
                        </Text>
                    </View>

                    <View>
                        <Text className="text-base font-fredoka text-white text-left">
                            Total Focus Time: {user && user.totalStudy} 
                        </Text>
                        <Text className="text-base font-fredoka text-white text-left">
                            Coins Earned: {user && user.coins}
                        </Text>
                        <Text className="text-base font-fredoka text-white text-left">
                            Pomodoros Complete: {user && user.pomoCycles} 
                        </Text>
                    </View>
                </View>

                {/* Circle */}
                <View className="flex justify-end items-end">
                    <ProgressChart
                        data={data}
                        width={screenWidth/2}
                        height={220}
                        strokeWidth={12}
                        radius={12}
                        chartConfig={chartConfig}
                        hideLegend={true}
                    />
                </View>
            </View>

            <View
            style={{
                borderBottomColor: 'white',
                borderBottomWidth: 1,
                marginHorizontal: '6%',
                marginBottom: '5%',
            }}
            />

            {/* Pie Chart */}
            <View className="items-center mb-[10%]">
                <Text className="text-xl font-fredoka text-white text-center">
                Your Days at a Glance
                </Text>
                
                <PieChart
                data={dataPie}
                width={screenWidth-(screenWidth/5)}
                height={220}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                center={[80,10]}
                hasLegend={false}
                absolute
                />
            </View>

            {/* bar chart */}
            <View className="flex-col items-center mb-[10%]">
                <Text className="text-xl font-fredoka text-white text-center mb-10">
                    Your Habits This Week
                </Text>

                <BarChart
                data={dataBar}
                width={screenWidth-(40)}
                height={350}
                chartConfig={chartConfig}
                verticalLabelRotation={90}
                />
            </View>
            
            {/* contribution graph */}
            <View className="items-center mb-[25%]">
                <Text className="text-xl font-fredoka text-white text-left mb-5">
                    Your Month at a Glance
                </Text>

                <ContributionGraph
                values={commitsData}
                endDate={new Date("2023-03-10")}
                numDays={105}
                width={screenWidth}
                height={200}
                chartConfig={chartConfig}
                />
            </View>
        </View>
        </ScrollView>

      </LinearGradient>
    );
};

export default Analytics;