import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, StyleSheet, ScrollView, useColorScheme } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemeContext } from "@/context/ThemeContext";
import { FontAwesome5 } from '@expo/vector-icons'; // Importing FontAwesome for icons
import Animated, { Easing, withRepeat, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated'; // Import for animation

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

    // Create rotation shared value
    const rotation = useSharedValue(0);

    // Animation for rotating the spinner
    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, { duration: 1500, easing: Easing.linear }),
            -1, // Repeat infinitely
            false
        );
    }, [rotation]);

    // Animated style for the spinner
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }]
        };
    });

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
            {/* Image at the top */}
            <Image source={{ uri: experience.image }} style={styles.image} />

            {/* Company and Student Details */}
            <View style={styles.detailsContainer}>
                <Text style={styles.companyName}>{experience.companyName}</Text>
                <Text style={styles.studentName}>{experience.userName}</Text>
            </View>

            {/* Info Rows with Icons */}
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

            {/* Detailed Experience Description */}
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
            justifyContent: 'center',  // Centers the content vertically
            alignItems: 'center',      // Centers the content horizontally
            padding: 20,
        },
        scrollView: {
            flexGrow: 1,
            backgroundColor: theme.background,
            paddingVertical: 10,
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
            height: 200,
            borderRadius: 10,
            marginTop: 30,
            marginBottom: 20,
            resizeMode: "contain",
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
            flexWrap: "wrap", // Wrap rows if they overflow
            justifyContent: "space-between",
            marginBottom: 10, // Spacing between rows
        },
        row: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.cardBackground,
            padding: 15,
            borderRadius: 10,
            width: "48%", // Each icon + text pair takes up half the space of the row
            marginVertical: 5, // Adjusts vertical spacing between rows
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
            marginHorizontal: 15, // Adjusted horizontal margin
        },
        text: {
            fontSize: 18,
            color: theme.text,
            fontWeight: 500,
        },
    });
}
