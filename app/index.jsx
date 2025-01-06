import React, { useContext } from "react";
import {
  Image,
  Text,
  View,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "@/context/ThemeContext";
import { useRouter } from "expo-router";

export default function Index() {
  const { colorScheme, theme } = useContext(ThemeContext);
  const styles = createStyles(theme);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../assets/images/ExpEaseHomeImage.jpg")}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.heading}>ExpEase</Text>
          <Text style={styles.description}>
            A platform to explore and share real interview experiences from top
            tech companies, helping you prepare and succeed.
          </Text>
        </View>
        <Pressable style={styles.button} onPress={() => router.push("/Information")}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </View>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );
}

function createStyles(theme) {
  const primaryColor = "#8986f7";

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      flex: 1,
      alignItems: "center",
    },
    image: {
      width: "100%",
      height: 400,
      resizeMode: "cover",
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    textContainer: {
      marginTop: 60,
      paddingHorizontal: 20,
      alignItems: "center",
      zIndex: 1,
    },
    heading: {
      color: primaryColor,
      fontSize: 34,
      fontWeight: "bold",
      textAlign: "center",
      letterSpacing: 1
    },
    description: {
      color: theme.text,
      fontSize: 16,
      textAlign: "center",
      marginTop: 10,
      lineHeight: 22,
    },
    button: {
      marginTop: 30,
      backgroundColor: primaryColor,
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5,
    },
    buttonText: {
      color: theme.background,
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
  });
}
