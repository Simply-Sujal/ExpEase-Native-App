import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, StyleSheet, ScrollView, useColorScheme } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemeContext } from "@/context/ThemeContext";
import { FontAwesome5 } from '@expo/vector-icons';
import Animated, { Easing, withRepeat, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

const ExpDetails = () => {
    const { id } = useLocalSearchParams();
    const { theme, setColorScheme, colorScheme } = useContext(ThemeContext);
    const systemColorScheme = useColorScheme();

    const [experience, setExperience] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (systemColorScheme !== colorScheme) {
            setColorScheme(systemColorScheme);
        }
    }, [systemColorScheme]);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const response = await fetch(`https://exp-ease-backend.vercel.app/api/v1/experience/company/experience/${id}`);
                const data = await response.json();
                setExperience(data.experience);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };

        fetchExperience();
    }, [id]);

    const styles = createStyles(theme, colorScheme);

    const rotation = useSharedValue(0);
    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, { duration: 1500, easing: Easing.linear }),
            -1,
            false
        );
    }, [rotation]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }]
    }));

    if (loading) {
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.spinnerContainer, animatedStyle]}>
                    <FontAwesome5 name="spinner" size={40} color={theme.text} style={styles.loaderIcon} />
                </Animated.View>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (!experience) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Experience not found!</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <Image
                source={{ uri: experience.image || "https://img.freepik.com/free-vector/hand-drawn-friends-videoconferencing-scene_23-2148831007.jpg?t=st=1736155734~exp=1736159334~hmac=2c31e6780c84111ab725c8b598c55288052828b38fbf95b291a8118119bda7a2&w=1060" }}
                style={styles.image}
            />

            <View style={styles.detailsContainer}>
                <Text style={styles.companyName}>{experience.companyName}</Text>
                <Text style={styles.studentName}>{experience.userName}</Text>
            </View>

            <View style={styles.rowContainer}>
                <View style={styles.row}>
                    <FontAwesome5 name="user-tie" size={18} color={colorScheme === "dark" ? "white" : "#8986f7"} />
                    <Text style={styles.rowText}>{experience.role}</Text>
                </View>
                <View style={styles.row}>
                    <FontAwesome5 name="video" size={18} color={colorScheme === "dark" ? "white" : "#8986f7"} />
                    <Text style={styles.rowText}>{experience.interviewMode}</Text>
                </View>
                <View style={styles.row}>
                    <FontAwesome5 name="code" size={18} color={colorScheme === "dark" ? "white" : "#8986f7"} />
                    <Text style={styles.rowText}>{experience.numberOfRounds} Rounds</Text>
                </View>
                <View style={styles.row}>
                    <FontAwesome5 name="school" size={18} color={colorScheme === "dark" ? "white" : "#8986f7"} />
                    <Text style={styles.rowText}>{experience.collegeName}</Text>
                </View>
                <View style={styles.row}>
                    <FontAwesome5 name="calendar-alt" size={18} color={colorScheme === "dark" ? "white" : "#8986f7"} />
                    <Text style={styles.rowText}>{experience.yearOfHiring} Batch</Text>
                </View>
                <View style={styles.row}>
                    <FontAwesome5 name="coffee" size={18} color={colorScheme === "dark" ? "white" : "#8986f7"} />
                    <Text style={styles.rowText}>{experience.offerStatus}</Text>
                </View>
            </View>

            <Text style={styles.experienceDetails}>
                Details: {experience.experienceDetails}
            </Text>
        </ScrollView>
    );
};

export default ExpDetails;

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        scrollView: {
            flexGrow: 1,
            backgroundColor: theme.background,
            paddingVertical: 10,
            paddingHorizontal: 10,
        },
        loaderIcon: {
            transform: [{ rotate: '0deg' }],
        },
        spinnerContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
        },
        loadingText: {
            fontSize: 18,
            color: theme.text,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        image: {
            width: "100%",
            height: 250,
            borderRadius: 12,
            marginTop: 30,
            marginBottom: 20,
            resizeMode: "cover",
            // borderWidth: 1,
            // borderColor: theme.cardBorder,
        },
        detailsContainer: {
            marginBottom: 20,
            alignItems: "center",
        },
        companyName: {
            fontSize: 32,
            fontWeight: "bold",
            color: theme.text,
            marginBottom: 10,
            textAlign: "center",
        },
        studentName: {
            fontSize: 24,
            color: theme.text,
            textAlign: "center",
            fontWeight: 500,
        },
        rowContainer: {
            flexDirection: "column",
            justifyContent: "space-between",
            marginBottom: 10,
        },
        row: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.cardBackground,
            padding: 15,
            borderRadius: 10,
            marginBottom: 5,
            shadowColor: theme.text,
            shadowOpacity: 0.1,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
        },
        rowText: {
            fontSize: 16,
            color: theme.text,
            marginLeft: 10,
            fontWeight: 500,
        },
        experienceDetails: {
            fontSize: 17,
            color: theme.text,
            lineHeight: 21,
            textAlign: "justify",
            marginTop: 20,
            marginHorizontal: 15,
            fontWeight: 400,
        },
        text: {
            fontSize: 18,
            color: theme.text,
            fontWeight: 500,
        },
    });
}
