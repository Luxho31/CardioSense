import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV({
    id: "UserInactivity",
});

const LOCK_TIME = 3000;

export const UserInactivityProvider = ({ children }: any) => {
    const appState = useRef(AppState.currentState);
    const timer = useRef<NodeJS.Timeout | null>(null);
    const [isLocked, setIsLocked] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // AppState.addEventListener("change", handleAppStateChange);
        // return () => {
        //     AppState.removeEventListener("change", handleAppStateChange);
        // };
        const subscription = AppState.addEventListener(
            "change",
            handleAppStateChange
        );
        return () => {
            subscription.remove();
        };
    }, []);

    const handleAppStateChange = (nextAppState: any) => {
        console.log("appState", appState.current, nextAppState);
        if (nextAppState === "inactive") {
            router.push("/(modals)/white");
        } else {
            if (router.canGoBack()) {
                router.back();
            }
        }

        if (nextAppState === "background") {
            recordStartTime();
        } else if (
            nextAppState === "active" &&
            appState.current.match(/background/)
        ) {
            const elapsed = Date.now() - (storage.getNumber("startTime") || 0);
            if (elapsed >= LOCK_TIME) {
                router.push("/(modals)/lock");
            }
        }

        appState.current = nextAppState;
    };

    const recordStartTime = () => {
        storage.set("startTime", Date.now());
    };

    return children;
};
