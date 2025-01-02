import React, { useContext, useEffect } from "react";
import { FlatList, Image, Text, View, Dimensions, StyleSheet, useColorScheme } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "@/context/ThemeContext";
import { companies } from "@/data/companies"
import { images } from "@/data/carouselImages"
import { TextInput } from "react-native-gesture-handler";

export default function Information() {
    const { theme, setColorScheme, colorScheme } = useContext(ThemeContext);
    const systemColorScheme = useColorScheme();
    const width = Dimensions.get("window").width;

    useEffect(() => {
        if (systemColorScheme !== colorScheme) {
            setColorScheme(systemColorScheme);
        }
    }, [systemColorScheme]);


    const styles = createStyles(theme, colorScheme);

    return (
        <SafeAreaView style={styles.container}>
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
                // height={width / 2}
                autoPlay={true}
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


            <Text style={styles.sectionTitle}>Companies We Have Experiences With</Text>
            <FlatList
                data={companies}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.companyList}
                renderItem={({ item }) => (
                    <View style={styles.companyCard}>
                        <Image source={{ uri: item.logo }} style={styles.companyLogo} />
                        <Text style={styles.companyName}>{item.name}</Text>
                    </View>
                )}
            />
            {/* <View>
                <TextInput>

                </TextInput>
            </View> */}
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
            color: theme.text,
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
            flex: 1,
            marginHorizontal: 10,
        },
        carouselImage: {
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            borderRadius: 5,
        },
        sectionTitle: {
            marginTop: 20,
            fontSize: 20,
            fontWeight: "bold",
            color: theme.text,
            textAlign: "center",
        },
        companyList: {
            paddingHorizontal: 10,
            marginTop: 15,
        },
        companyCard: {
            marginRight: 15,
            alignItems: "center",
        },
        companyLogo: {
            width: 50,
            height: 50,
            resizeMode: "contain",
            borderRadius: 100
        },
        companyName: {
            marginTop: 5,
            fontSize: 14,
            color: theme.text,
            textAlign: "center",
        },
    });
}
