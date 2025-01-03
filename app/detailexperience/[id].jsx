import React, { useEffect, useContext } from "react";
import { View, Text, Image, StyleSheet, ScrollView, useColorScheme } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { interviewexp } from "@/data/interviewexp"; // Adjust the import path
import { ThemeContext } from "@/context/ThemeContext";
import { FontAwesome5 } from '@expo/vector-icons'; // Importing FontAwesome for icons

const ExpDetails = () => {
    const { id } = useLocalSearchParams();

    const { theme, setColorScheme, colorScheme } = useContext(ThemeContext);
    const systemColorScheme = useColorScheme();

    useEffect(() => {
        if (systemColorScheme !== colorScheme) {
            setColorScheme(systemColorScheme);
        }
    }, [systemColorScheme]);

    // Find the interview experience by ID
    const experience = interviewexp.find((item) => item.id === parseInt(id));

    if (!experience) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Experience not found!</Text>
            </View>
        );
    }

    const styles = createStyles(theme, colorScheme);

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            {/* Image at the top */}
            <Image source={{ uri: experience.image }} style={styles.image} />

            {/* Company and Student Details */}
            <View style={styles.detailsContainer}>
                <Text style={styles.companyName}>{experience.companyName}</Text>
                <Text style={styles.studentName}>{experience.nameOfTheStudent}</Text>
            </View>

            {/* Info Rows with Icons */}
            <View style={styles.row}>
                <FontAwesome5 name="user-tie" size={18} color={theme.text} />
                <Text style={styles.rowText}>{experience.role}</Text>
            </View>

            <View style={styles.row}>
                <FontAwesome5 name="video" size={18} color={theme.text} />
                <Text style={styles.rowText}>{experience.interviewMode}</Text>
            </View>

            <View style={styles.row}>
                <FontAwesome5 name="code" size={18} color={theme.text} />
                <Text style={styles.rowText}>{experience.numberOfRounds} Rounds</Text>
            </View>

            <View style={styles.row}>
                <FontAwesome5 name="school" size={18} color={theme.text} />
                <Text style={styles.rowText}>{experience.collegeName}</Text>
            </View>

            <View style={styles.row}>
                <FontAwesome5 name="calendar-alt" size={18} color={theme.text} />
                <Text style={styles.rowText}>{experience.yearOfHiring}</Text>
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
            paddingHorizontal: 15,
            paddingVertical: 10,
        },
        scrollView: {
            flexGrow: 1,
            backgroundColor: theme.background,
            paddingVertical: 10,
        },
        image: {
            width: "100%",
            height: 200,
            borderRadius: 10,
            marginTop: 30,
            marginBottom: 20,
            resizeMode: "cover",
        },
        detailsContainer: {
            marginBottom: 20,
            alignItems: "center",
        },
        companyName: {
            fontSize: 26,
            fontWeight: "bold",
            color: theme.text,
            marginBottom: 10,
            textAlign: "center",
        },
        studentName: {
            fontSize: 20,
            color: theme.text,
            textAlign: "center",
        },
        row: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5, // Increased spacing between rows for better clarity
            backgroundColor: theme.cardBackground,
            padding: 15,  // Increased padding for rows
            borderRadius: 10,
            marginHorizontal: 5,  // Space between rows and screen edges
        },
        rowText: {
            fontSize: 16,
            color: theme.text,
            marginLeft: 10,
        },
        experienceDetails: {
            fontSize: 17,
            color: theme.text,
            lineHeight: 21,
            textAlign: "justify",
            marginTop: 20,
            marginHorizontal: 15,  // Adjusted horizontal margin
        },
        text: {
            fontSize: 18,
            color: theme.text,
        },
    });
}
