import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    TextInput,
    useColorScheme,
    Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { interviewexp } from "@/data/interviewexp"; // Adjust your import path
import { ThemeContext } from "@/context/ThemeContext";
import { useRouter } from "expo-router";

const ListOfExperiences = () => {
    const { theme, setColorScheme, colorScheme } = useContext(ThemeContext);
    const systemColorScheme = useColorScheme();
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState(interviewexp);

    useEffect(() => {
        if (systemColorScheme !== colorScheme) {
            setColorScheme(systemColorScheme);
        }
    }, [systemColorScheme]);

    useEffect(() => {
        // Filter data based on search query
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = interviewexp.filter(
            (item) =>
                item.companyName.toLowerCase().includes(lowercasedQuery) ||
                item.collegeName.toLowerCase().includes(lowercasedQuery) ||
                item.yearOfHiring.toString().includes(lowercasedQuery)
        );
        setFilteredData(filtered);
    }, [searchQuery]);

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
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search by company, college, or year"
                placeholderTextColor="gray"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredData}
                renderItem={renderExperienceCard}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <Text style={styles.noResultsText}>No matching results found.</Text>
                }
            />
        </SafeAreaView>
    );
};

export default ListOfExperiences;

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        listContainer: {
            paddingHorizontal: 10,
            paddingVertical: 20,
        },
        cardContainer: {
            flexDirection: "row",
            backgroundColor: theme.cardBackground,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#111",
            marginBottom: 20,
            padding: 15,
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
    });
}
