import { StyleSheet, Text } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";

const White = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido Luis</Text>
        </View>
    );
};

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

export default White;
