import "react-native-gesture-handler";

import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { Button, StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import MessagesScreen from "./src/screens/MessagesScreen"; // <GestureHandlerRootView style={{flex:1}}> <MessageScreen/> </GestureHandlerRootView>
import Screen from "./src/components/Screen";
import ListingEditScreen from "./src/screens/ListingEditScreen";
import AuthNavigator from "./src/navigation/AuthNavigator";
import navigationTheme from "./src/navigation/navigationTheme";
import AppNavigator from "./src/navigation/AppNavigator";

import ListingScreen from "./src/screens/ListingsScreen";
import OfflineNotice from "./src/components/OfflineNotice";
import LoginScreen from "./src/screens/LoginScreen";
import RootNavigator from "./src/navigation/RootNavigator";
import AuthContext from "./src/auth/context";
import { StatusBar } from "expo-status-bar";

export default function App() {
    const [user, setUser] = useState();

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <OfflineNotice />
            <RootNavigator />
            <StatusBar style="dark" translucent hidden={false} />
        </AuthContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
});
