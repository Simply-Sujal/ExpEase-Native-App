import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, useColorScheme, Image, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { interviewexp } from "@/data/interviewexp";
import { ThemeContext } from "@/context/ThemeContext";

const FilteredExperiences = () => {
    const { companyName } = useLocalSearchParams();
    const { theme, setColorScheme, colorScheme } = useContext(ThemeContext);
    const systemColorScheme = useColorScheme();
    const router = useRouter();

    useEffect(() => {
        if (systemColorScheme !== colorScheme) {
            setColorScheme(systemColorScheme);
        }
    }, [systemColorScheme]);

    const filteredData = interviewexp.filter(
        (exp) => exp.companyName.toLowerCase() === companyName.toLowerCase()
    );

    const styles = createStyles(theme, colorScheme);

    const handlePress = (id) => {
        router.push(`/detailexperience/${id}`);
    };


    const renderExperienceCard = ({ item }) => (
        <View style={styles.cardContainer} key={item.id}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
                <Text style={styles.companyName}>{item.companyName}</Text>
                <Text style={styles.studentName}>{item.nameOfTheStudent}</Text>
                <Text style={styles.topic}>Hiring Year: {item.yearOfHiring}</Text>
                <Pressable onPress={() => handlePress(item.id)}>
                    <Text style={styles.btn}>Read</Text>
                </Pressable>
            </View>
        </View>
    );


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Experiences with {companyName}</Text>
            {filteredData.length > 0 ? (
                <FlatList
                    data={filteredData}
                    renderItem={renderExperienceCard}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={
                        <Text style={styles.noResultsText}>No matching results found.</Text>
                    }
                />
            ) : (
                <Text style={styles.noDataText}>
                    No experiences available for {companyName}.
                </Text>
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
            textAlign: "center"
        },
        card: {
            backgroundColor: "#f9f9f9",
            padding: 10,
            borderRadius: 8,
            marginVertical: 8,
            shadowColor: "#000",
        },
        cardTitle: {
            fontSize: 16,
            fontWeight: "500",
            color: "#333",
        },
        noDataText: {
            fontSize: 16,
            color: "#888",
            marginTop: 20,
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
            borderColor: "#222",
            // borderWidth: 1,
            padding: 6,
            textAlign: "center",
            backgroundColor: "#8986f7",
            fontSize: 17,
            fontWeight: 500,
            borderRadius: 5,
            marginRight: 40
        },
        searchBar: {
            backgroundColor: theme.background,
            borderRadius: 8,
            padding: 10,
            fontSize: 16,
            margin: 10,
            color: theme.text,
            borderWidth: 1,
            borderColor: "#ccc",
        },
        noResultsText: {
            textAlign: "center",
            color: theme.text,
            fontSize: 16,
            marginTop: 20,
        },
    })
};
