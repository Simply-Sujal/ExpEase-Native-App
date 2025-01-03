import React, { useContext, useEffect } from "react";
import {
    FlatList,
    Image,
    Text,
    View,
    Dimensions,
    StyleSheet,
    useColorScheme,
    Pressable,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "@/context/ThemeContext";
import { companies } from "@/data/companies";
import { images } from "@/data/carouselImages";
import { ScrollView } from "react-native";
import ListOfExperiences from "@/components/ListOfExperinces";
import { useRouter } from "expo-router";

export default function Information() {
    const { theme, setColorScheme, colorScheme } = useContext(ThemeContext);
    const systemColorScheme = useColorScheme();
    const width = Dimensions.get("window").width;
    const router = useRouter();

    useEffect(() => {
        if (systemColorScheme !== colorScheme) {
            setColorScheme(systemColorScheme);
        }
    }, [systemColorScheme]);

    const handleCompanySelect = (companyName) => {
        router.push({
            pathname: "/filteredExperiences",
            params: { companyName }, // Pass the company name as a parameter
        });
    };

    const styles = createStyles(theme, colorScheme);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={styles.innerContainer}>
                    <Text style={styles.appName}>ExpEase</Text>
                    <View style={styles.headerContainer}>
                        <Text style={styles.greetingText}>Hi Folks 👋</Text>
                        <Image
                            source={require("@/assets/images/studenticon.png")}
                            style={styles.profileImage}
                        />
                    </View>
                </View>

                <Carousel
                    loop
                    width={width}
                    height={200}
                    autoPlay
                    data={images}
                    scrollAnimationDuration={3000}
                    renderItem={({ index }) => (
                        <View style={styles.carouselContainer}>
                            <Image
                                source={{ uri: images[index].uri }}
                                style={styles.carouselImage}
                            />
                        </View>
                    )}
                />

                <Text style={styles.sectionTitle}>
                    Companies We Have Experiences With
                </Text>
                <FlatList
                    data={companies}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.companyList}
                    initialNumToRender={20}
                    maxToRenderPerBatch={20}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => handleCompanySelect(item.name)}
                            style={{ backgroundColor: "rgba(255,0,0,0.1)", paddingVertical: 8 }}
                        >
                            <View style={styles.companyCard}>
                                <Image
                                    source={{ uri: item.logo }}
                                    style={styles.companyLogo}
                                />
                                <Text style={styles.companyName}>{item.name}</Text>
                            </View>
                        </Pressable>
                    )}
                />

                <View style={{ marginTop: 2 }}>
                    <Text style={styles.sectionTitle}>
                        Explore and Share Your Experience
                    </Text>
                </View>
                <ListOfExperiences />
            </ScrollView>

            <Pressable
                style={styles.floatingButton}
                onPress={() => router.push("/formpage")}
            >
                <Image
                    source={require("@/assets/images/react-logo.png")}
                    style={styles.floatingButtonImage}
                />
            </Pressable>
        </SafeAreaView>
    );
}

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        innerContainer: {
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 10,
            margin: 10,
        },
        appName: {
            color: "#8986f7",
            textAlign: "center",
            fontSize: 24,
            fontWeight: "bold",
            letterSpacing: 1,
        },
        headerContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        greetingText: {
            color: theme.text,
            fontSize: 18,
            fontWeight: "500",
        },
        profileImage: {
            width: 40,
            height: 40,
            borderRadius: 20,
            borderWidth: 2,
            borderColor: theme.icon,
        },
        carouselContainer: {
            marginHorizontal: 10,
            height: 200,
            borderRadius: 10,
            overflow: "hidden",
        },
        carouselImage: {
            width: "100%",
            height: "100%",
            resizeMode: "cover",
        },
        sectionTitle: {
            marginTop: 20,
            fontSize: 20,
            fontWeight: "bold",
            color: theme.text,
            textAlign: "center",
        },
        companyList: {
            marginTop: 5,
        },
        companyCard: {
            marginRight: 10,
            alignItems: "center",
            width: 60,
        },
        companyLogo: {
            width: 40,
            height: 40,
            resizeMode: "contain",
            borderRadius: 20,
        },
        companyName: {
            marginTop: 5,
            fontSize: 12,
            color: theme.text,
            textAlign: "center",
            fontWeight: "400",
        },
        floatingButton: {
            position: "absolute",
            bottom: 20,
            right: 20,
            backgroundColor: "#8986f7",
            borderRadius: 30,
            width: 60,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
        },
        floatingButtonImage: {
            width: 30,
            height: 30,
            resizeMode: "contain",
            tintColor: "#fff",
        },
    });
}
