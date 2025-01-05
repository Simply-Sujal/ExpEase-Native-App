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
import { ThemeContext } from "@/context/ThemeContext";
import { useRouter } from "expo-router";

const ListOfExperiences = () => {
    const { theme, setColorScheme, colorScheme } = useContext(ThemeContext);
    const systemColorScheme = useColorScheme();
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState("");
    const [experienceData, setExperienceData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (systemColorScheme !== colorScheme) {
            setColorScheme(systemColorScheme);
        }
    }, [systemColorScheme]);

    useEffect(() => {
        // Fetch data from the API
        const fetchExperienceData = async () => {
            try {
                const response = await fetch('https://exp-ease-backend.vercel.app/api/v1/experience/allexperiencedata');
                const data = await response.json();
                if (data.success) {
                    console.log(data);  // Debugging: Log the response
                    setExperienceData(data.experiences); // Assuming the API returns an object with an "experiences" array
                    setFilteredData(data.experiences);
                } else {
                    console.error("Error: ", data.message);
                }
            } catch (error) {
                console.error('Error fetching experience data:', error);
            }
        };

        fetchExperienceData();
    }, []);

    useEffect(() => {
        // Filter data based on search query
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = experienceData.filter(
            (item) =>
                item.companyName.toLowerCase().includes(lowercasedQuery) ||
                item.collegeName.toLowerCase().includes(lowercasedQuery) ||
                item.yearOfHiring.toString().includes(lowercasedQuery)
        );
        setFilteredData(filtered);
    }, [searchQuery, experienceData]);

    const styles = createStyles(theme, colorScheme);

    const handlePress = (id) => {
        router.push(`/detailexperience/${id}`);
    };

    const renderExperienceCard = ({ item }) => (
        <View style={styles.cardContainer} key={item._id}> {/* Use _id for uniqueness */}
            <Image
                source={{
                    uri: item.image || 'https://img.freepik.com/free-vector/augmented-reality-urban-modeling-illustration_335657-372.jpg',
                }}
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
                keyExtractor={(item) => item._id.toString()} // Use _id for key extraction
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
            backgroundColor: theme.background,
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
            padding: 6,
            textAlign: "center",
            backgroundColor: "#8986f7",
            fontSize: 17,
            fontWeight: 500,
            borderRadius: 5,
            marginRight: 40,
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
