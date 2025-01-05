import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, Pressable, useColorScheme } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemeContext } from "@/context/ThemeContext";

const API_ENDPOINT = "https://exp-ease-backend.vercel.app/api/v1/experience/company";

const FilteredExperiences = () => {
    const { companyName } = useLocalSearchParams(); // Get companyName from params
    const { theme, setColorScheme, colorScheme } = useContext(ThemeContext);
    const systemColorScheme = useColorScheme();
    const router = useRouter();

    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const styles = createStyles(theme, colorScheme);

    useEffect(() => {
        if (systemColorScheme !== colorScheme) {
            setColorScheme(systemColorScheme);
        }
    }, [systemColorScheme]);

    useEffect(() => {
        // Fetch experiences based on companyName
        const fetchExperiences = async () => {
            try {
                const response = await fetch(`${API_ENDPOINT}/${companyName}`);
                const data = await response.json();
                if (data && data.experiences) {
                    setExperiences(data.experiences);
                } else {
                    setError("No experiences found.");
                }
            } catch (err) {
                setError("Failed to fetch experiences. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchExperiences();
    }, [companyName]);

    const handlePress = (id) => {
        router.push(`/detailexperience/${id}`);
    };

    const renderExperienceCard = ({ item }) => (
        <View style={styles.cardContainer} key={item._id}>
            {/* Display a fallback image if image is empty */}
            <Image
                source={{ uri: item.image || 'https://via.placeholder.com/130x120' }}
                style={styles.image}
            />
            <View style={styles.cardContent}>
                <Text style={styles.companyName}>{item.companyName}</Text>
                <Text style={styles.studentName}>{item.userName}</Text>
                <Text style={styles.topic}>Hiring Year: {item.yearOfHiring}</Text>
                <Pressable onPress={() => handlePress(item._id)}>
                    <Text style={styles.btn}>Read</Text>
                </Pressable>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Loading experiences for {companyName}...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Experiences with {companyName}</Text>
            {error ? (
                <Text style={styles.noDataText}>{error}</Text>
            ) : (
                <FlatList
                    data={experiences}
                    renderItem={renderExperienceCard}
                    keyExtractor={(item) => item._id} // Use _id as the key
                    ListEmptyComponent={
                        <Text style={styles.noResultsText}>No experiences available for {companyName}.</Text>
                    }
                />
            )}
        </View>
    );
};

export default FilteredExperiences;

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 10,
            backgroundColor: theme.background,
        },
        title: {
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
            paddingTop: 15,
            color: theme.text,
            textAlign: "center",
        },
        cardContainer: {
            flexDirection: "row",
            backgroundColor: theme.cardBackground,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#111",
            marginBottom: 20,
            padding: 10,
        },
        image: {
            width: 130,
            height: 120,
            borderRadius: 5,
            marginRight: 15,
            resizeMode: "cover",
        },
        cardContent: {
            flex: 1,
            justifyContent: "space-between",
        },
        companyName: {
            fontSize: 18,
            fontWeight: "bold",
            color: theme.text,
            marginBottom: 5,
        },
        topic: {
            fontSize: 14,
            fontWeight: "500",
            color: "#888",
            marginBottom: 5,
        },
        studentName: {
            fontSize: 16,
            fontWeight: "500",
            color: theme.text,
            marginBottom: 5,
        },
        btn: {
            color: theme.text,
            padding: 6,
            textAlign: "center",
            backgroundColor: "#8986f7",
            fontSize: 17,
            fontWeight: "500",
            borderRadius: 5,
            marginRight: 40,
        },
        noDataText: {
            fontSize: 16,
            color: "#888",
            marginTop: 20,
            textAlign: "center",
        },
        noResultsText: {
            textAlign: "center",
            color: theme.text,
            fontSize: 16,
            marginTop: 20,
        },
    });
}
