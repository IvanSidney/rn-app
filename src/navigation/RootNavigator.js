import React, { useContext, useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firabase";

import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import navigationTheme from "./navigationTheme";
import AuthContext from "../auth/context";

const RootNavigator = () => {
    const { user, setUser } = useContext(AuthContext);

    // console.log(user);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, async (authenticatedUser) => {
            authenticatedUser ? setUser(authenticatedUser) : setUser(null);
            setIsLoading(false);
        });
    }, [user]);
    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color={"blue"} />
            </View>
        );
    }

    return (
        <NavigationContainer theme={navigationTheme}>
            {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};

export default RootNavigator;
