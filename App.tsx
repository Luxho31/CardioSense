import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Page from "./app/(modals)/lock";

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            {/* <Text style={styles.title}>Hello, world!</Text> */}
            <Page />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});
