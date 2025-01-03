import React, { useState, useContext } from "react";
import {
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "@/context/ThemeContext";
import { Picker } from "@react-native-picker/picker";

const AddExperienceForm = () => {
    const { theme } = useContext(ThemeContext);

    const [formData, setFormData] = useState({
        nameOfTheStudent: "",
        companyName: "",
        collegeName: "",
        onCampusOrOffCampus: "On-Campus",
        yearOfHiring: "",
        experienceDetails: "",
        image: "",
        numberOfRounds: "",
        role: "",
        interviewMode: "Online",
    });

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = () => {
        console.log("Submitted Data: ", formData);
        // Add a function to send the data to your backend here
    };

    const styles = createStyles(theme);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.header}>Share Your Experience</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Name of the Student"
                    placeholderTextColor="gray"
                    value={formData.nameOfTheStudent}
                    onChangeText={(text) => handleInputChange("nameOfTheStudent", text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Company Name"
                    placeholderTextColor="gray"
                    value={formData.companyName}
                    onChangeText={(text) => handleInputChange("companyName", text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="College Name"
                    placeholderTextColor="gray"
                    value={formData.collegeName}
                    onChangeText={(text) => handleInputChange("collegeName", text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Year of Hiring (e.g., 2021)"
                    placeholderTextColor="gray"
                    value={formData.yearOfHiring}
                    keyboardType="numeric"
                    onChangeText={(text) => handleInputChange("yearOfHiring", text)}
                />

                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Experience Details"
                    placeholderTextColor="gray"
                    value={formData.experienceDetails}
                    onChangeText={(text) =>
                        handleInputChange("experienceDetails", text)
                    }
                    multiline
                />

                <TextInput
                    style={styles.input}
                    placeholder="Image URL"
                    placeholderTextColor="gray"
                    value={formData.image}
                    onChangeText={(text) => handleInputChange("image", text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Number of Rounds"
                    placeholderTextColor="gray"
                    value={formData.numberOfRounds}
                    keyboardType="numeric"
                    onChangeText={(text) => handleInputChange("numberOfRounds", text)}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Role (e.g., Cloud Engineer)"
                    placeholderTextColor="gray"
                    value={formData.role}
                    onChangeText={(text) => handleInputChange("role", text)}
                />

                <Picker
                    selectedValue={formData.onCampusOrOffCampus}
                    style={styles.picker}
                    onValueChange={(value) =>
                        handleInputChange("onCampusOrOffCampus", value)
                    }
                >
                    <Picker.Item label="On-Campus" value="On-Campus" />
                    <Picker.Item label="Off-Campus" value="Off-Campus" />
                </Picker>

                <Picker
                    selectedValue={formData.interviewMode}
                    style={styles.picker}
                    onValueChange={(value) => handleInputChange("interviewMode", value)}
                >
                    <Picker.Item label="Online" value="Online" />
                    <Picker.Item label="Walk-In" value="Walk-In" />
                </Picker>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddExperienceForm;

function createStyles(theme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        scrollContainer: {
            padding: 20,
        },
        header: {
            fontSize: 24,
            fontWeight: "bold",
            color: theme.text,
            textAlign: "center",
            marginBottom: 20,
        },
        input: {
            backgroundColor: theme.cardBackground,
            color: theme.text,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
            fontSize: 16,
            marginBottom: 15,
        },
        textArea: {
            height: 100,
            textAlignVertical: "top",
        },
        picker: {
            backgroundColor: theme.cardBackground,
            color: theme.text,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            marginBottom: 15,
        },
        submitButton: {
            backgroundColor: "#8986f7",
            padding: 15,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 10,
        },
        submitButtonText: {
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
        },
    });
}
