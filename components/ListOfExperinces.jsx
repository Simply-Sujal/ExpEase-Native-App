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
    ActivityIndicator,
    Alert
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
    const [loading, setLoading] = useState(true); // Loader state

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
                    setExperienceData(data.experiences);
                    setFilteredData(data.experiences);
                } else {
                    Alert.alert("Something went wrong", data.message);
                }
            } catch (error) {
                console.error('Error fetching experience data:', error);
            } finally {
                setLoading(false); // Stop loading once the data is fetched or error occurs
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
        <View style={styles.cardContainer} key={item._id}>
            <Image
                source={{
                    uri: item.image || 'https://img.freepik.com/free-vector/augmented-reality-urban-modeling-illustration_335657-372.jpg',
                }}
                style={styles.image}
            />
            <View style={styles.cardContent}>
                <Text style={styles.companyName}>{item.companyName}</Text>
                <Text style={styles.studentName}>{item.userName}</Text>

                {/* Hiring Year and Read Button */}
                <View style={styles.cardFooter}>
                    <Text style={styles.hiringYear}>
                        Batch : {item.yearOfHiring}
                    </Text>
                    <Pressable
                        style={styles.readButton}
                        onPress={() => handlePress(item._id)}
                    >
                        <Text style={styles.readButtonText}>Read Info</Text>
                    </Pressable>
                </View>
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

            {loading ? (  // Display loader while fetching data
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={theme.text} />
                    <Text style={{ color: theme.text, textAlign: "center" }}>Hold on...</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredData}
                    renderItem={renderExperienceCard}
                    keyExtractor={(item) => item._id.toString()}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={
                        <Text style={styles.noResultsText}>No matching results found.</Text>
                    }
                />
            )}
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
        loaderContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        listContainer: {
            paddingHorizontal: 8,
            paddingVertical: 10,
        },
        cardContainer: {
            flexDirection: "row",
            backgroundColor: theme.background || "#fff",
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 2,
            marginBottom: 15,
            padding: 10,
            borderWidth: 1,
            borderColor: colorScheme === "dark" ? "#898" : "#555"
        },
        image: {
            width: 80,
            height: 80,
            borderRadius: 5,
            marginRight: 15,
            resizeMode: "center",
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
        studentName: {
            fontSize: 16,
            fontWeight: "500",
            color: theme.text,
            marginBottom: 10,
        },
        cardFooter: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        hiringYear: {
            fontSize: 14,
            fontWeight: "500",
            color: theme.text,
        },
        readButton: {
            backgroundColor: "#8986f7",
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 6,
        },
        readButtonText: {
            color: "#fff",
            fontWeight: "600",
            fontSize: 14,
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
