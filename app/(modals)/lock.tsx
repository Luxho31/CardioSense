import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import * as Haptics from "expo-haptics";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";
import * as LocalAuthentication from "expo-local-authentication";

const Page = () => {
    const [code, setCode] = useState<number[]>([]);
    const codeLength = Array(6).fill(0);
    const router = useRouter();

    const offset = useSharedValue(0);
    const style = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: offset.value }],
        };
    });

    const OFFSET = 20;
    const TIME = 80;

    useEffect(() => {
        if (code.length === 6) {
            if (code.join("") === "111111") {
                router.replace("/");
                setCode([]);
            } else {
                offset.value = withSequence(
                    withTiming(-OFFSET, { duration: TIME / 2 }),
                    withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
                    withTiming(0, { duration: TIME / 2 })
                );
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Error
                );
                setCode([]);
            }
        }
    }, [code]);

    const onNumberPress = (number: number) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setCode([...code, number]);
    };

    const numberBackspace = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        // setCode(code.slice(0, code.length - 1));
        setCode(code.slice(0, -1));
    };

    const onBiometricPress = async () => {
        const { success } = await LocalAuthentication.authenticateAsync();
        if (success) {
            router.replace("/");
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
    };

    return (
        <SafeAreaView>
            <Text style={styles.greeting}>Welcome back!, Luis</Text>
            <Text>Enter your PIN</Text>

            <Animated.View style={[styles.codeView, style]}>
                {codeLength.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.codeEmpty,
                            {
                                backgroundColor: code[index]
                                    ? "#3D38ED"
                                    : "#D8DCE2",
                            },
                        ]}
                    />
                ))}
            </Animated.View>

            <View style={styles.numbersView}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    {[1, 2, 3].map((number) => (
                        <TouchableOpacity
                            key={number}
                            onPress={() => {
                                onNumberPress(number);
                            }}
                        >
                            <Text style={styles.number}>{number}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    {[4, 5, 6].map((number) => (
                        <TouchableOpacity
                            key={number}
                            onPress={() => {
                                onNumberPress(number);
                            }}
                        >
                            <Text style={styles.number}>{number}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    {[7, 8, 9].map((number) => (
                        <TouchableOpacity
                            key={number}
                            onPress={() => {
                                onNumberPress(number);
                            }}
                        >
                            <Text style={styles.number}>{number}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            onBiometricPress;
                        }}
                    >
                        <MaterialCommunityIcons
                            name="face-recognition"
                            size={26}
                            color="black"
                        />
                        {/* <MaterialCommunityIcons
                        name="fingerprint"
                        size={32}
                        color="black"
                    /> */}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onNumberPress(0)}>
                        <Text style={styles.number}>0</Text>
                    </TouchableOpacity>

                    <View style={{ minWidth: 30 }}>
                        {code.length > 0 && (
                            <TouchableOpacity onPress={numberBackspace}>
                                <MaterialCommunityIcons
                                    name="backspace"
                                    size={26}
                                    color="black"
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <Text
                    style={{
                        alignSelf: "center",
                        color: "#3D38ED",
                        fontWeight: "500",
                        fontSize: 18,
                    }}
                >
                    Forgot your PIN?
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    greeting: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 80,
        alignSelf: "center",
    },
    codeView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        marginVertical: 100,
    },
    codeEmpty: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    numbersView: {
        marginHorizontal: 80,
        gap: 60,
    },
    number: {
        fontSize: 32,
    },
});

export default Page;
