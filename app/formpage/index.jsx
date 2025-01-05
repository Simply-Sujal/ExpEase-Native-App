import React, { useState, useContext } from "react";
import {
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    View,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "@/context/ThemeContext";
import { Picker } from "@react-native-picker/picker";

const API_ENDPOINT = "https://exp-ease-backend.vercel.app/api/v1/experience/experienceform";

const AddExperienceForm = () => {
    const { theme } = useContext(ThemeContext);

    const [formData, setFormData] = useState({
        userName: "",
        companyName: "",
        collegeName: "",
        onCampusOrOffCampus: "On-Campus",
        yearOfHiring: "",
        experienceDetails: "",
        image: "", // Optional field
        numberOfRounds: "",
        role: "",
        interviewMode: "Online",
        offerStatus: "Offer", // New field with a default value
    });

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(API_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                Alert.alert("Success", "Experience submitted successfully!");
                setFormData({
                    userName: "",
                    companyName: "",
                    collegeName: "",
                    onCampusOrOffCampus: "On-Campus",
                    yearOfHiring: "",
                    experienceDetails: "",
                    image: "",
                    numberOfRounds: "",
                    role: "",
                    interviewMode: "Online",
                    offerStatus: "Offer", // Reset to default
                });
            } else {
                Alert.alert("Error", "Failed to submit experience. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            Alert.alert("Error", "An error occurred. Please try again later.");
        }
    };

    const styles = createStyles(theme);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.header}>📖 Share Your Experience</Text>

                {/** Form Fields */}
                {formFields.map(({ placeholder, field, multiline, keyboardType, pickerItems }) => (
                    <View key={field} style={styles.fieldContainer}>
                        <Text style={styles.label}>
                            {placeholder} <Text style={styles.asterisk}>*</Text>
                        </Text>
                        {pickerItems ? (
                            <Picker
                                selectedValue={formData[field]}
                                style={styles.picker}
                                onValueChange={(value) => handleInputChange(field, value)}
                            >
                                {pickerItems.map(({ label, value }) => (
                                    <Picker.Item key={value} label={label} value={value} />
                                ))}
                            </Picker>
                        ) : (
                            <TextInput
                                style={[styles.input, multiline && styles.textArea]}
                                placeholder={`Enter ${placeholder}`}
                                placeholderTextColor="gray"
                                value={formData[field]}
                                keyboardType={keyboardType || "default"}
                                onChangeText={(text) => handleInputChange(field, text)}
                                multiline={multiline || false}
                            />
                        )}
                    </View>
                ))}

                {/** Submit Button */}
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const formFields = [
    { placeholder: "Name of the Student", field: "userName" },
    { placeholder: "Company Name", field: "companyName" },
    { placeholder: "College Name", field: "collegeName" },
    { placeholder: "Year of Hiring (e.g., 2021)", field: "yearOfHiring", keyboardType: "numeric" },
    { placeholder: "Experience Details", field: "experienceDetails", multiline: true },
    { placeholder: "Add the Image URL (Optional)", field: "image" },
    { placeholder: "Number of Rounds", field: "numberOfRounds", keyboardType: "numeric" },
    { placeholder: "Role (e.g., Cloud Engineer)", field: "role" },
    {
        placeholder: "On Campus or Off Campus",
        field: "onCampusOrOffCampus",
        pickerItems: [
            { label: "On-Campus", value: "On-Campus" },
            { label: "Off-Campus", value: "Off-Campus" },
        ],
    },
    {
        placeholder: "Interview Mode",
        field: "interviewMode",
        pickerItems: [
            { label: "Online", value: "Online" },
            { label: "Walk-In", value: "Walk-In" },
        ],
    },
    {
        placeholder: "Offer Status",
        field: "offerStatus",
        pickerItems: [
            { label: "Offer", value: "Offer" },
            { label: "Rejected", value: "Rejected" },
        ],
    },
];

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
            fontSize: 26,
            fontWeight: "bold",
            color: theme.text,
            textAlign: "center",
            marginBottom: 20,
        },
        fieldContainer: {
            marginBottom: 20,
        },
        label: {
            fontSize: 16,
            fontWeight: "600",
            color: theme.text,
            marginBottom: 5,
        },
        asterisk: {
            color: "#FF6B6B",
        },
        input: {
            backgroundColor: theme.cardBackground,
            color: theme.text,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
            fontSize: 16,
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
        },
        submitButton: {
            backgroundColor: "#8986f7",
            padding: 15,
            borderRadius: 8,
            alignItems: "center",
        },
        submitButtonText: {
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
        },
    });
}
